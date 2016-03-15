/* global angular */
(function () {
    'use strict';

    function BBErrorTitleController($scope, bbResources) {
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
                    vm.title = bbResources.error_title_broken;
                    break;
                case 'construction':
                    vm.title = bbResources.error_title_construction;
                    break;
                case 'notFound':
                    vm.title = bbResources.error_title_notfound;
                    break;
            }
        });

    }

    BBErrorTitleController.$inject = ['$scope', 'bbResources'];

    function bbErrorTitle() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setTitle(vm, 'errorDefault' in attrs);
            }

        }

        return {
            restrict: 'E',
            require: ['bbErrorTitle', '?^bbError'],
            controller: BBErrorTitleController,
            controllerAs: 'bbErrorTitle',
            bindToController: {
                errorType: '@'
            },
            link: link,
            scope: {},
            transclude: true,
            templateUrl: 'sky/templates/error/error.title.directive.html'
        };
    }

    angular.module('sky.error.title.directive', [])
        .directive('bbErrorTitle', bbErrorTitle);
}());
