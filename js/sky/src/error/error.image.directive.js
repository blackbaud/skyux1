/* global angular */
(function () {
    'use strict';

    function BBErrorImageController($scope) {
        var vm = this;

        $scope.$on('$destroy', function () {
            vm.onDestroy();
            vm = null;
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

        }

        return {
            restrict: 'E',
            require: ['bbErrorImage', '?^bbError'],
            controller: BBErrorImageController,
            controllerAs: 'bbErrorImage',
            bindToController: {
                errorType: '@'
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
