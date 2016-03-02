/* global angular */
(function () {
    'use strict';

    function BBErrorDescriptionController($scope, bbResources) {
        var vm = this;

        $scope.$on('$destroy', function () {
            vm.onDestroy();
            vm = null;
        });

        switch (vm.errorType) {
            case 'broken':
                vm.description = bbResources.error_description_refresh;
                break;
        }
    }

    BBErrorDescriptionController.$inject = ['$scope', 'bbResources'];

    function bbErrorDescription() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setDescription(vm);
            }

        }

        return {
            restrict: 'E',
            require: ['bbErrorDescription', '?^bbError'],
            controller: BBErrorDescriptionController,
            controllerAs: 'bbErrorDescription',
            bindToController: {
                errorType: '@'
            },
            link: link,
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/error/error.description.directive.html'
        };
    }

    angular.module('sky.error.description.directive', [])
        .directive('bbErrorDescription', bbErrorDescription);
}());
