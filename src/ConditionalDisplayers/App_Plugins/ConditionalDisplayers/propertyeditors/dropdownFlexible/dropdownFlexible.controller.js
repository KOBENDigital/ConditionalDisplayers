angular.module("umbraco").controller("Our.Umbraco.ConditionalDisplayers.DropdownController",
    function ($scope) {
        var parentPropertyAlias = $scope.model.alias.toString().replace($scope.model.propertyAlias, '');

        //setup the default config
        var config = {
            items: [],
            multiple: false
        };

        //map the user config
        angular.extend(config, $scope.model.config);

        //map back to the model
        $scope.model.config = config;



        function convertArrayToDictionaryArray(model) {
            //now we need to format the items in the dictionary because we always want to have an array
            var newItems = [];
            for (var i = 0; i < model.length; i++) {
                newItems.push({ id: model[i], sortOrder: 0, value: model[i] });
            }

            return newItems;
        }


        function convertObjectToDictionaryArray(model) {
            //now we need to format the items in the dictionary because we always want to have an array
            var newItems = [];
            var vals = _.values($scope.model.config.items);
            var keys = _.keys($scope.model.config.items);

            for (var i = 0; i < vals.length; i++) {
                var label = vals[i].value ? vals[i].value : vals[i];
                newItems.push({ id: keys[i], sortOrder: vals[i].sortOrder, value: label });
            }

            return newItems;
        }

        $scope.updateDropdownValue = function () {
            var item = _.findWhere(config.items, { value: $scope.model.value });
            if (item) {
                displayProps(item.show, item.hide);
            }
        };

        if (angular.isArray($scope.model.config.items)) {
            //PP: I dont think this will happen, but we have tests that expect it to happen..
            //if array is simple values, convert to array of objects
            if (!angular.isObject($scope.model.config.items[0])) {
                $scope.model.config.items = convertArrayToDictionaryArray($scope.model.config.items);
            }
        }
        else if (angular.isObject($scope.model.config.items)) {
            $scope.model.config.items = convertObjectToDictionaryArray($scope.model.config.items);
        }
        else {
            throw "The items property must be either an array or a dictionary";
        }


        //sort the values
        $scope.model.config.items.sort(function (a, b) { return (a.sortOrder > b.sortOrder) ? 1 : ((b.sortOrder > a.sortOrder) ? -1 : 0); });

        //now we need to check if the value is null/undefined, if it is we need to set it to "" so that any value that is set
        // to "" gets selected by default
        if ($scope.model.value === null || $scope.model.value === undefined) {
            if ($scope.model.config.multiple) {
                $scope.model.value = [];
            }
            else {
                $scope.model.value = "";
            }
        } else {            
            $scope.updateDropdownValue();
        }

        //the properties with alias in 'show' and 'hide' will be affected when the value is triggered.
        function displayProps(show, hide) {
            //Elements to show
            if (show) {
                var showEls = show.split(',');
    
                if (showEls && showEls.length > 0) {
                    var s = elSelectors(showEls);
                    $(s).show("slow");
                }
            }
    
            if (hide) {
                //Elements to hide
                var hideEls = hide.split(',');
    
                if (hideEls && hideEls.length > 0) {
                    var h = elSelectors(hideEls);
                    $(h).hide("slow");
                }
            }
        }

        function elSelectors(els) {
            var h = "";
            for (var i = 0; i < els.length; i++) {
                if (h !== "") {
                    h += ",";
                }
                h += "div[data-element='property-" + parentPropertyAlias + els[i].trim() + "']";
            }

            return h;
        }

    });

