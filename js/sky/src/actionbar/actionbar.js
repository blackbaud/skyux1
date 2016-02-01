/*global angular */

/** @module Action Bar
@icon bolt
@summary The action bar provides a SKY UX-themed container for buttons that can collapse when the screen is in extra-small mode.
@description The action bar creates a SKY UX-themed container for buttons. It includes an option to collapse groups of buttons into dropdowns when the screen is in extra-small mode.

To apply action bar styling to more complicated scenarios (such as hiding and showing buttons at breakpoints other than xs, collapsing dropdowns into submenus), you can place content in a `div` with the `bb-action-bar` class. Bootstrap convenience classes to  show or hide content include the `hidden-xs`, `hidden-sm`, `hidden-md`, and `hidden-lg` classes. For information about these classes, see the [Bootstrap documentation](http://getbootstrap.com/css/#responsive-utilities-classes).

### Action Bar Settings ###
    - `bb-action-bar` &mdash; Wraps the content in the action bar to create a SKY UX-themed container for buttons.
        - `bb-action-bar-item` &mdash; Wraps the content in an action button. Any `ng-click` applied to this directive is applied to the action button.
        - `bb-action-bar-item-group` &mdash; Wraps `bb-action-bar-item` directives to collapse the buttons into a dropdown in extra-small mode. 
            - `bb-action-bar-item-group-title` &mdash; *(Optional.)* Edits the default **Actions** label for the dropdown.
*/

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
            replace: true,
            transclude: true,
            controller: function () {
                var vm = this;

                if (vm.title === null || angular.isUndefined(vm.title)) {
                    vm.title = bbResources.action_bar_actions;
                }
            },
            controllerAs: 'bbActionBarItemGroup',
            bindToController: {
                title: '=?bbActionBarItemGroupTitle'
            },
            restrict: 'E',
            scope: {},
            link: function ($scope, el) {
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
            bindToController: true,
            scope: {},
            require: '?^bbActionBarItemGroup',
            transclude: true,
            restrict: 'E',
            link: function ($scope, el, attrs, groupCtrl) {

                function mediaBreakpointHandler(breakpoints) {
                    if (breakpoints.xs) {
                        if (!el.parent().is('li')) {
                            el.wrap('<li></li>');
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
