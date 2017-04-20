/*global angular */

(function () {
    'use strict';

    function bbActionBar() {
        return {
            controller: angular.noop,
            controllerAs: 'bbActionBar',
            bindToController: true,
            scope: {},
            transclude: true,
            restrict: 'E',
            templateUrl: 'sky/templates/actionbar/actionbar.html'
        };
    }

    function bbActionBarItemGroup(bbResources, bbMediaBreakpoints) {
        return {
            transclude: true,
            controller: function () {
                var vm = this;

                function onInit() {
                    if (vm.title === null || angular.isUndefined(vm.title)) {
                        vm.title = bbResources.action_bar_actions;
                    }
                }

                vm.$onInit = onInit;

            },
            controllerAs: 'bbActionBarItemGroup',
            bindToController: {
                title: '=?bbActionBarItemGroupTitle'
            },
            restrict: 'E',
            require: 'bbActionBarItemGroup',
            scope: {},
            link: function ($scope, el, attr, vm) {
                function mediaBreakpointHandler(breakpoints) {
                    if (breakpoints.xs) {
                        el.find('.bb-action-bar-buttons > ng-transclude').appendTo(el.find('.bb-action-bar-dropdown > .dropdown > ul'));
                    } else {
                        el.find('.bb-action-bar-dropdown .dropdown > ul > ng-transclude').appendTo(el.find('.bb-action-bar-buttons'));
                    }
                }

                bbMediaBreakpoints.register(mediaBreakpointHandler);

                $scope.$on('$destroy', function () {
                    bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                });

                vm.toggleId = 'bb-action-bar-item-group-' + $scope.$id;
            },
            templateUrl: 'sky/templates/actionbar/actionbaritemgroup.html'
        };
    }

    bbActionBarItemGroup.$inject = ['bbResources', 'bbMediaBreakpoints'];

    function bbActionBarItem(bbMediaBreakpoints) {
        return {
            replace: true,
            controller: angular.noop,
            controllerAs: 'bbActionBarItem',
            bindToController: {
                bbActionBarItemLabel: '@'
            },
            scope: {},
            require: '?^bbActionBarItemGroup',
            transclude: true,
            restrict: 'E',
            link: function ($scope, el, attrs, groupCtrl) {

                function mediaBreakpointHandler(breakpoints) {
                    if (breakpoints.xs) {
                        if (!el.parent().is('li')) {
                            el.wrap('<li role="menuitem"></li>');
                        }

                    } else {
                        if (el.parent().is('li')) {
                            el.unwrap();
                        }
                    }
                }

                if (groupCtrl !== null) {
                    bbMediaBreakpoints.register(mediaBreakpointHandler);

                    $scope.$on('$destroy', function () {
                        bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                        //get rid of wrapper on destroy
                        if (el.parent().is('li')) {
                            el.unwrap();
                        }
                    });
                }
            },
            templateUrl: 'sky/templates/actionbar/actionbaritem.html'
        };
    }

    bbActionBarItem.$inject = ['bbMediaBreakpoints'];

    angular.module('sky.actionbar', ['sky.resources', 'sky.mediabreakpoints', 'ui.bootstrap.dropdown'])
        .directive('bbActionBar', bbActionBar)
        .directive('bbActionBarItemGroup', bbActionBarItemGroup)
        .directive('bbActionBarItem', bbActionBarItem);
}());

