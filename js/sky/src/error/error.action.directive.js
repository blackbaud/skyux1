/* global angular */
(function () {
    'use strict';

    function BBErrorActionController($scope) {
        var vm = this;

        $scope.$on('$destroy', function () {
            if (angular.isFunction(vm.onDestroy)) {
                vm.onDestroy();
                vm = null;
            }
        });
    }

    BBErrorActionController.$inject = ['$scope'];

    function bbErrorAction() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setAction(vm);
            }

        }

        return {
            restrict: 'E',
            require: ['bbErrorAction', '?^bbError'],
            controller: BBErrorActionController,
            controllerAs: 'bbErrorAction',
            link: link,
            scope: {}
        };
    }

    angular.module('sky.error.action.directive', [])
        .directive('bbErrorAction', bbErrorAction);
}());
