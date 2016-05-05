/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

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
        'sky.templates',
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
                '<span class="bb-test-content">{{t.content}}</span>' +
                '<ul class="bb-test-ul"><li class="bb-test-li">1</li></ul>' +
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
            return el.find('.tab-pane.active span.bb-test-content');
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
            var collapsibleNoAddOpenTabsHtml = '<tabset bb-tabset-collapsible>' +
            '<tab bb-tab-collapse-header="\'Tab 1\'" class="bb-tab-close">' +
                '<tab-heading>' +
                    'Tab 1' +
                    '<button type="button" class="bb-tab-close-icon" ng-click="closeTab($index, $event)"></button>' +
                '</tab-heading>' +
                '1 content' +
            '</tab>' +
            '<tab bb-tab-collapse-header="\'Tab 2\'" class="bb-tab-close">' +
                '<tab-heading>' +
                    'Tab 2' +
                    '<button type="button" class="bb-tab-close-icon" ng-click="closeTab($index, $event)"></button>' +
                '</tab-heading>' +
                '2 content' +
            '</tab>' +
            '<tab bb-tab-collapse-header="\'Tab 3\'" class="bb-tab-close">' +
                '<tab-heading>' +
                    'Tab 3' +
                    '<button type="button" class="bb-tab-close-icon" ng-click="closeTab($index, $event)"></button>' +
                '</tab-heading>' +
                '3 content' +
            '</tab>' +
            '</tabset>',
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
});
