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

    function BBTabsetCollapsibleController($scope, $timeout) {
        var self = this;

        self.updateCollapsibleHeader = function (header) {
            $scope.bbTabsetOptions.selectedTabHeader = header;
        };

        self.tabAdded = function () {
            $timeout(function () {
                $scope.bbTabsetOptions.tabCount++;
                if ($scope.bbTabsetOptions.isSmallScreen) {
                    $scope.setupCollapsibleTabs($scope.bbTabsetOptions.isSmallScreen && $scope.bbTabsetOptions.tabCount > 1);
                }
            });
        };

        self.tabRemoved = function () {
            $scope.bbTabsetOptions.tabCount--;
        };
    }

    BBTabsetCollapsibleController.$inject = ['$scope', '$timeout'];

    function bbTabsetCollapsible($compile, $templateCache, $window, bbMediaBreakpoints) {
        return {
            restrict: 'A',
            controller: BBTabsetCollapsibleController,
            link: function ($scope, el) {
                var lastWindowWidth,
                    tabCollapseId = $scope.$id;

                function hasCollapsedTabs() {
                    return el.children('ul.nav.nav-tabs').length < 1;
                }

                function getTabUl() {
                    var ulEl = el.children('ul.nav.nav-tabs');
                    if (ulEl.length > 0) {
                        return ulEl.eq(0);
                    } else {
                        return el.find('> .bb-tabset-dropdown.nav.nav-tabs > ul').eq(0);
                    }
                }

                function getAddOpenButtons() {
                    if (hasCollapsedTabs()) {
                        return el.find('> .bb-tabset-dropdown > .bb-tab-button-wrap');
                    } else {
                        return el.find('> ul.nav.nav-tabs > li.bb-tab-button > .bb-tab-button-wrap');
                    }
                }

                function getBootstrapTabs() {
                    var ulEl = getTabUl();
                    return ulEl.children('li:not(.bb-tab-button):not(.bb-tabset-dropdown)').eq(0);
                }

                function getDropdownEl() {
                    return angular.element(getTemplate($templateCache, 'dropdown'));
                }

                function setTabMaxWidth() {
                    //later this will resize tabs to fit the window
                    var ulEl = getTabUl();
                    ulEl.find('> li > a').css('max-width', '');
                }

                function setDropdownMaxWidth() {
                    var availableWidth,
                        addOpenWidth = 0,
                        addOpenButtonEl,
                        i,
                        dropdownTextMaxWidth;

                    availableWidth = el.width();

                    addOpenButtonEl = getAddOpenButtons();

                    for (i = 0; i < addOpenButtonEl.length; i++) {
                        addOpenWidth += addOpenButtonEl.eq(i).width();
                    }

                    dropdownTextMaxWidth = availableWidth - addOpenWidth - DROPDOWN_CARET_WIDTH - TAB_PADDING;

                    /* If widths are available, we can override the default max-width of the dropdown button and menu to be more specific */
                    if (dropdownTextMaxWidth > 0) {
                        el.find('> .bb-tabset-dropdown > .bb-tab-dropdown-button > .bb-tab-header-text').css('max-width', (dropdownTextMaxWidth.toString() + 'px'));
                    }

                    if (availableWidth > 0) {
                        el.find('> .bb-tabset-dropdown > ul.dropdown-menu > li >  a').css('max-width', (availableWidth.toString() + 'px'));
                    }

                }

                function setupCollapsibleTabs(isCollapsed) {
                    var tabsEl,
                        dropdownContainerEl,
                        ulEl,
                        dropdownButtonsEl;

                    tabsEl = getBootstrapTabs();
                    dropdownButtonsEl = getAddOpenButtons();
                    ulEl = getTabUl();
                    if (isCollapsed) {
                        dropdownContainerEl = el.children('.bb-tabset-dropdown');

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

                        ulEl.children('.bb-tab-button').append(dropdownButtonsEl);
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

                    /* istanbul ignore else */
                    /* sanity check */
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

    function bbTabHeadingXs($compile, $templateCache) {
        return {
            require: 'uibTab',
            link: function ($scope, el, attr) {
                var anchorEl;

                anchorEl = el.children('a');
                anchorEl.wrapInner(getTemplate($templateCache, 'largeheading'));
                anchorEl.append($compile(getTemplate($templateCache, 'smallheading'))($scope));


                $scope.bbTabHeadingXs = attr.bbTabHeadingXs;

                $scope.$watch(function () {
                    return attr.bbTabHeadingXs;
                }, function (newValue) {
                    $scope.bbTabHeadingXs = newValue;
                });
            }
        };
    }

    bbTabHeadingXs.$inject = ['$compile', '$templateCache'];

    function BBVerticalTabsetController() {
        var self = this;

        self.addTabGroup = addTabGroup;
        self.tabGroups = [];

        function addTabGroup(tabGroup) {
            self.tabGroups.push(tabGroup);
        }
    }

    BBVerticalTabsetController.$inject = [];

    function bbVerticalTabset($log, $parse, bbMediaBreakpoints) {
        return {
            controller: BBVerticalTabsetController,
            link: link,
            require: ['uibTabset', 'bbVerticalTabset'],
            restrict: 'A'
        };

        function link($scope, el, attr, ctrls) {
            var uibTabsetCtrl = ctrls[0],
                bbVerticalTabsetCtrl = ctrls[1],
                scope = el.isolateScope();

            if (angular.isDefined(attr.bbTabsetAdd)) {
                $log.warn('uibTabset bbTabsetAdd attribute is incompatible with bbVerticalTabset, it will be ignored');
            }
            if (angular.isDefined(attr.bbTabsetOpen)) {
                $log.warn('uibTabset bbTabsetOpen attribute is incompatible with bbVerticalTabset, it will be ignored');
            }
            if (angular.isDefined(attr.bbTabsetCollapsible)) {
                $log.warn('using the uibTabset bbTabsetCollapsible attribute with bbVerticalTabset is not supported, it may yield undesirable results');
            }
            if (angular.isDefined(attr.justified)) {
                $log.warn('uibTabset justified attribute is incompatible with bbVerticalTabset, it will be ignored');
            }
            if (angular.isDefined(attr.type) && $parse(attr.type)($scope) !== 'tabs') {
                $log.warn('uibTabset type attribute values other than \'tabs\' are incompatible with bbVerticalTabset and will be ignored');
            }
            if (angular.isDefined(attr.vertical) && !$parse(attr.vertical)($scope)) {
                $log.warn('uibTabset vertical attribute values other than true are incompatible with bbVerticalTabset and will be ignored');
            }

            scope.closeOthers = angular.isDefined(attr.bbVerticalTabsetCloseOthers) ?
                $parse(attr.bbVerticalTabsetCloseOthers)($scope) :
                false;
            scope.showTabs = true;

            bbMediaBreakpoints.register(mobileBreakpointHandler);
            $scope.$on('$destroy', function () {
                bbMediaBreakpoints.unregister(mobileBreakpointHandler);
            });
            $scope.$on('reinitializeVerticalTabsetDisplay', function () {
                scope.showTabs = scope.isMobile;
                if (scope.isMobile) {
                    uibTabsetCtrl.active = -1;
                }
            });

            $scope.$watch(
                function () {
                    return $parse(attr.bbVerticalTabsetCloseOthers)($scope);
                },
                function (val) {
                    scope.closeOthers = val;
                }
            );
            $scope.$watch(
                function () {
                    return uibTabsetCtrl.active;
                },
                function (value) {
                    scope.showTabs = angular.isUndefined(value) || value === null || value < 0;
                    activateTabGroup(value);
                }
            );

            if (angular.isDefined(uibTabsetCtrl.active)) {
                activateTabGroup(uibTabsetCtrl.active);
            }

            function mobileBreakpointHandler(breakpoints) {
                scope.isMobile = breakpoints.xs;
            }

            function activateTabGroup(newIndex) {
                var activeGroup = bbVerticalTabsetCtrl.tabGroups
                    .filter(function (tabGroup) {
                        return tabGroup.tabs.filter(function (tab) {
                            return tab.index === newIndex || tab.active;
                        }).length > 0;
                    });

                bbVerticalTabsetCtrl.tabGroups
                    .forEach(function (tabGroup) {
                        tabGroup.active = false;
                    });

                if (activeGroup.length > 0) {
                    activeGroup[0].activateTabGroup();
                }
            }
        }
    }

    bbVerticalTabset.$inject = ['$log', '$parse', 'bbMediaBreakpoints'];

    function BBVerticalTabsetGroupController() {
        var self = this;

        self.addTab = addTab;
        self.activateTabGroup = activateTabGroup;
        self.tabs = [];

        function addTab(tab) {
            self.tabs.push(tab);
        }
        function activateTabGroup() {
            self.active = true;
            self.isOpen = true;
        }
    }

    BBVerticalTabsetGroupController.$inject = [];

    function bbVerticalTabsetGroup() {
        return {
            bindToController: true,
            controller: BBVerticalTabsetGroupController,
            controllerAs: 'bbVerticalTabsetGroup',
            link: link,
            replace: true,
            require: ['^bbVerticalTabset', 'bbVerticalTabsetGroup'],
            restrict: 'A',
            scope: {
                heading: '@bbVerticalTabsetGroupHeading',
                isDisabled: '=?bbVerticalTabsetGroupIsDisabled',
                isOpen: '=?bbVerticalTabsetGroupIsOpen'
            },
            templateUrl: function (el, attr) {
                return angular.isDefined(attr.bbVerticalTabsetGroupTemplateUrl) ?
                    attr.bbVerticalTabsetGroupTemplateUrl :
                    'sky/templates/tabset/verticaltabsetgroup.html';
            },
            transclude: true
        };

        function link($scope, el, attr, ctrls) {
            var bbVerticalTabsetCtrl = ctrls[0],
                bbVerticalTabsetGroupCtrl = ctrls[1];

            bbVerticalTabsetCtrl.addTabGroup(bbVerticalTabsetGroupCtrl);
        }
    }

    bbVerticalTabsetGroup.$inject = [];

    function uibTabsetDirectiveDecorator($delegate) {
        decorateTemplateUrl(
             $delegate[0],
            'sky/templates/tabset/verticaltabset.html',
            function (el, attr) {
                return angular.isDefined(attr.bbVerticalTabset);
            }
        );
        return $delegate;
    }

    uibTabsetDirectiveDecorator.$inject = ['$delegate'];

    function uibTabDirectiveDecorator($delegate) {
        decorateTemplateUrl(
            $delegate[0],
            'sky/templates/tabset/verticaltabsettab.html',
            function (el) {
                return el.parent('[bb-vertical-tabset], [bb-vertical-tabset-group]').length > 0;
            }
        );
        decorateLink(
            $delegate[0],
            '^bbVerticalTabsetGroup',
            function ($scope, el, attr, ctrl) {
                ctrl.addTab($scope);
            }
        );
        return $delegate;
    }

    uibTabDirectiveDecorator.$inject = ['$delegate'];

    function decorateTemplateUrl(delegate, newTemplateUrl, conditionFn) {
        var originalTemplateUrl = delegate.templateUrl;
        delegate.templateUrl = function (el, attr) {
            if (conditionFn(el, attr)) {
                return angular.isDefined(attr.templateUrl) ?
                    attr.templateUrl :
                    newTemplateUrl;
            }
            return angular.isFunction(originalTemplateUrl) ?
                originalTemplateUrl.apply(this, arguments) :
                /* istanbul ignore next: sanity check */
                originalTemplateUrl;
        };
    }

    function decorateLink(delegate, requiredDirective, linkFn) {
        var originalRequireIsArray = angular.isArray(delegate.require),
            originalLink = delegate.link,
            newDir = '?'.concat(requiredDirective);
        delegate.require = originalRequireIsArray ?
            /* istanbul ignore next: sanity check */
            [newDir].concat(delegate.require) :
            [newDir, delegate.require];
        delegate.compile = function () {
            return function ($scope, el, attr, ctrls, transclude) {
                if (ctrls[0] !== null) {
                    linkFn.call(this, $scope, el, attr, ctrls[0], transclude);
                }
                return originalLink.call(
                    this,
                    $scope,
                    el,
                    attr,
                    originalRequireIsArray ?
                        /* istanbul ignore next: sanity check */
                        ctrls.slice(1) :
                        ctrls[1],
                    transclude
                );
            };
        };
    }

    angular.module('sky.tabset', ['ui.bootstrap.tabs', 'sky.mediabreakpoints', 'sky.resources'])
        .directive('uibTabset', tabset)
        .directive('bbTabsetCollapsible', bbTabsetCollapsible)
        .directive('bbTabCollapseHeader', bbTabCollapseHeader)
        .directive('uibTab', tab)
        .directive('bbTabHeadingXs', bbTabHeadingXs)
        .directive('bbVerticalTabset', bbVerticalTabset)
        .directive('bbVerticalTabsetGroup', bbVerticalTabsetGroup)
        .decorator('uibTabsetDirective', uibTabsetDirectiveDecorator)
        .decorator('uibTabDirective', uibTabDirectiveDecorator);

}(jQuery));
