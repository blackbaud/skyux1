/* global angular */
(function () {
    'use strict';

    function BBErrorDescriptionController($scope, bbResources) {
        var vm = this;

        $scope.$on('$destroy', function () {
            vm.onDestroy();
            vm = null;
        });

        $scope.$watch(function () {
            return vm.errorType;
        }, function (newValue) {
            switch (newValue) {
                case 'broken':
                    vm.description = bbResources.error_description_broken;
                    break;
                case 'construction':
                    vm.description = bbResources.error_description_construction;
                    break;
                case 'notFound':
                    vm.description = '';
            }
        });
    }

    BBErrorDescriptionController.$inject = ['$scope', 'bbResources'];

    function bbErrorDescription() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setDescription(vm, 'errorDefault' in attrs);
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
