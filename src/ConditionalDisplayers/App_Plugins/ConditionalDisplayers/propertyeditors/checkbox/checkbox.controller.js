angular.module("umbraco").controller("Our.Umbraco.ConditionalDisplayers.CheckboxController", cdCheckboxController);


function cdCheckboxController($scope) {

    // check for the occurance of property alias before the underscore
    var propertyAliasLastIndex = $scope.model.alias.toString().lastIndexOf('_' + $scope.model.propertyAlias);
    // add 1 to compensate for the underscore
    var parentPropertyAlias = $scope.model.alias.toString().substring(0, propertyAliasLastIndex + 1);

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

            let prop = "div[data-element='property-" + parentPropertyAlias + els[i].trim() + "']";

            if (!$(prop).length) {
                prop = "div[data-element='property-" + els[i].trim() + "']";
            }

            h += prop;           
        }

        return h;
    }

    $scope.$watch("renderModel.value", function (newVal) {
        $scope.model.value = newVal === true ? "1" : "0";

        $scope.runDisplayLogic();
    });

    $scope.clicked = function () {
        $scope.renderModel.value = !$scope.renderModel.value;
    };

    $scope.runDisplayLogic = function () {
        //init visible fields
        if ($scope.renderModel.value) {
            displayProps($scope.model.config.showIfChecked, $scope.model.config.showIfUnchecked);
        } else {
            displayProps($scope.model.config.showIfUnchecked, $scope.model.config.showIfChecked);
        }
    };

    function setupViewModel() {
        $scope.renderModel = {
            value: false
        };

        if ($scope.model.config && $scope.model.config.default && $scope.model.config.default.toString() === "1" && $scope.model && !$scope.model.value) {
            $scope.renderModel.value = true;
        }

        if ($scope.model && $scope.model.value && ($scope.model.value.toString() === "1" || angular.lowercase($scope.model.value) === "true")) {
            $scope.renderModel.value = true;
        }

        $scope.runDisplayLogic();
    }


    //here we declare a special method which will be called whenever the value has changed from the server
    //this is instead of doing a watch on the model.value = faster
    $scope.model.onValueChanged = function (newVal, oldVal) {
        //update the display val again if it has changed from the server
        setupViewModel();
    };


    setupViewModel();

}