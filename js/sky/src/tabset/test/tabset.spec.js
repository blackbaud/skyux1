/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

describe('Tabset module', function () {
    'use strict';

    var $compile,
        $document,
        dynamicTabsHtml,
        $scope,
        bbMediaBreakpoints;

    beforeEach(module(
        'ngMock',
        'sky.tabset',
        'template/tabs/tabset.html',
        'template/tabs/tab.html'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$document_, _bbMediaBreakpoints_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $document = _$document_;
        bbMediaBreakpoints = _bbMediaBreakpoints_;

        dynamicTabsHtml = '<tabset bb-tabset-add="addTab()" bb-tabset-open="openTab()">' +
                '<tab>' +
                    '<tab-heading>' +
                        'Tab 1' +
                    '</tab-heading>' +
                    'Yo' +
                '</tab>' +
                '<tab>' +
                    '<tab-heading>' +
                        'Tab 2' +
                    '</tab-heading>' +
                    'Hey' +
                '</tab>' +
            '</tabset>';
    }));

    function getLargeScreenAddButton(el) {
        return el.find('li.bb-tab-button button.bb-tab-button-wrap.bb-tab-button-add');
    }

    function getLargeScreenOpenButton(el) {
        return el.find('li.bb-tab-button button.bb-tab-button-wrap.bb-tab-button-open');
    }

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
            var noButtonsHtml = '<tabset>' +
                    '<tab>' +
                        '<tab-heading>' +
                            'Tab 1' +
                        '</tab-heading>' +
                        'Yo' +
                    '</tab>' +
                    '<tab>' +
                        '<tab-heading>' +
                            'Tab 2' +
                        '</tab-heading>' +
                        'Hey' +
                    '</tab>' +
                '</tabset>',
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
            var addOnlyHtml = '<tabset bb-tabset-add="addTab()">' +
                    '<tab>' +
                        '<tab-heading>' +
                            'Tab 1' +
                        '</tab-heading>' +
                        'Yo' +
                    '</tab>' +
                    '<tab>' +
                        '<tab-heading>' +
                            'Tab 2' +
                        '</tab-heading>' +
                        'Hey' +
                    '</tab>' +
                '</tabset>',
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
            var openOnlyHtml = '<tabset bb-tabset-open="openTab()">' +
                    '<tab>' +
                        '<tab-heading>' +
                            'Tab 1' +
                        '</tab-heading>' +
                        'Yo' +
                    '</tab>' +
                    '<tab>' +
                        '<tab-heading>' +
                            'Tab 2' +
                        '</tab-heading>' +
                        'Hey' +
                    '</tab>' +
                '</tabset>',
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
            collapsibleTabsHtml,
            dropdownWrapperEl,
            tabTitleEl,
            tabCount,
            tabsEl;

        beforeEach(function () {
            collapsibleTabsHtml = '<tabset bb-tabset-add="addTab()" bb-tabset-open="openTab()" bb-tabset-collapsible>' +
            '<tab bb-tab-collapse-header="t.title" ng-repeat="t in myTabs" class="bb-tab-close">' +
                '<tab-heading>' +
                    '{{t.title}}' +
                    '<button type="button" class="bb-tab-close-icon" ng-click="closeTab($index, $event)"></button>' +
                '</tab-heading>' +
                '{{t.content}}' +
            '</tab>' +
            '</tabset>';

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
            return el.find('.tab-pane.active span');
        }

        function callBreakpointImmediate(tabCallback) {
            tabCallback({xs: true});
        }

        function setupCollapsibleTest(htmlTemplate, spyFunction) {
            var el;

            if (angular.isDefined(spyFunction)) {
                spyOn(bbMediaBreakpoints, 'register').and.callFake(spyFunction);
            } else {
                spyOn(bbMediaBreakpoints, 'register').and.callFake(function (tabCallback) {
                    callback = tabCallback;
                });
            }

            el = angular.element(htmlTemplate);
            $document.find('body').eq(0).append(el);
            $compile(el)($scope);

            $scope.$digest();
            return el;
        }

        function getTabDropdownButton(el) {
            return el.find('.bb-tab-dropdown-button');
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

        it('collapses in xs when there are no add or open buttons', function () {
            var collapsibleNoAddOpenTabsHtml = '<tabset bb-tabset-collapsible>' +
            '<tab bb-tab-collapse-header="t.title" ng-repeat="t in myTabs" class="bb-tab-close">' +
                '<tab-heading>' +
                    '{{t.title}}' +
                    '<button type="button" class="bb-tab-close-icon" ng-click="closeTab($index, $event)"></button>' +
                '</tab-heading>' +
                '{{t.content}}' +
            '</tab>' +
            '</tabset>',
                el;

            function verifyNoAddOpenButtons() {
                addButtonEl = getLargeScreenAddButton(el);
                expect(addButtonEl.length).toBe(0);
                addButtonEl = getSmallScreenAddButton(el);
                expect(addButtonEl.length).toBe(0);

                openButtonEl = getLargeScreenOpenButton(el);
                expect(openButtonEl.length).toBe(0);
                openButtonEl = getSmallScreenOpenButton(el);
                expect(openButtonEl.length).toBe(0);
            }

            el = setupCollapsibleTest(collapsibleNoAddOpenTabsHtml);
            callback({xs: true});
            $scope.$digest();

            verifyNoAddOpenButtons();

            callback({xs: false});
            $scope.$digest();

            verifyNoAddOpenButtons();

            el.remove();

        });

        it('works correctly when starting in extra small mode', function () {
            var el;

            el = setupCollapsibleTest(collapsibleTabsHtml, callBreakpointImmediate);

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
                headingTabsHtml = '<tabset bb-tabset-add="addTab()" bb-tabset-open="openTab()" bb-tabset-collapsible>' +
            '<tab heading="{{t.title}}" ng-repeat="t in myTabs" class="bb-tab-close">' +
                '{{t.content}}' +
            '</tab>' +
            '</tabset>';

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
            expect(tabsEl.eq(0).find('tab-heading')).toHaveText($scope.myTabs[0].title);

            callback({xs: false});
            $scope.$digest();

            tabsEl = getLargeScreenTabs(el);
            expect(tabsEl.length).toBe(3);
            expect(getActiveTabContent(el)).toHaveText($scope.myTabs[2].content);
            expect(tabsEl.eq(0).find('tab-heading')).toHaveText($scope.myTabs[0].title);

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
    });
});
