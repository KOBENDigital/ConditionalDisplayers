angular.module("umbraco").controller("Our.Umbraco.ConditionalDisplayers.CheckboxController", cdCheckboxController);


function cdCheckboxController($scope, editorState, cdSharedLogic) {

    // propertyAlias is used in NestedContent properties. If we find we are in NC we
    // extract the parent alias to find later on only the property belonging to the same item where CD is included.
    if ($scope.model.propertyAlias) {
        var parentPropertyAlias = $scope.model.alias.slice(0, -$scope.model.propertyAlias.length);
    }

    $scope.$watch("renderModel.value", function (newVal) {
        $scope.model.value = newVal === true ? "1" : "0";

        $scope.runDisplayLogic();
    });

    $scope.clicked = function () {
        $scope.renderModel.value = !$scope.renderModel.value;
    };

    $scope.runDisplayLogic = function () {
        if (editorState.current.ModelState) {
            //init visible fields
            if ($scope.renderModel.value) {
                cdSharedLogic.displayProps($scope.model.config.showIfChecked, $scope.model.config.showIfUnchecked, parentPropertyAlias);
            } else {
                cdSharedLogic.displayProps($scope.model.config.showIfUnchecked, $scope.model.config.showIfChecked, parentPropertyAlias);
            }
        }
    };

    function setupViewModel() {
        $scope.renderModel = {
            value: false
        };

        if ($scope.model.config && $scope.model.config.default && $scope.model.config.default.toString() === "1" && $scope.model && !$scope.model.value) {
            $scope.renderModel.value = true;
        }

        if ($scope.model && $scope.model.value && ($scope.model.value.toString() === "1" || $scope.model.value.toLowerCase() === "true")) {
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
