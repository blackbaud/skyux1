angular.module('KitchenSink')
    .controller('FormsPatternController', ['$scope', 'bbModal', function ($scope, bbModal) {
        $scope.locals = {
            openForm: function () {
                bbModal.open({
                    templateUrl: 'patterns/forms/modalform.html'
                });
            }
        };
    }])
    .controller('FormsModalPatternController', ['$scope', function ($scope) {
        $scope.locals = {
            save: function () {

            }
        };
    }]);