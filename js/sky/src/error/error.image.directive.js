/* global angular */
(function () {
    'use strict';

    function BBErrorImageController($scope) {
        var vm = this;

        $scope.$on('$destroy', function () {
            if (angular.isFunction(vm.onDestroy)) {
                vm.onDestroy();
                vm = null;
            }
        });


    }

    BBErrorImageController.$inject = ['$scope'];

    function bbErrorImage() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setImage(vm, 'errorDefault' in attrs);
            }

            if (angular.isDefined(attrs.errorType)) {
                scope.$watch(function () {
                    return vm.errorType;
                }, function (newValue) {
                    /* istanbul ignore else: sanity check */
                    if (newValue !== vm.bbErrorType) {
                        vm.bbErrorType = newValue;
                    }
                });
            }
        }

        return {
            restrict: 'E',
            require: ['bbErrorImage', '?^bbError'],
            controller: BBErrorImageController,
            controllerAs: 'bbErrorImage',
            bindToController: {
                errorType: '@',
                bbErrorType: '@'
            },
            link: link,
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/error/error.image.directive.html'
        };
    }

    angular.module('sky.error.image.directive', [])
        .directive('bbErrorImage', bbErrorImage);
}());
