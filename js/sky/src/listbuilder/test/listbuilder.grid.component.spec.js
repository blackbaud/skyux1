/* jshint jasmine: true */
/* global module, angular, inject, $ */
(function () {
    'use strict';

    describe('listbuilder grid view', function () {
        var $scope,
            $compile,
            $timeout,
            bbViewKeeperBuilder,
            basicListbuilderGridHtml,
            searchToolbarHtml,
            sortToolbarHtml,
            gridContentHtml,
            gridScrollbarContentHtml,
            scrollbarListbuilderHtml,
            sortListbuilderGridHtml,
            dataSet1,
            bbWindow,
            $document,
            el,
            fxOff;


        beforeEach(module(
            'sky.listbuilder',
            'sky.grids',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _$timeout_, _$document_, _bbViewKeeperBuilder_, _bbWindow_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            $timeout = _$timeout_;
            $document = _$document_;
            bbViewKeeperBuilder = _bbViewKeeperBuilder_;
            bbWindow = _bbWindow_;

            $scope.listCtrl = {
                gridOptions: {
                    columns: [
                        {
                            caption: 'Name',
                            jsonmap: 'name',
                            id: 1,
                            name: 'name',
                            title: false
                        },
                        {
                            caption: 'Instrument',
                            jsonmap: 'instrument',
                            id: 2,
                            name: 'instrument'
                        },
                        {
                            caption: 'Biography',
                            jsonmap: 'bio',
                            id: 3,
                            name: 'bio'
                        }
                    ],
                    data: [],
                    selectedColumnIds: [1, 2, 3]
                }
            };
            
            dataSet1 = [
                {
                    id: 0,
                    name: 'John',
                    instrument: 'Rhythm guitar'
                },
                {
                    id: 1,
                    name: 'Paul',
                    instrument: 'Bass',
                    bio: 'Lorem'
                },
                {
                    id: 2,
                    name: 'George',
                    instrument: 'Lead guitar'
                },
                {
                    id: 3,
                    name: 'Ringo',
                    instrument: 'Drums'
                }
            ];

            searchToolbarHtml = '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText)" ' +
                    'bb-listbuilder-search-text="listCtrl.searchText">' +
                    '</bb-listbuilder-toolbar>';

            sortToolbarHtml = '<bb-listbuilder-toolbar ' +
                    'bb-listbuilder-on-search="listCtrl.onSearch(searchText)" ' +
                    'bb-listbuilder-search-text="listCtrl.searchText">' +
                    '<bb-listbuilder-sort>' +
                    '<bb-sort>' +
                    '<bb-sort-item ' +
                    'bb-sort-item-select="listCtrl.sortItems(item)">' +
                    'Sort item' +
                    '</bb-sort-item>' +
                    '</bb-sort>' +
                    '</bb-listbuilder-sort>' +
                    '</bb-listbuilder-toolbar>';

            gridContentHtml = '<bb-listbuilder-content>' +
                    '<bb-listbuilder-grid>' +
                    '<bb-grid bb-grid-options="listCtrl.gridOptions">' +
                    '</bb-grid>' +
                    '</bb-listbuilder-grid>' +
                    '</bb-listbuilder-content>';

            gridScrollbarContentHtml = '<bb-listbuilder-content>' +
                    '<bb-listbuilder-grid>' +
                    '<div style="width: 300px"> ' +
                    '<bb-grid bb-grid-options="listCtrl.gridOptions">' +
                    '</bb-grid>' +
                    '</div>' +
                    '</bb-listbuilder-grid>' +
                    '</bb-listbuilder-content>';

            basicListbuilderGridHtml = '<bb-listbuilder>' +
                    searchToolbarHtml +
                    gridContentHtml +
                    '</bb-listbuilder>';

            sortListbuilderGridHtml = '<bb-listbuilder>' +
                    sortToolbarHtml +
                    gridContentHtml +
                    '</bb-listbuilder>';

            scrollbarListbuilderHtml = '<bb-listbuilder>' +
                    searchToolbarHtml +
                    gridScrollbarContentHtml +
                    '</bb-listbuilder>';

            el = {};
            fxOff =  $.fx.off;
            //turn off jquery animate.
            $.fx.off = true;
        }));

        afterEach(function () {
            if (angular.isDefined(el)) {
                if (angular.isFunction(el.remove)) {
                    el.remove();
                }
            }
            $.fx.off = fxOff;
        });

        function initializeListbuilder(listbuilderHtml) {
            var el = angular.element(listbuilderHtml);
            el.appendTo($document.find('body'));

            $compile(el)($scope);

            $scope.$digest();
            return el;
        }

        function getHeaders(el) {
            return el.find('.bb-grid-container .table-responsive .ui-jqgrid-hbox > table > thead > tr > th');
        }

        function setGridData(data) {
            $scope.listCtrl.gridOptions.data = data;
            $scope.$digest();
        }

        function getTopScrollbarEl(el) {
            return el.find('.bb-listbuilder-toolbar-summary-container .bb-listbuilder-toolbar-top-scrollbar');
        }
        
        function getTableWrapperEl(el) {
            return el.find('.table-responsive');
        }

        it('uses the listbuilder toolbar as the verticaloffsetElId element for the grid header view keepers', function () {
            var viewKeeperCalls,
                tableWrapper,
                i,
                spyArgs;

            spyOn(bbViewKeeperBuilder, 'create').and.callThrough();

            el = initializeListbuilder(basicListbuilderGridHtml);

            viewKeeperCalls = bbViewKeeperBuilder.create.calls.all();
            for (i = 0; i < viewKeeperCalls.length; i++) {
                if ($(viewKeeperCalls[i].args[0].el).hasClass('ui-jqgrid-hdiv')) {
                    spyArgs = viewKeeperCalls[i].args[0];
                }
            }

            tableWrapper = el.find('.table-responsive');
            
            expect(spyArgs.boundaryEl).toEqual(tableWrapper[0]);
            expect(spyArgs.setWidth).toBe(true);
            expect(spyArgs.verticalOffSetElId).toBe(el.find('.bb-listbuilder-toolbar-summary-container').attr('id'));
            
        });

        it('allows header based sort to occur in grids if the sort component does not exist', function () {
            var headerEl;

            el = initializeListbuilder(basicListbuilderGridHtml);

            headerEl = getHeaders(el);

            setGridData(dataSet1);

            expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');
            expect(angular.isUndefined($scope.listCtrl.gridOptions.sortOptions)).toBe(true);

            headerEl.eq(0).click();

            expect(headerEl.eq(0)).toHaveClass('sorting-asc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');

            expect($scope.listCtrl.gridOptions.sortOptions.column).toBe('name');
            expect($scope.listCtrl.gridOptions.sortOptions.descending).toBe(false);

            headerEl.eq(0).click();

            expect(headerEl.eq(0)).toHaveClass('sorting-desc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
            expect($scope.listCtrl.gridOptions.sortOptions.column).toBe('name');
            expect($scope.listCtrl.gridOptions.sortOptions.descending).toBe(true);
        });

        it('does not allow header based sort to occur in grids if the sort component does exist', function () {
            var headerEl;

            el = initializeListbuilder(sortListbuilderGridHtml);

            headerEl = getHeaders(el);

            setGridData(dataSet1);

            expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');
            expect(angular.isUndefined($scope.listCtrl.gridOptions.sortOptions)).toBe(true);

            headerEl.eq(0).click();

            expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');
            expect($scope.listCtrl.gridOptions.sortOptions).toEqual({});

        });

        it('has a top scrollbar when columns are larger than available area', function () {
            var headerEl,
                expectedScrollbarWidth,
                topScrollbarEl;

            $scope.listCtrl.gridOptions.columns[0].width_all = 300;
            $scope.listCtrl.gridOptions.columns[1].width_all = 300;
            $scope.listCtrl.gridOptions.columns[2].width_all = 300;

            el = initializeListbuilder(scrollbarListbuilderHtml);

            setGridData(dataSet1);

            headerEl = getHeaders(el);

            expect(headerEl[0].style.width).toBe('300px');

            //expect top scrollbar to have height
            topScrollbarEl = el.find('.bb-listbuilder-toolbar-summary-container .bb-listbuilder-toolbar-top-scrollbar');

            expectedScrollbarWidth = bbWindow.getScrollbarWidth();

            expect(topScrollbarEl[0].style.height).toBe(expectedScrollbarWidth + 'px');
        });

        it('syncs scrolling', function () {
            var tableWrapperEl,
                headerViewKeeperEl,
                topScrollbarEl;

            $scope.listCtrl.gridOptions.columns[0].width_all = 300;
            $scope.listCtrl.gridOptions.columns[1].width_all = 300;
            $scope.listCtrl.gridOptions.columns[2].width_all = 300;

            spyOn(bbViewKeeperBuilder, 'create').and.returnValue(
                {
                    destroy: function () {

                    },
                    scrollToTop: function () {

                    },
                    syncElPosition: function () {

                    },
                    isFixed: false
                }
            );

            el = initializeListbuilder(scrollbarListbuilderHtml);

            setGridData(dataSet1);

            topScrollbarEl = getTopScrollbarEl(el);

            tableWrapperEl = getTableWrapperEl(el);

            topScrollbarEl.scrollLeft(20);

            topScrollbarEl.scroll();

            if (topScrollbarEl.height() > 0) {
                expect(tableWrapperEl.scrollLeft()).toBe(20);
            } else {
                expect(tableWrapperEl.scrollLeft()).toBe(0);
            }

            tableWrapperEl.scrollLeft(10);

            tableWrapperEl.scroll();

            if (topScrollbarEl.height() > 0) {
                expect(topScrollbarEl.scrollLeft()).toBe(10);
            } else {
                expect(topScrollbarEl.scrollLeft()).toBe(0);
            }

            topScrollbarEl.scroll();

            headerViewKeeperEl = el.find('.table-responsive .ui-jqgrid-hdiv');
            headerViewKeeperEl.addClass('bb-viewkeeper-fixed');
            topScrollbarEl.scrollLeft(5);

            topScrollbarEl.scroll();

            if (topScrollbarEl.height() > 0) {
                expect(headerViewKeeperEl.scrollLeft()).toBe(5);
            } else {
                expect(headerViewKeeperEl.scrollLeft()).toBe(0);
            }

            tableWrapperEl.scrollLeft(3);
            tableWrapperEl.scroll();


            expect(headerViewKeeperEl.scrollLeft()).toBe(3);

            topScrollbarEl.scrollLeft(0);
            topScrollbarEl.scroll();

            expect(headerViewKeeperEl.scrollLeft()).toBe(0);

            headerViewKeeperEl.removeClass('bb-viewkeeper-fixed');

            tableWrapperEl.scrollLeft(5);
            tableWrapperEl.scroll();

            expect(headerViewKeeperEl.scrollLeft()).toBe(0);

        });

        it('highlights search text properly on data load', function () {

        });

        it('creates the proper view switcher when multiple views are present', function () {

        });

        it('listens for selecting and unselecting items in grid', function () {

        });

        it('applies select all and clear all properly when selectedids are hooked up', function () {

        });

        it('hides the select all and clear all checkbox in the grid headers', function () {

        });

        it('allows use of the column picker component', function () {

        });

        it('destroys column picker component when not in grid view', function () {

        });

    });
})();