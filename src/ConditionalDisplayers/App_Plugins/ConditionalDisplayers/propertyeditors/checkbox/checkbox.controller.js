angular.module("umbraco").controller("Our.Umbraco.ConditionalDisplayers.CheckboxController", cdCheckboxController)


function cdCheckboxController($scope) {

    //the properties with alias in 'show' and 'hide' will be affected when the value is triggered.
    function displayProps(show, hide) {
        //Elements to show
        var showEls = show.split(',');
        var s = elSelectors(showEls);

        $(s).show("slow");

        //Elements to hide
        var hideEls = hide.split(',');
        var h = elSelectors(hideEls);

        $(h).hide("slow");
    }

    function elSelectors(els) {
        var h = "";
        for (var i = 0; i < els.length; i++) {
            if (h !== "") {
                h += ",";
            }
            h += "div[data-element='property-" + els[i].trim() + "']";
        }

        return h;
    }

    $scope.runDisplayLogic = function () {
        if ($scope.renderModel.value) {
            displayProps($scope.model.config.showIfChecked, $scope.model.config.showIfUnchecked);
        } else {
            displayProps($scope.model.config.showIfUnchecked, $scope.model.config.showIfChecked);
        }
    };

    $scope.clicked = function () {
        $scope.renderModel.value = !$scope.renderModel.value;
        $scope.runDisplayLogic();
    }



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

        //init visible fields
        $scope.runDisplayLogic();
    }

    setupViewModel();

};