/* global angular */
(function () {
    'use strict';

    function BBErrorTitleController($scope, bbResources) {
        var vm = this;

        $scope.$on('$destroy', function () {
            vm.onDestroy();
            vm = null;
        });

        switch (vm.errorType) {
            case 'broken':
                vm.title = bbResources.error_title_broken;
                break;
        }
    }

    BBErrorTitleController.$inject = ['$scope', 'bbResources'];

    function bbErrorTitle() {
        function link(scope, el, attrs, ctrls) {
            var vm = ctrls[0],
                bbError = ctrls[1];

            vm.el = el;

            if (bbError !== null) {
                bbError.setTitle(vm);
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
