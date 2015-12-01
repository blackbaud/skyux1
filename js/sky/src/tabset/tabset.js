/*jslint nomen: true, plusplus: true */
/*global angular */

/** @module Tabset
@icon folder-open-o
@summary The tabset module contains directives for enhancing ui-bootstrap tabs.
 @description ### Additional Dependencies ###

### Tabset Options ###

The `bb-tabset-add` attribute creates an add button in the tab area and takes a callback that will be executed when the add button is clicked.

The `bb-tabset-open` attribute creates an open button in the tab area and takes a callback that will be executed when the open button is clicked.

### Collapsing Tabs ###

To make tabs collapse into a dropdown on a small (mobile device) screen, use the `bb-tabset-collapsible` attribute on a ui-bootstrap `tabset`.
You must then use the `bb-tab-collapse-header` attribute on your ui-bootstrap `tab` to specify a title for the dropdown that will display when a tab is active.

### Tab Close Icon ###

If you wish to add a close icon to a tab, just add the `bb-tab-close` class to the ui-bootstrap `tab` element, and add an `i` element with the `bb-tab-close-icon` class inside of the ui-bootstrap `tab-heading` directive.

 */
(function () {
    'use strict';

    function Tabset($compile) {
        return {
            link: function ($scope, el, attr) {
                var ulEl,
                    liEl;
                if (angular.isDefined(attr.bbTabsetAdd) || angular.isDefined(attr.bbTabsetOpen)) {
                    ulEl = el.find('ul');
                    liEl = angular.element('<li class="bb-tab-button"></li>');
                    ulEl.append(liEl);

                    if (angular.isDefined(attr.bbTabsetAdd)) {

                        liEl.append($compile('<button ng-click="bbTabAdd()" type="button" class="bb-tab-button-wrap btn bb-tab-button-add bb-btn-secondary"><span class="btn bb-btn-secondary"><i class="fa fa-lg fa-plus-circle"></i></span></button>')($scope));

                        $scope.bbTabAdd = function () {
                            $scope.$eval(attr.bbTabsetAdd);
                        };
                    }

                    if (angular.isDefined(attr.bbTabsetOpen)) {
                        liEl.append($compile('<button ng-click="bbTabOpen()" type="button" class="bb-tab-button-wrap bb-tab-button-open btn bb-btn-secondary"><span class="btn bb-btn-secondary"><i class="fa fa-lg fa-folder-open-o"></i></span></button>')($scope));

                        $scope.bbTabOpen = function () {
                            $scope.$eval(attr.bbTabsetOpen);
                        };
                    }
                }
            }
        };
    }

    Tabset.$inject = ['$compile'];

    function BBTabsetCollapsibleController($scope) {
        var self = this;

        self.updateCollapsibleHeader = function (header) {
            $scope.bbTabsetOptions.selectedTabHeader = header;
        };

        self.tabAdded = function () {
            if ($scope.bbTabsetOptions.isSmallScreen) {
                $scope.setupCollapsibleTabs($scope.bbTabsetOptions.isSmallScreen && $scope.bbTabsetOptions.tabCount > 1);
            }
            $scope.bbTabsetOptions.tabCount++;
        };

        self.tabRemoved = function () {
            $scope.bbTabsetOptions.tabCount--;
        };

    }

    BBTabsetCollapsibleController.$inject = ['$scope'];

    function BBTabsetCollapsible($compile, bbMediaBreakpoints) {
        return {
            restrict: 'A',
            controller: 'bbTabsetCollapsibleController',
            link: function ($scope, el) {


                function getBootstrapTabs() {
                    return el.find('li:not(.bb-tab-button):not(.bb-tabset-dropdown)');
                }

                function getDropdownEl() {
                    return angular.element('<div class="bb-tabset-dropdown nav nav-tabs" uib-dropdown ng-show="bbTabsetOptions.isSmallScreen && bbTabsetOptions.tabCount > 1"><button type="button" class="btn btn-primary bb-tab-dropdown-button" uib-dropdown-toggle>{{bbTabsetOptions.selectedTabHeader}}<i class="fa fa-caret-down"></i></button></div>');
                }

                function setupCollapsibleTabs(isCollapsed) {
                    var tabsEl,
                        dropdownContainerEl,
                        ulEl,
                        dropdownButtonsEl;

                    tabsEl = getBootstrapTabs();
                    dropdownButtonsEl = el.find('.bb-tab-button-wrap');

                    ulEl = el.find('ul:not(.bb-tabset-dropdown)');
                    if (isCollapsed) {
                        dropdownContainerEl = el.find('.bb-tabset-dropdown');

                        ulEl.addClass('dropdown-menu');
                        ulEl.removeClass('nav');
                        ulEl.removeClass('nav-tabs');
                        dropdownContainerEl.append(ulEl);
                        dropdownContainerEl.append(dropdownButtonsEl);
                    } else {
                        ulEl.removeClass('dropdown-menu');
                        ulEl.addClass('nav');
                        ulEl.addClass('nav-tabs');

                        el.prepend(ulEl);

                        ulEl.find('.bb-tab-button').append(dropdownButtonsEl);
                    }
                }

                $scope.setupCollapsibleTabs = setupCollapsibleTabs;

                function mediaBreakpointHandler(newBreakpoints) {
                    $scope.bbTabsetOptions.isSmallScreen = newBreakpoints.xs;
                    setupCollapsibleTabs(newBreakpoints.xs && ($scope.bbTabsetOptions.tabCount > 1));
                }

                $scope.bbTabsetOptions = {
                    isSmallScreen: false,
                    tabCount: 0
                };

                el.prepend($compile(getDropdownEl())($scope));

                $scope.$watch('bbTabsetOptions.tabCount', function (newValue) {
                    if ($scope.bbTabsetOptions.isSmallScreen) {
                        if (newValue && newValue > 1) {
                            setupCollapsibleTabs(true);
                        } else {
                            setupCollapsibleTabs(false);
                        }
                    }

                });

                bbMediaBreakpoints.register(mediaBreakpointHandler);

                $scope.$on('$destroy', function () {
                    bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                });
            }
        };
    }

    BBTabsetCollapsible.$inject = ['$compile', 'bbMediaBreakpoints'];

    function collapsibleTabTitle($scope, el, bbTabsetCollapsibleCtrl, getTabHeading) {
        //get ui-bootstrap tab scope
        var tabScope = el.isolateScope();
        $scope.$watch(function () {
            return tabScope.active;
        }, function (active) {
            if (active) {
                bbTabsetCollapsibleCtrl.updateCollapsibleHeader(getTabHeading());
            }
        });

        $scope.$watch(function () {
            return getTabHeading();
        }, function (collapseTitle) {
            if (tabScope.active) {
                bbTabsetCollapsibleCtrl.updateCollapsibleHeader(collapseTitle);
            }
        });

        bbTabsetCollapsibleCtrl.tabAdded();

        $scope.$on('$destroy', function () {
            bbTabsetCollapsibleCtrl.tabRemoved();
        });
    }


    function BBTabCollapseHeader() {
        return {
            require: '^bbTabsetCollapsible',
            link: function ($scope, el, attr, bbTabsetCollapsibleCtrl) {
                function getTabHeading() {
                    return $scope.$eval(attr.bbTabCollapseHeader);
                }

                collapsibleTabTitle($scope, el, bbTabsetCollapsibleCtrl, getTabHeading);
            }
        };
    }

    function Tab() {
        return {
            require: '?^bbTabsetCollapsible',
            link: function ($scope, el, attr, bbTabsetCollapsibleCtrl) {
                var tabScope = el.isolateScope();

                function getTabHeading() {
                    return tabScope.heading;
                }

                if (bbTabsetCollapsibleCtrl !== null && !angular.isDefined(attr.bbTabCollapseHeader)) {
                    collapsibleTabTitle($scope, el, bbTabsetCollapsibleCtrl, getTabHeading);
                }
            }
        };
    }

    angular.module('sky.tabset', ['ui.bootstrap.tabs', 'sky.mediabreakpoints'])
        .controller('bbTabsetCollapsibleController', BBTabsetCollapsibleController)
        .directive('tabset', Tabset)
        .directive('uibTabset', Tabset)
        .directive('bbTabsetCollapsible', BBTabsetCollapsible)
        .directive('bbTabCollapseHeader', BBTabCollapseHeader)
        .directive('tab', Tab)
        .directive('uibTab', Tab);
}());
