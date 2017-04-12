/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Tabset module', function () {
    'use strict';

    var $compile,
        $document,
        dynamicTabsHtml,
        $scope,
        bbMediaBreakpoints,
        $timeout,
        bbResources,
        $log,
        $templateCache;

    beforeEach(module(
        'ngMock',
        'sky.tabset',
        'sky.templates',
        'uib/template/tabs/tabset.html',
        'uib/template/tabs/tab.html'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$document_, _bbMediaBreakpoints_, _$timeout_, _bbResources_, _$log_, _$templateCache_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $document = _$document_;
        bbMediaBreakpoints = _bbMediaBreakpoints_;
        $timeout = _$timeout_;
        bbResources = _bbResources_;
        $log = _$log_;
        $templateCache = _$templateCache_;

        dynamicTabsHtml = '<uib-tabset bb-tabset-add="addTab()" bb-tabset-open="openTab()">' +
                '<uib-tab>' +
                    '<uib-tab-heading>' +
                        'Tab 1' +
                    '</uib-tab-heading>' +
                    'Yo' +
                '</uib-tab>' +
                '<uib-tab>' +
                    '<uib-tab-heading>' +
                        'Tab 2' +
                    '</uib-tab-heading>' +
                    'Hey' +
                '</uib-tab>' +
            '</uib-tabset>';
    }));

    function getLargeScreenAddButton(el) {
        return el.find('li.bb-tab-button button.bb-tab-button-wrap.bb-tab-button-add');
    }

    function getLargeScreenOpenButton(el) {
        return el.find('li.bb-tab-button button.bb-tab-button-wrap.bb-tab-button-open');
    }

    function getTabs(el) {
        return el.find('ul.nav-tabs > li');
    }

    describe('tabs with active attribute', function () {
        var tabsHtml,
            el;
        beforeEach(function () {
            tabsHtml = '<uib-tabset>' +
            '<uib-tab heading="t.title" ng-repeat="t in myTabs" active="t.active">' +
                '{{t.content}}' +
            '</uib-tab>' +
            '</uib-tabset>';

            $scope.myTabs = [
                {
                    title: 'Tab 1',
                    content: '1 content',
                    active: true
                },
                {
                    title: 'Tab 2',
                    content: '2 content'
                },
                {
                    title: 'Tab 3',
                    content: '3 content'
                }
            ];
        });

        it('should change the tab when tab active is set to true', function () {
            var tabsEl;


            el = $compile(tabsHtml)($scope);

            $scope.$digest();
            $timeout.flush();

            $scope.myTabs[1].active = true;
            $scope.$digest();

            expect($scope.myTabs[0].active).not.toBe(true);
            expect($scope.myTabs[1].active).toBe(true);
            expect($scope.myTabs[2].active).not.toBe(true);

            tabsEl = getTabs(el);

            expect(tabsEl.eq(0)).not.toHaveClass('active');
            expect(tabsEl.eq(1)).toHaveClass('active');
            expect(tabsEl.eq(2)).not.toHaveClass('active');
        });

        it('should change the active when the tab is clicked manually', function () {
            var tabsEl;

            el = $compile(tabsHtml)($scope);
            $scope.$digest();
            $timeout.flush();

            tabsEl = getTabs(el);

            tabsEl.eq(1).find('a').click();
            $scope.$digest();

            expect($scope.myTabs[0].active).not.toBe(true);
            expect($scope.myTabs[1].active).toBe(true);
            expect($scope.myTabs[2].active).not.toBe(true);

            tabsEl = getTabs(el);

            expect(tabsEl.eq(0)).not.toHaveClass('active');
            expect(tabsEl.eq(1)).toHaveClass('active');
            expect(tabsEl.eq(2)).not.toHaveClass('active');
        });

        it('should initialize the tabs properly when active is set to true', function () {
            var tabsEl;

            $scope.myTabs[0].active = false;
            $scope.myTabs[1].active = true;

            el = $compile(tabsHtml)($scope);
            $scope.$digest();
            $timeout.flush();

            expect($scope.myTabs[0].active).not.toBe(true);
            expect($scope.myTabs[1].active).toBe(true);
            expect($scope.myTabs[2].active).not.toBe(true);

            tabsEl = getTabs(el);

            expect(tabsEl.eq(0)).not.toHaveClass('active');
            expect(tabsEl.eq(1)).toHaveClass('active');
            expect(tabsEl.eq(2)).not.toHaveClass('active');

            $scope.myTabs[0].active = true;

            $scope.$digest();

            expect($scope.myTabs[0].active).toBe(true);
            expect($scope.myTabs[1].active).not.toBe(true);
            expect($scope.myTabs[2].active).not.toBe(true);

            tabsEl = getTabs(el);

            expect(tabsEl.eq(0)).toHaveClass('active');
            expect(tabsEl.eq(1)).not.toHaveClass('active');
            expect(tabsEl.eq(2)).not.toHaveClass('active');
        });
    });

    describe('Xs tab heading', function () {
        it('should add a tab heading that is visible at xs breakpoints', function () {
            var el,
                largeHeadingEl,
                smallHeadingEl,
                tabHtml = '<uib-tabset>' +
                            '<uib-tab heading="{{locals.heading_lg}}" bb-tab-heading-xs="{{locals.heading_sm}}">' +
                                'Content 1' +
                            '</uib-tab>' +
                            '</uib-tabset>';

            $scope.locals = {
                heading_lg: 'Looooong heading',
                heading_sm: 'Heading'
            };

            el = $compile(tabHtml)($scope);
            $scope.$digest();
            largeHeadingEl = el.find('li a .hidden-xs');
            expect(largeHeadingEl).toHaveText($scope.locals.heading_lg);
            smallHeadingEl = el.find('li a .visible-xs');
            expect(smallHeadingEl).toHaveText($scope.locals.heading_sm);

            $scope.locals.heading_sm = '1';
            $scope.$digest();

            smallHeadingEl = el.find('li a .visible-xs');
            expect(smallHeadingEl).toHaveText($scope.locals.heading_sm);

        });
    });

    describe('adding tabs', function () {
        it('adds tabs', function () {
            var el,
                tabAdded = false;

            $scope.addTab = function () {
                tabAdded = true;
            };

            el = $compile(dynamicTabsHtml)($scope);
            $scope.$digest();

            getLargeScreenAddButton(el).click();
            $scope.$digest();
            expect(tabAdded).toBe(true);
        });

        it('should allows the screen reader text for the add tab button to be localizable', function () {
            var el;

            bbResources.tab_add = '__test__add';

            el = $compile(dynamicTabsHtml)($scope);
            $scope.$digest();

            expect(el.find('.bb-tab-button-add').attr('aria-label')).toContain(bbResources.tab_add);
        });
    });

    describe('opening tabs', function () {
        it('opens tabs', function () {
            var el,
                tabOpened = false;
            $scope.openTab = function () {
                tabOpened = true;
            };

            el = $compile(dynamicTabsHtml)($scope);
            $scope.$digest();

            getLargeScreenOpenButton(el).click();
            $scope.$digest();
            expect(tabOpened).toBe(true);
        });
    });
    describe('no add open', function () {
        it('adds no buttons if add and open are not defined', function () {
            var noButtonsHtml = '<uib-tabset>' +
                    '<uib-tab>' +
                        '<uib-tab-heading>' +
                            'Tab 1' +
                        '</uib-tab-heading>' +
                        'Yo' +
                    '</uib-tab>' +
                    '<uib-tab>' +
                        '<uib-tab-heading>' +
                            'Tab 2' +
                        '</uib-tab-heading>' +
                        'Hey' +
                    '</uib-tab>' +
                '</uib-tabset>',
                el,
                addButtonEl,
                openButtonEl;

            el = $compile(noButtonsHtml)($scope);
            $scope.$digest();

            addButtonEl = getLargeScreenAddButton(el);
            expect(addButtonEl.length).toBe(0);

            openButtonEl = getLargeScreenOpenButton(el);
            expect(openButtonEl.length).toBe(0);
        });

        it('adds only the add button if only the add button is defined', function () {
            var addOnlyHtml = '<uib-tabset bb-tabset-add="addTab()">' +
                    '<uib-tab>' +
                        '<uib-tab-heading>' +
                            'Tab 1' +
                        '</uib-tab-heading>' +
                        'Yo' +
                    '</uib-tab>' +
                    '<uib-tab>' +
                        '<uib-tab-heading>' +
                            'Tab 2' +
                        '</uib-tab-heading>' +
                        'Hey' +
                    '</uib-tab>' +
                '</uib-tabset>',
                el,
                openButtonEl,
                tabAdded = false;

            $scope.addTab = function () {
                tabAdded = true;
            };

            el = $compile(addOnlyHtml)($scope);
            $scope.$digest();

            getLargeScreenAddButton(el).click();
            $scope.$digest();
            expect(tabAdded).toBe(true);

            openButtonEl = getLargeScreenOpenButton(el);
            expect(openButtonEl.length).toBe(0);
        });

        it('adds only the open button if only the open button is defined', function () {
            var openOnlyHtml = '<uib-tabset bb-tabset-open="openTab()">' +
                    '<uib-tab>' +
                        '<uib-tab-heading>' +
                            'Tab 1' +
                        '</uib-tab-heading>' +
                        'Yo' +
                    '</uib-tab>' +
                    '<uib-tab>' +
                        '<uib-tab-heading>' +
                            'Tab 2' +
                        '</uib-tab-heading>' +
                        'Hey' +
                    '</uib-tab>' +
                '</uib-tabset>',
                el,
                addButtonEl,
                tabOpened = false;

            $scope.openTab = function () {
                tabOpened = true;
            };

            el = $compile(openOnlyHtml)($scope);
            $scope.$digest();

            getLargeScreenOpenButton(el).click();
            $scope.$digest();
            expect(tabOpened).toBe(true);

            addButtonEl = getLargeScreenAddButton(el);
            expect(addButtonEl.length).toBe(0);
        });
    });

    describe('collapsible tabs', function () {
        var addButtonEl,
            openButtonEl,
            callback,
            allCallbacks,
            collapsibleTabsHtml,
             collapsibleTabsInnerTabHtml,
            collapsibleSpecificTabsHtml,
            collapsibleSpecificNoAddOpenTabsHtml,
            dropdownWrapperEl,
            tabTitleEl,
            tabCount,
            tabsEl;

        beforeEach(function () {
            var specificTabs = '<uib-tab bb-tab-collapse-header="\'Tab 1\'" class="bb-tab-close">' +
                '<uib-tab-heading>' +
                    'Tab 1' +
                    '<button type="button" class="bb-tab-close-icon" ng-click="closeTab($index, $event)"></button>' +
                '</uib-tab-heading>' +
                '<span class="bb-test-content">1 content</span>' +
                '<ul class="bb-test-ul"><li class="bb-test-li">1</li></ul>' +
            '</uib-tab>' +
            '<uib-tab bb-tab-collapse-header="\'Tab 2\'" class="bb-tab-close">' +
                '<uib-tab-heading>' +
                    'Tab 2' +
                    '<button type="button" class="bb-tab-close-icon" ng-click="closeTab($index, $event)"></button>' +
                '</uib-tab-heading>' +
                '<span class="bb-test-content">2 content</span>' +
                '<ul class="bb-test-ul"><li class="bb-test-li">1</li></ul>' +
            '</uib-tab>' +
            '<uib-tab bb-tab-collapse-header="\'Tab 3\'" class="bb-tab-close">' +
                '<uib-tab-heading>' +
                    'Tab 3' +
                    '<button type="button" class="bb-tab-close-icon" ng-click="closeTab($index, $event)"></button>' +
                '</uib-tab-heading>' +
                '<span class="bb-test-content">3 content</span>' +
                '<ul class="bb-test-ul"><li class="bb-test-li">1</li></ul>' +
            '</uib-tab>' +
            '</uib-tabset>';
            collapsibleTabsHtml = '<uib-tabset bb-tabset-add="addTab()" bb-tabset-open="openTab()" bb-tabset-collapsible>' +
            '<uib-tab bb-tab-collapse-header="t.title" ng-repeat="t in myTabs" class="bb-tab-close">' +
                '<uib-tab-heading>' +
                    '{{t.title}}' +
                    '<button type="button" class="bb-tab-close-icon" ng-click="closeTab($index, $event)"></button>' +
                '</uib-tab-heading>' +
                '<span class="bb-test-content">{{t.content}}</span>' +
                '<ul class="bb-test-ul"><li class="bb-test-li">1</li></ul>' +
            '</uib-tab>' +
            '</uib-tabset>';
            collapsibleTabsInnerTabHtml = '<uib-tabset bb-tabset-collapsible>' +
                '<uib-tab bb-tab-collapse-header="\'Testing\'">' +
                '<uib-tab-heading>Testing</uib-tab-heading>' +
                '<div>' +
                'tab body one' +
                '</div>' +
                '</uib-tab>' +
                '<uib-tab bb-tab-collapse-header="\'Second tab\'">' +
                '<uib-tab-heading>Second tab</uib-tab-heading>' +
                '<div>' +
                '<uib-tabset bb-tabset-collapsible>' +
                '<uib-tab bb-tab-collapse-header="\'Third tab\'">' +
                '<uib-tab-heading>Third tab</uib-tab-heading>' +
                '</uib-tab>' +
                '<uib-tab bb-tab-collapse-header="\'Fourth tab\'">' +
                '<uib-tab-heading>Fourth tab</uib-tab-heading>' +
                '</uib-tab>' +
                '</uib-tabset>' +
                '</div>' +
                '</uib-tab>' +
                '</uib-tabset>';
            collapsibleSpecificTabsHtml = '<uib-tabset bb-tabset-add="addTab()" bb-tabset-open="openTab()" bb-tabset-collapsible>' +
                specificTabs;
            collapsibleSpecificNoAddOpenTabsHtml = '<uib-tabset bb-tabset-collapsible>' +
                specificTabs;


            $scope.myTabs = [
                {
                    title: 'Tab 1',
                    content: '1 content'
                },
                {
                    title: 'Tab 2',
                    content: '2 content'
                },
                {
                    title: 'Tab 3',
                    content: '3 content'
                }
            ];
            tabCount = 4;

            $scope.closeTab = function (index, event) {
                event.preventDefault();
                $scope.myTabs.splice(index, 1);
            };

            $scope.addTab = function () {
                var newTitle = 'Tab ' + tabCount.toString(),
                    newContent = tabCount.toString() + ' content';
                $scope.myTabs.push({
                    title: newTitle,
                    content: newContent
                });
                tabCount++;
            };

        });

        function getDropdownWrapper(el) {
            return el.find('.bb-tabset-dropdown');
        }

        function getLargeScreenTabs(el) {
            return el.find('ul.nav-tabs li a');
        }

        function getSmallScreenTabs(el) {
            return el.find('.bb-tabset-dropdown ul.dropdown-menu li a');
        }

        function getSmallScreenAddButton(el) {
            return el.find('.bb-tabset-dropdown button.bb-tab-button-wrap.bb-tab-button-add');
        }

        function getSmallScreenOpenButton(el) {
            return el.find('.bb-tabset-dropdown button.bb-tab-button-wrap.bb-tab-button-open');
        }

        function getActiveTabContent(el) {
            return el.find('.tab-pane.active span.bb-test-content');
        }

        function callBreakpointImmediate(tabCallback) {
            tabCallback({xs: true});
        }

        function setupCollapsibleTest(htmlTemplate, spyFunction) {
            var el;
            allCallbacks = [];

            if (angular.isDefined(spyFunction)) {
                spyOn(bbMediaBreakpoints, 'register').and.callFake(spyFunction);
            } else {
                spyOn(bbMediaBreakpoints, 'register').and.callFake(function (tabCallback) {
                    allCallbacks.push(tabCallback);
                    callback = allCallbacks[0];
                });
            }

            el = angular.element(htmlTemplate);
            $document.find('body').eq(0).append(el);
            $compile(el)($scope);

            $scope.$digest();
            $timeout.flush();
            $scope.$digest();
            return el;
        }

        function getTabDropdownButton(el) {
            return el.find('.bb-tab-dropdown-button');
        }

        function verifyChildList(el) {
            expect(el.find('.tab-pane.active ul.bb-test-ul li.bb-test-li').length).toBe(1);
            expect(el.find('.bb-tabset-dropdown ul.bb-test-ul li.bb-test-li').length).toBe(0);
        }

        function validateSmallMode(el) {
            tabsEl = getLargeScreenTabs(el);
            expect(tabsEl.length).toBe(0);

            dropdownWrapperEl = getDropdownWrapper(el);
            expect(dropdownWrapperEl).toBeVisible();
            tabsEl = getSmallScreenTabs(el);
            expect(tabsEl.length).toBe(3);

            tabTitleEl = getTabDropdownButton(el);
            expect(tabTitleEl).toHaveText($scope.myTabs[0].title);
            tabTitleEl.click();

            tabsEl.eq(1).click();
            $scope.$digest();
            expect(getActiveTabContent(el)).toHaveText($scope.myTabs[1].content);

            verifyChildList(el);

            tabTitleEl = getTabDropdownButton(el);
            expect(tabTitleEl).toHaveText($scope.myTabs[1].title);

            addButtonEl = getLargeScreenAddButton(el);
            expect(addButtonEl.length).toBe(0);
            addButtonEl = getSmallScreenAddButton(el);
            expect(addButtonEl.length).toBe(1);

            openButtonEl = getLargeScreenOpenButton(el);
            expect(openButtonEl.length).toBe(0);
            openButtonEl = getSmallScreenOpenButton(el);
            expect(openButtonEl.length).toBe(1);
        }

        function validateLargeMode(el, numTabs, activeIndex) {
            tabsEl = getLargeScreenTabs(el);
            expect(tabsEl.length).toBe(numTabs);
            expect(tabsEl.eq(activeIndex).parent('li')).toHaveClass('active');

            dropdownWrapperEl = getDropdownWrapper(el);
            expect(dropdownWrapperEl).not.toBeVisible();

            addButtonEl = getLargeScreenAddButton(el);
            expect(addButtonEl.length).toBe(1);
            addButtonEl = getSmallScreenAddButton(el);
            expect(addButtonEl.length).toBe(0);

            openButtonEl = getLargeScreenOpenButton(el);
            expect(openButtonEl.length).toBe(1);
            openButtonEl = getSmallScreenOpenButton(el);
            expect(openButtonEl.length).toBe(0);

            expect(getActiveTabContent(el)).toHaveText($scope.myTabs[activeIndex].content);
            verifyChildList(el);
        }

        it('collapses into a dropdown on extra small mode when there is more than 1 tab', function () {
            var el,
                tabsEl,
                dropdownWrapperEl;

            el = setupCollapsibleTest(collapsibleTabsHtml);

            tabsEl = getLargeScreenTabs(el);
            expect(tabsEl.length).toBe(3);
            dropdownWrapperEl = getDropdownWrapper(el);
            expect(dropdownWrapperEl).not.toBeVisible();

            callback({xs: true});
            $scope.$digest();

            validateSmallMode(el);

            callback({xs: false});
            $scope.$digest();
            validateLargeMode(el, 3, 1) ;

            $scope.myTabs.splice(2, 1);
            $scope.myTabs.splice(0, 1);
            $scope.$digest();

            callback({xs: true});
            $scope.$digest();

            validateLargeMode(el, 1, 0);

            $scope.$destroy();

            el.remove();

        });

        function verifyNoAddOpenButtons(el) {
            addButtonEl = getLargeScreenAddButton(el);
            expect(addButtonEl.length).toBe(0);
            addButtonEl = getSmallScreenAddButton(el);
            expect(addButtonEl.length).toBe(0);

            openButtonEl = getLargeScreenOpenButton(el);
            expect(openButtonEl.length).toBe(0);
            openButtonEl = getSmallScreenOpenButton(el);
            expect(openButtonEl.length).toBe(0);
        }

        it('collapses in xs when there are no add or open buttons', function () {
            var collapsibleNoAddOpenTabsHtml = '<uib-tabset bb-tabset-collapsible>' +
            '<uib-tab bb-tab-collapse-header="t.title" ng-repeat="t in myTabs" class="bb-tab-close">' +
                '<uib-tab-heading>' +
                    '{{t.title}}' +
                    '<button type="button" class="bb-tab-close-icon" ng-click="closeTab($index, $event)"></button>' +
                '</uib-tab-heading>' +
                '{{t.content}}' +
            '</uib-tab>' +
            '</uib-tabset>',
                el;

            el = setupCollapsibleTest(collapsibleNoAddOpenTabsHtml);
            callback({xs: true});
            $scope.$digest();

            verifyNoAddOpenButtons(el);

            callback({xs: false});
            $scope.$digest();

            verifyNoAddOpenButtons(el);

            el.remove();

        });

        it('collapses in xs when tabs are specifically defined', function () {
            var el;
            el = setupCollapsibleTest(collapsibleSpecificNoAddOpenTabsHtml);
            callback({xs: true});
            $scope.$digest();

            verifyNoAddOpenButtons(el);

            callback({xs: false});
            $scope.$digest();

            verifyNoAddOpenButtons(el);

            el.remove();
        });

        it('works correctly when starting in extra small mode', function () {
            var el;

            el = setupCollapsibleTest(collapsibleTabsHtml, callBreakpointImmediate);

            validateSmallMode(el);

            el.remove();
        });

        it('works correctly when starting in extra small mode when tabs are specifically defined', function () {
            var el;

            el = setupCollapsibleTest(collapsibleSpecificTabsHtml, callBreakpointImmediate);

            validateSmallMode(el);

            el.remove();
        });

        it('works correctly when starting in extra small mode with 1 tab', function () {
            var el;
            $scope.myTabs.splice(2, 1);
            $scope.myTabs.splice(0, 1);
            $scope.$digest();

            el = setupCollapsibleTest(collapsibleTabsHtml, callBreakpointImmediate);

            validateLargeMode(el, 1, 0);

            el.remove();
        });

        it('has the correct dropdown title in extra small mode when title changes', function () {
            var el;
            el = setupCollapsibleTest(collapsibleTabsHtml);

            callback({xs: true});
            $scope.$digest();

            tabTitleEl = getTabDropdownButton(el);
            expect(tabTitleEl).toHaveText($scope.myTabs[0].title);
            $scope.myTabs[0].title = 'huuuuuih';
            $scope.$digest();
            expect(tabTitleEl).toHaveText($scope.myTabs[0].title);

            el.remove();
        });

        it('has the correct dropdown title in extra small mode when title changes using heading', function () {
            var el,
                headingTabsHtml = '<uib-tabset bb-tabset-add="addTab()" bb-tabset-open="openTab()" bb-tabset-collapsible>' +
            '<uib-tab heading="{{t.title}}" ng-repeat="t in myTabs" class="bb-tab-close">' +
                '{{t.content}}' +
            '</uib-tab>' +
            '</uib-tabset>';

            el = setupCollapsibleTest(headingTabsHtml);

            callback({xs: true});
            $scope.$digest();

            tabTitleEl = getTabDropdownButton(el);
            expect(tabTitleEl).toHaveText($scope.myTabs[0].title);
            $scope.myTabs[0].title = 'huuuuuih';
            $scope.$digest();
            expect(tabTitleEl).toHaveText($scope.myTabs[0].title);

            el.remove();
        });

        it('can add and remove tabs', function () {
            var el;

            el = setupCollapsibleTest(collapsibleTabsHtml);

            callback({xs: true});

            getSmallScreenAddButton(el).click();
            $scope.$digest();
            tabsEl = getSmallScreenTabs(el);
            expect(tabsEl.length).toBe(4);
            tabTitleEl = getTabDropdownButton(el);
            tabTitleEl.click();
            tabsEl.eq(3).click();
            $scope.$digest();
            expect(tabTitleEl).toHaveText($scope.myTabs[3].title);
            expect(getActiveTabContent(el)).toHaveText($scope.myTabs[3].content);

            tabsEl.eq(0).find('button.bb-tab-close-icon').click();
            $scope.$digest();
            tabsEl = getSmallScreenTabs(el);
            expect(tabsEl.length).toBe(3);
            expect(tabsEl.eq(0).find('uib-tab-heading')).toHaveText($scope.myTabs[0].title);

            callback({xs: false});
            $scope.$digest();

            tabsEl = getLargeScreenTabs(el);
            expect(tabsEl.length).toBe(3);
            expect(getActiveTabContent(el)).toHaveText($scope.myTabs[2].content);
            expect(tabsEl.eq(0).find('uib-tab-heading')).toHaveText($scope.myTabs[0].title);

            el.remove();

        });

        it('can remove tabs while collapsed', function () {
            var el;

            el = setupCollapsibleTest(collapsibleTabsHtml);

            callback({xs: true});

            $scope.$digest();

            validateSmallMode(el);

            $scope.myTabs.splice(2, 1);
            $scope.myTabs.splice(0, 1);

            $scope.$digest();
            validateLargeMode(el, 1, 0);
            el.remove();
        });

        describe('dropdown max width', function () {

            function calculateExpectedWidth(el) {
                return el.width() - 88 - 45 - 15;
            }

            function verifyMaxWidths(el, dropdownTextEl, dropdownMenuItemEl) {
                var expectedWidth = calculateExpectedWidth(el);

                expect(dropdownTextEl[0].style.maxWidth).toBe(expectedWidth.toString() + 'px');

                expect(dropdownMenuItemEl[0].style.maxWidth).toBe((el.width().toString()) + 'px');
                expect(dropdownMenuItemEl[1].style.maxWidth).toBe((el.width().toString()) + 'px');
            }

            it('adds max width when changing to collapsed mode', function () {
                var el,
                    dropdownTextEl,
                    dropdownMenuItemEl;

                el = setupCollapsibleTest(collapsibleTabsHtml);

                callback({xs: true});

                $scope.$digest();

                dropdownTextEl = el.find('.bb-tab-header-text');

                dropdownMenuItemEl = el.find('.bb-tabset-dropdown ul.dropdown-menu li a');

                verifyMaxWidths(el, dropdownTextEl, dropdownMenuItemEl);

                callback({xs: false});

                $scope.$digest();

                dropdownMenuItemEl = el.find('ul.nav-tabs li a');
                expect(dropdownMenuItemEl[0].style.maxWidth).toBe('');
                expect(dropdownMenuItemEl[1].style.maxWidth).toBe('');

                el.remove();
            });

            it('does not set max-width when nested tabs are hidden', function () {
                var el,
                    dropdownTextEl,
                    dropdownMenuItemEl,
                    dropdownMenuListItemEl,
                    tabTitleEl;

                el = setupCollapsibleTest(collapsibleTabsInnerTabHtml);

                $scope.$digest();

                allCallbacks[0]({xs: true});
                allCallbacks[1]({xs: true});

                $scope.$digest();
                $scope.$digest();

                //switch tabs
                tabsEl = getSmallScreenTabs(el);

                tabTitleEl = getTabDropdownButton(el);
                tabTitleEl.click();
                $scope.$digest();

                tabsEl.eq(1).click();
                $scope.$digest();

                //verify no max width
                dropdownTextEl = el.find('.bb-tab-header-text');
                dropdownMenuItemEl = el.find('.bb-tabset-dropdown ul.dropdown-menu li a');
                expect(dropdownTextEl[1].style.maxWidth).toBe('');
                expect(dropdownMenuItemEl[2].style.maxWidth).toBe('');
                expect(dropdownMenuItemEl[3].style.maxWidth).toBe('');

                //change to second inner tab
                tabsEl.eq(3).click();
                $scope.$digest();

                //verify button/dropdown
                dropdownTextEl = el.find('.bb-tab-header-text');
                dropdownMenuItemEl = el.find('.bb-tabset-dropdown ul.dropdown-menu li a');
                dropdownMenuListItemEl = el.find('.bb-tabset-dropdown ul.dropdown-menu li');
                expect(dropdownTextEl.eq(1)).toHaveText('Fourth tab');
                expect(dropdownMenuItemEl.eq(2)).toHaveText('Third tab');
                expect(dropdownMenuItemEl.eq(3)).toHaveText('Fourth tab');
                expect(dropdownMenuListItemEl.eq(3)).toHaveClass('active');

                //switch to large screen
                allCallbacks[0]({xs: false});
                allCallbacks[1]({xs: false});

                $scope.$digest();

                //verify inner tabs
                dropdownTextEl = el.find('.bb-tab-header-text');
                dropdownMenuItemEl = el.find('ul.nav-tabs li a');
                dropdownMenuListItemEl = el.find('ul.nav-tabs li');
                expect(dropdownTextEl.eq(1)).toHaveText('Fourth tab');
                expect(dropdownMenuItemEl.eq(2)).toHaveText('Third tab');
                expect(dropdownMenuItemEl.eq(3)).toHaveText('Fourth tab');
                expect(dropdownMenuListItemEl.eq(3)).toHaveClass('active');

                el.remove();
            });

            function getWidthSpy(widthFn, fakeWindowWidth) {
                return spyOn($.fn, 'width').and.callFake(function () {
                    if (this[0] === window) {
                        return angular.isFunction(fakeWindowWidth) ? fakeWindowWidth() : fakeWindowWidth;
                    }

                    return widthFn.apply(this, arguments);
                });
            }

            it('adds max width when window size changes', function () {
                var el,
                    spyWindowWidth,
                    widthFn,
                    widthSpy,
                    dropdownTextEl,
                    dropdownMenuItemEl;

                widthFn = $.fn.width;

                spyWindowWidth = 500;

                widthSpy = getWidthSpy(widthFn, function () {
                    return spyWindowWidth;
                });

                el = setupCollapsibleTest(collapsibleTabsHtml);

                callback({xs: true});

                $scope.$digest();

                dropdownTextEl = el.find('.bb-tab-header-text');

                dropdownMenuItemEl = el.find('.bb-tabset-dropdown ul.dropdown-menu li a');

                verifyMaxWidths(el, dropdownTextEl, dropdownMenuItemEl);
                el.width(600);

                spyWindowWidth = 200;

                $(window).resize();

                dropdownTextEl = el.find('.bb-tab-header-text');

                dropdownMenuItemEl = el.find('.bb-tabset-dropdown ul.dropdown-menu li a');

                verifyMaxWidths(el, dropdownTextEl, dropdownMenuItemEl);

                el.remove();
            });
        });
    });

    describe('vertical tabset', function () {
        var groupedTabsHtml,
            ungroupedTabsHtml,
            invalidTabsHtml,
            templateOverrideHtml,
            el,
            isolateScope;

        beforeEach(function () {
            groupedTabsHtml = '' +
                '<uib-tabset active="active" bb-vertical-tabset bb-vertical-tabset-close-others="closeOthers">' +
                '  <div bb-vertical-tabset-group bb-vertical-tabset-group-heading="Group 1" bb-vertical-tabset-group-is-open="isOpen">' +
                '    <uib-tab heading="Group 1 - Tab 1">' +
                '      <p>Group 1, tab 1 content</p>' +
                '    </uib-tab>' +
                '    <uib-tab heading="Group 1 - Tab 2">' +
                '      <p>Group 1, tab 2 content</p>' +
                '    </uib-tab>' +
                '  </div>' +
                '  <div bb-vertical-tabset-group bb-vertical-tabset-group-is-disabled="true" bb-vertical-tabset-group-heading="Group 2">' +
                '    <uib-tab heading="Group 2 - Tab 1">' +
                '      <p>Group 2, tab 1 contents</p>' +
                '    </uib-tab>' +
                '  </div>' +
                '</uib-tabset>';

            ungroupedTabsHtml = '' +
                '<uib-tabset bb-vertical-tabset active="active">' +
                '  <uib-tab heading="Tab 1">' +
                '    <p>Tab 1 content</p>' +
                '  </uib-tab>' +
                '  <uib-tab heading="Tab 2">' +
                '    <p>Tab 2 content</p>' +
                '  </uib-tab>' +
                '</uib-tabset>';

            invalidTabsHtml = '' +
                '<uib-tabset bb-vertical-tabset bb-tabset-add bb-tabset-open bb-tabset-collapsible justified="true" type="pills" vertical="false">' +
                '</uib-tabset>';

            templateOverrideHtml = '' +
                '<uib-tabset active="active" bb-vertical-tabset bb-vertical-tabset-close-others="closeOthers">' +
                '  <div bb-vertical-tabset-group bb-vertical-tabset-group-heading="Group 1" bb-vertical-tabset-group-is-open="isOpen" bb-vertical-tabset-group-template-url="sky/templates/tabset/verticaltabsetgroupoverride.html">' +
                '    <uib-tab heading="Group 1 - Tab 1">' +
                '      <p>Group 1, tab 1 content</p>' +
                '    </uib-tab>' +
                '    <uib-tab heading="Group 1 - Tab 2">' +
                '      <p>Group 1, tab 2 content</p>' +
                '    </uib-tab>' +
                '  </div>' +
                '  <div bb-vertical-tabset-group bb-vertical-tabset-group-is-disabled="true" bb-vertical-tabset-group-heading="Group 2">' +
                '    <uib-tab heading="Group 2 - Tab 1">' +
                '      <p>Group 2, tab 1 contents</p>' +
                '    </uib-tab>' +
                '  </div>' +
                '</uib-tabset>';
        });

        function buildVerticalTabsetElement(html) {
            el = $compile(html)($scope);
            $scope.$digest();
            $timeout.flush();
            isolateScope = el.isolateScope();
        }

        it('warns of use of incompatible features', function () {
            spyOn($log, 'warn').and.stub();
            buildVerticalTabsetElement(invalidTabsHtml);
            expect($log.warn.calls.count()).toEqual(6);
        });

        it('allows overriding tabset group template URL', function () {
            $templateCache.put('sky/templates/tabset/verticaltabsetgroupoverride.html',
                '<li uib-accordion-group' +
                '    class="bb-vertical-tabset-group override"' +
                '    is-open="bbVerticalTabsetGroup.isOpen"' +
                '    is-disabled="bbVerticalTabsetGroup.isDisabled">' +
                '    <uib-accordion-heading>' +
                '        <div class="bb-vertical-tabset-group-heading">' +
                '            <span ng-class="{\'bb-vertical-tabset-group-active\':bbVerticalTabsetGroup.active}">' +
                '                {{bbVerticalTabsetGroup.heading}}' +
                '            </span>' +
                '            <span class="bb-vertical-tabset-group-chevron"' +
                '                ng-class="{\'bb-vertical-tabset-group-chevron-open\':bbVerticalTabsetGroup.isOpen}"></span>' +
                '        </div>' +
                '    </uib-accordion-heading>' +
                '    <ul class="nav nav-tabs nav-stacked"' +
                '        ng-transclude>' +
                '    </ul>' +
                '</li>');
            buildVerticalTabsetElement(templateOverrideHtml);
            expect(el.html()).toContain('override');
        });

        it('closes other tab groups', function () {
            $scope.closeOthers = true;
            buildVerticalTabsetElement(groupedTabsHtml);
            expect(isolateScope.closeOthers).toBe(true);
        });

        it('does not close other tab groups', function () {
            $scope.closeOthers = false;
            buildVerticalTabsetElement(groupedTabsHtml);
            expect(isolateScope.closeOthers).toBe(false);
        });

        it('activates active tab and group', function () {
            $scope.active = 1;
            buildVerticalTabsetElement(groupedTabsHtml);
            expect(isolateScope.tabset.tabs[1].tab.active).toBe(true);
            expect(el.find('[bb-vertical-tabset-group]').eq(0).isolateScope().bbVerticalTabsetGroup.active).toBe(true);
        });

        it('tracks when a tabset group is open', function () {
            buildVerticalTabsetElement(groupedTabsHtml);
            expect(el.find('[bb-vertical-tabset-group]').eq(0).isolateScope().bbVerticalTabsetGroup.isOpen).toBe(true);
        });

        it('tracks when a tabset group is disabled', function () {
            buildVerticalTabsetElement(groupedTabsHtml);
            expect(el.find('[bb-vertical-tabset-group]').eq(1).isolateScope().bbVerticalTabsetGroup.isDisabled).toBe(true);
        });

        it('inserts headings for tabset groups', function () {
            buildVerticalTabsetElement(groupedTabsHtml);
            expect(el.find('[bb-vertical-tabset-group]').eq(0).isolateScope().bbVerticalTabsetGroup.heading).toBe('Group 1');
            expect(el.find('[bb-vertical-tabset-group]').eq(1).isolateScope().bbVerticalTabsetGroup.heading).toBe('Group 2');
        });

        it('activates active tab when tabs are not grouped', function () {
            $scope.active = 1;
            buildVerticalTabsetElement(ungroupedTabsHtml);
            expect(isolateScope.tabset.tabs[1].tab.active).toBe(true);
        });

        it('uses vertical tabset template when bb-vertical-tabset is present', function () {
            buildVerticalTabsetElement(groupedTabsHtml);
            expect(el.html()).toContain('uib-accordion');
        });

        it('uses vertical tabset tab template when bb-vertical-tabset is present', function () {
            buildVerticalTabsetElement(groupedTabsHtml);
            expect(el.html()).toContain('bb-field-label');
        });
    });
});
