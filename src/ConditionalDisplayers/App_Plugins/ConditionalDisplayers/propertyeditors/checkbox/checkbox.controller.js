angular.module("umbraco").controller("Our.Umbraco.ConditionalDisplayers.CheckboxController", cdCheckboxController);


function cdCheckboxController($scope) {

    // propertyAlias is used in NestedContent properties. If we find we are in NC we
    // extract the parent alias to find later on only the property belonging to the same item where CD is included.
    if ($scope.model.propertyAlias) {
        var parentPropertyAlias = $scope.model.alias.slice(0, -$scope.model.propertyAlias.length);
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
        let prop;

        for (var i = 0; i < els.length; i++) {
            if (h !== "") {
                h += ",";
            }

            if (parentPropertyAlias) {
                prop = "div[data-element='property-" + parentPropertyAlias + els[i].trim() + "']";
            }
            else {
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