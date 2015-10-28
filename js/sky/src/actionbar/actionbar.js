/*global angular */

/** @module Action Bar
@icon bolt
@summary The action bar provides a Sky UX-themed container for buttons that can collapse when the screen is in extra-small mode.
@description The action bar creates a Sky UX-themed container for buttons. It includes the option to collapse groups of buttons into dropdowns when the screen is in extra-small mode.
### Action Bar Settings ###
    - `bb-action-bar` Wraps the content in the action bar.
    - `bb-action-bar-item` Wraps the content in an action button. Any `ng-click` applied to this directive is applied to the action button.
    - `bb-action-bar-item-group` Wraps `bb-action-bar-item` directives to collapse the buttons into a dropdown in extra-small mode. You can also pass an optional `bb-action-bar-item-group-title` to edit the default **Actions** label for the dropdown.

If it is necessary to apply action bar stylying to more complicated scenarios (e.g. hiding and showing buttons at different breakpoints other than xs, collapsing dropdowns into submenus), then you can place any content in a `div` that has the `bb-action-bar` class. Some Bootstrap convenience classes for showing/hiding arbitrary content are the `hidden-xs`, `hidden-sm`, `hidden-md`, and `hidden-lg` classes. You can get more information on these in the [Bootstrap](http://getbootstrap.com/css/#responsive-utilities-classes) documentation.
*/

(function () {
    'use strict';

    function bbActionBar() {
        return {
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

            },
            restrict: 'E',
            scope: {
                title: '=?bbActionBarItemGroupTitle'
            },
            link: function ($scope, el) {
                if ($scope.title === null || angular.isUndefined($scope.title)) {
                    $scope.title = bbResources.action_bar_actions;
                }

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

    angular.module('sky.actionbar', ['sky.resources', 'sky.mediabreakpoints'])
        .directive('bbActionBar', bbActionBar)
        .directive('bbActionBarItemGroup', bbActionBarItemGroup)
        .directive('bbActionBarItem', bbActionBarItem);
}());
