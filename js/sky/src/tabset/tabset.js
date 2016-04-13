/*jslint nomen: true, plusplus: true */
/*global angular, jQuery */

(function ($) {
    'use strict';

    var DROPDOWN_CARET_WIDTH = 45,
        TAB_PADDING = 15;

    function getTemplate($templateCache, name) {
        return $templateCache.get('sky/templates/tabset/' + name + '.html');
    }

    function tabset($compile, $templateCache) {
        return {
            link: function ($scope, el, attr) {
                var ulEl,
                    liEl;

                if (angular.isDefined(attr.bbTabsetAdd) || angular.isDefined(attr.bbTabsetOpen)) {
                    ulEl = el.children('ul');
                    liEl = angular.element(getTemplate($templateCache, 'tabbutton'));
                    ulEl.append(liEl);

                    if (angular.isDefined(attr.bbTabsetAdd)) {
                        liEl.append($compile(getTemplate($templateCache, 'addbutton'))($scope));

                        $scope.bbTabAdd = function () {
                            $scope.$eval(attr.bbTabsetAdd);
                        };
                    }

                    if (angular.isDefined(attr.bbTabsetOpen)) {
                        liEl.append($compile(getTemplate($templateCache, 'openbutton'))($scope));

                        $scope.bbTabOpen = function () {
                            $scope.$eval(attr.bbTabsetOpen);
                        };
                    }
                }
            }
        };
    }

    tabset.$inject = ['$compile', '$templateCache'];

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

    function bbTabsetCollapsible($compile, $templateCache, $window, bbMediaBreakpoints) {
        return {
            restrict: 'A',
            controller: BBTabsetCollapsibleController,
            link: function ($scope, el) {
                var lastWindowWidth,
                    tabCollapseId = $scope.$id;

                function getTabUl() {
                    var ulEl = el.children('ul.nav.nav-tabs');
                    if (ulEl.length > 0) {
                        return ulEl.eq(0);
                    } else {
                        return el.find('.bb-tabset-dropdown.nav.nav-tabs ul').eq(0);
                    }
                }

                function getBootstrapTabs() {
                    var ulEl = getTabUl();
                    return ulEl.find('li:not(.bb-tab-button):not(.bb-tabset-dropdown)').eq(0);
                }

                function getDropdownEl() {
                    return angular.element(getTemplate($templateCache, 'dropdown'));
                }

                function setTabMaxWidth() {
                    //later this will resize tabs to fit the window
                    el.find('ul.nav-tabs li a').css('max-width', '');
                }

                function setDropdownMaxWidth() {
                    var availableWidth,
                        addOpenWidth = 0,
                        addOpenButtonEl,
                        i,
                        dropdownTextMaxWidth;

                    availableWidth = el.width();

                    addOpenButtonEl = el.find('.bb-tab-button-wrap');

                    for (i = 0; i < addOpenButtonEl.length; i++) {
                        addOpenWidth += addOpenButtonEl.eq(i).width();
                    }

                    dropdownTextMaxWidth = availableWidth - addOpenWidth - DROPDOWN_CARET_WIDTH - TAB_PADDING;

                    el.find('.bb-tab-header-text').css('max-width', (dropdownTextMaxWidth.toString() + 'px'));

                    el.find('.bb-tabset-dropdown ul.dropdown-menu li a').css('max-width', (availableWidth.toString() + 'px'));

                }



                function setupCollapsibleTabs(isCollapsed) {
                    var tabsEl,
                        dropdownContainerEl,
                        ulEl,
                        dropdownButtonsEl;

                    tabsEl = getBootstrapTabs();
                    dropdownButtonsEl = el.find('.bb-tab-button-wrap');

                    ulEl = getTabUl();
                    if (isCollapsed) {
                        dropdownContainerEl = el.find('.bb-tabset-dropdown');

                        ulEl.addClass('dropdown-menu');
                        ulEl.removeClass('nav');
                        ulEl.removeClass('nav-tabs');
                        dropdownContainerEl.append(ulEl);
                        dropdownContainerEl.append(dropdownButtonsEl);
                        setDropdownMaxWidth();
                    } else {
                        ulEl.removeClass('dropdown-menu');
                        ulEl.addClass('nav');
                        ulEl.addClass('nav-tabs');

                        el.prepend(ulEl);

                        ulEl.find('.bb-tab-button').append(dropdownButtonsEl);
                        setTabMaxWidth();
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

                $($window).on('resize.tabcollapse' + tabCollapseId, function () {
                    var windowWidth = $($window).width();

                    /* istanbul ignore else: sanity check */
                    if (lastWindowWidth !== windowWidth && $scope.bbTabsetOptions.isSmallScreen && $scope.bbTabsetOptions.tabCount > 1) {
                        setDropdownMaxWidth();
                    }

                    lastWindowWidth = windowWidth;
                });

                $scope.$on('$destroy', function () {
                    bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                    $($window).off('.tabcollapse' + tabCollapseId);
                });
            }
        };
    }

    bbTabsetCollapsible.$inject = ['$compile', '$templateCache', '$window', 'bbMediaBreakpoints'];

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

    function bbTabCollapseHeader() {
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

    function tab($log, $parse, $timeout) {
        return {
            require: ['?^bbTabsetCollapsible', '^uibTabset'],
            link: function ($scope, el, attr, ctrls) {
                var tabScope = el.isolateScope(),
                    bbTabsetCollapsibleCtrl = ctrls[0],
                    uibTabsetCtrl = ctrls[1],
                    activeModel;

                function getTabHeading() {
                    return tabScope.heading;
                }

                if (bbTabsetCollapsibleCtrl !== null && !angular.isDefined(attr.bbTabCollapseHeader)) {
                    collapsibleTabTitle($scope, el, bbTabsetCollapsibleCtrl, getTabHeading);
                }

                if (angular.isDefined(attr.active)) {
                    $timeout(function () {
                        $log.warn('uibTab active attribute is deprecated, instead track active state on uibTabset');

                        activeModel = $parse(attr.active);


                        $scope.$watch(function () {
                            return activeModel($scope);
                        }, function (newValue) {
                            if (newValue === true && uibTabsetCtrl.active !== tabScope.index) {
                                uibTabsetCtrl.select(tabScope.index);
                            }
                        });

                        tabScope.$watch(function () {
                            return tabScope.active;
                        }, function (newValue) {
                            if (angular.isDefined(newValue) && newValue !== activeModel($scope)) {
                                activeModel.assign($scope, newValue);
                            }
                        });
                    });
                }
            }
        };
    }

    tab.$inject = ['$log', '$parse', '$timeout'];

    angular.module('sky.tabset', ['ui.bootstrap.tabs', 'sky.mediabreakpoints'])
        .directive('uibTabset', tabset)
        .directive('bbTabsetCollapsible', bbTabsetCollapsible)
        .directive('bbTabCollapseHeader', bbTabCollapseHeader)
        .directive('uibTab', tab);

}(jQuery));
