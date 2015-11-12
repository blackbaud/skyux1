/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Grid directive', function () {
    'use strict';

    var basicGridHtml,
        bbMediaBreakpoints,
        bbViewKeeperBuilder,
        bbWindow,
        $compile,
        contextMenuItemClicked,
        dataSet1,
        $document,
        el,
        locals,
        $scope,
        skip,
        $templateCache,
        $timeout,
        top,
        fxOff,
        $window;

    function getTopAndSkipFromLoadMore(event, data) {
        skip = data.skip;
        top = data.top;
    }

    function searchTextChanged() {
        if (angular.isDefined($scope.locals.gridOptions.searchText) && $scope.locals.gridOptions !== '') {
            $scope.locals.gridOptions.data = [dataSet1[0]];
        } else {
            $scope.locals.gridOptions.data = dataSet1;
        }
    }

    function getContextMenuItems(rowid, rowObject) {
        if (rowid === 'blarrrg' || rowObject.name === 'Ringo') {
            return [
                {
                    id: 'menu',
                    title: 'Option1',
                    cmd: function () {
                        contextMenuItemClicked = true;
                        return false;
                    }
                }
            ];
        }
    }

    function setUpGrid(gridHtml, setLocals) {
        var el = angular.element(gridHtml);
        el.appendTo(document.body);

        if (angular.isDefined(setLocals)) {
            $scope.locals = setLocals;
        } else {
            $scope.locals = locals;
        }

        $compile(el)($scope);

        $scope.$digest();

        return el;
    }

    function setGridData(data) {
        $scope.locals.gridOptions.data = data;
        $scope.$digest();
    }

    function getGridRows(el) {
        return el.find('.ui-jqgrid-bdiv tr.ui-row-ltr');
    }

    function getSearchBox(el) {
        return el.find('.bb-grid-toolbar-container .bb-search-container input');
    }

    function getSearchIcon(el) {
        return el.find('.bb-grid-toolbar-container .bb-search-container .bb-search-icon');
    }

    function getHeaders(el) {
        return el.find('.bb-grid-container .table-responsive .ui-jqgrid-hbox > table > thead > tr > th');
    }


    function getTableWrapperEl(el) {
        return el.find('.table-responsive');
    }

    function clickRowMultiselect(rowEl, index) {
        rowEl.eq(index).find('td input.cbox').click();
    }

    function shiftClickRowMultiselect(rowEl, index) {
        var checkBoxEl = rowEl.eq(index).find('td'),
            e = $.Event("click");
        e.shiftKey = true;

        $(checkBoxEl[0]).trigger(e);
    }

    function clickSelectAll(headerEl) {
        headerEl.eq(0).find('.bb-check-wrapper input').click();
    }

    beforeEach(module('ngMock'));
    beforeEach(module(
        'sky.grids',
        'sky.templates'
    ));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _$timeout_, _bbMediaBreakpoints_, _bbViewKeeperBuilder_, _$templateCache_, _$window_, _bbWindow_) {
        $scope = _$rootScope_;
        $compile = _$compile_;
        $document = _$document_;
        $timeout = _$timeout_;
        bbMediaBreakpoints = _bbMediaBreakpoints_;
        bbViewKeeperBuilder = _bbViewKeeperBuilder_;
        $window = _$window_;
        $templateCache = _$templateCache_;
        bbWindow = _bbWindow_;

        locals = {
            gridOptions: {
                columns: [
                    {
                        caption: 'Name',
                        jsonmap: 'name',
                        id: 1,
                        name: 'name'
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
                selectedColumnIds: [1, 2, 3],
                multiselect: false
            }
        };

        contextMenuItemClicked = false;

        dataSet1 = [
            {
                id: 'blarrrg',
                name: 'John',
                instrument: 'Rhythm guitar'
            },
            {
                name: 'Paul',
                instrument: 'Bass',
                bio: 'Lorem'
            },
            {
                name: 'George',
                instrument: 'Lead guitar'
            },
            {
                name: 'Ringo',
                instrument: 'Drums'
            }
        ];

        basicGridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

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

    it('loads a basic grid with data', function () {
        var containerEl,
            headerEl,
            toolBarEl,
            rowEl,
            cellEl;

        el = setUpGrid(basicGridHtml);

        containerEl = el.find('.bb-grid-container');

        expect(containerEl.length).toBe(1);

        //toobar elements are created
        toolBarEl = containerEl.eq(0).find('.bb-table-toolbar');
        expect(toolBarEl.length).toBe(1);

        expect(toolBarEl.eq(0).find('.bb-search-container').length).toBe(1);
        expect(toolBarEl.eq(0).find('.bb-column-picker-btn').length).toBe(1);
        expect(toolBarEl.eq(0).find('.bb-filter-btn').length).toBe(1);

        //column headers are created
        headerEl = getHeaders(el);
        expect(headerEl.length).toBe(3);

        expect(headerEl.eq(0)).toHaveText('Name');
        expect(headerEl.eq(1)).toHaveText('Instrument');
        expect(headerEl.eq(2)).toHaveText('Biography');

        setGridData(dataSet1);

        //rows are created
        rowEl = getGridRows(el);

        expect(rowEl.length).toBe(4);

        cellEl = rowEl.eq(0).find('td');

        expect(cellEl.length).toBe(3);

        expect(cellEl.eq(0)).toHaveText('John');
        expect(cellEl.eq(1)).toHaveText('Rhythm guitar');
        expect(cellEl.eq(2)).toHaveText('');

        cellEl = rowEl.eq(1).find('td');

        expect(cellEl.length).toBe(3);

        expect(cellEl.eq(0)).toHaveText('Paul');
        expect(cellEl.eq(1)).toHaveText('Bass');
        expect(cellEl.eq(2)).toHaveText('Lorem');

        cellEl = rowEl.eq(2).find('td');

        expect(cellEl.length).toBe(3);

        expect(cellEl.eq(0)).toHaveText('George');
        expect(cellEl.eq(1)).toHaveText('Lead guitar');
        expect(cellEl.eq(2)).toHaveText('');

        cellEl = rowEl.eq(3).find('td');

        expect(cellEl.length).toBe(3);

        expect(cellEl.eq(0)).toHaveText('Ringo');
        expect(cellEl.eq(1)).toHaveText('Drums');
        expect(cellEl.eq(2)).toHaveText('');

    });


    describe('fixed headers', function () {
        it('has the option to fix header and toolbar', function () {
            locals.gridOptions.fixedToolbar = true;

            spyOn(bbViewKeeperBuilder, 'create').and.callThrough();

            el = setUpGrid(basicGridHtml, locals);

            expect(bbViewKeeperBuilder.create.calls.count()).toBe(1);

        });

        it('will not blow up if options are not specified', function () {
            locals = {};

            spyOn(bbViewKeeperBuilder, 'create').and.callThrough();

            el = setUpGrid(basicGridHtml, locals);

            expect(bbViewKeeperBuilder.create.calls.count()).toBe(2);
        });
    });


    describe('pagination', function () {
        it('loads a grid with pagination with the default options', function () {
            var gridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions" bb-grid-pagination="locals.paginationOptions"></bb-grid></div>',
                pagedData1 = [
                    {
                        name: 'John',
                        instrument: 'Rhythm guitar'
                    },
                    {
                        name: 'Paul',
                        instrument: 'Bass',
                        bio: 'Lorem'
                    },
                    {
                        name: 'George',
                        instrument: 'Lead guitar'
                    },
                    {
                        name: 'Ringo',
                        instrument: 'Drums'
                    }
                ],
                paginationContainerEl,
                paginationEl;

            el = setUpGrid(gridHtml);

            $scope.$on('loadMoreRows', getTopAndSkipFromLoadMore);

            $scope.locals.paginationOptions = {
                recordCount: 30
            };

            setGridData(pagedData1);

            paginationContainerEl = el.find('.bb-grid-pagination-container');

            expect(paginationContainerEl.length).toBe(1);

            paginationEl = paginationContainerEl.eq(0).find('li');

            //default max of 5 pages shown with two arrow elements
            expect(paginationEl.length).toBe(7);

            //expect the correct numbers to be shown in pagination
            expect(paginationEl.eq(1)).toHaveText(1);
            expect(paginationEl.eq(1)).toHaveClass('active');
            expect(paginationEl.eq(2)).toHaveText(2);
            expect(paginationEl.eq(3)).toHaveText(3);
            expect(paginationEl.eq(4)).toHaveText(4);
            expect(paginationEl.eq(5)).toHaveText(5);

            //expect movement to behave correctly
            paginationEl.eq(5).find('a').click();

            expect(top).toBe(5);
            expect(skip).toBe(20);

            expect(paginationEl.eq(5)).toHaveText(6);

            paginationEl.eq(5).find('a').click();

            expect(top).toBe(5);
            expect(skip).toBe(25);
            expect(paginationEl.eq(6)).toHaveClass('disabled');

        });

        it('loads a grid with pagination with custom max pages and items per page', function () {
            var gridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions" bb-grid-pagination="locals.paginationOptions"></bb-grid></div>',
                pagedData1 = [
                    {
                        name: 'John',
                        instrument: 'Rhythm guitar'
                    }
                ],
                paginationContainerEl,
                paginationEl;

            el = setUpGrid(gridHtml);

            $scope.locals.paginationOptions = {
                recordCount: 2,
                itemsPerPage: 1,
                maxPages: 1
            };

            $scope.$on('loadMoreRows', getTopAndSkipFromLoadMore);

            setGridData(pagedData1);

            paginationContainerEl = el.find('.bb-grid-pagination-container');

            expect(paginationContainerEl.length).toBe(1);

            paginationEl = paginationContainerEl.eq(0).find('li');

            //default max of 5 pages shown with two arrow elements
            expect(paginationEl.length).toBe(3);

            //expect the correct numbers to be shown in pagination
            expect(paginationEl.eq(1)).toHaveText(1);
            expect(paginationEl.eq(1)).toHaveClass('active');

            //expect movement to behave correctly
            paginationEl.eq(2).find('a').click();

            expect(top).toBe(1);
            expect(skip).toBe(1);

            expect(paginationEl.eq(1)).toHaveText(2);

            expect(paginationEl.eq(2)).toHaveClass('disabled');

        });

    });


    describe('sorting', function () {
        it('respects excludedColumn property when sorting', function () {
            var headerEl;

            locals.gridOptions.sortOptions = {
                excludedColumns: ['name']
            };

            el = setUpGrid(basicGridHtml);

            headerEl = getHeaders(el);

            setGridData(dataSet1);

            expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');

            headerEl.eq(0).click();

            expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');

            headerEl.eq(1).click();

            expect(headerEl.eq(1)).toHaveClass('sorting-asc');

        });

        it('does apply sort class on non excluded columns', function () {
            var headerEl;

            el = setUpGrid(basicGridHtml);

            headerEl = getHeaders(el);

            setGridData(dataSet1);

            expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');

            headerEl.eq(0).click();

            expect(headerEl.eq(0)).toHaveClass('sorting-asc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');

            headerEl.eq(0).click();

            expect(headerEl.eq(0)).toHaveClass('sorting-desc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');

        });

        it('updates sort options column and descending value on column header click', function () {
            var headerEl;

            el = setUpGrid(basicGridHtml);

            headerEl = getHeaders(el);

            setGridData(dataSet1);

            headerEl.eq(0).click();

            $scope.$digest();

            expect($scope.locals.gridOptions.sortOptions.column).toBe('name');
            expect($scope.locals.gridOptions.sortOptions.descending).toBe(false);

            headerEl.eq(0).click();

            expect($scope.locals.gridOptions.sortOptions.column).toBe('name');
            expect($scope.locals.gridOptions.sortOptions.descending).toBe(true);

        });
    });

    describe('searching', function () {

        it('highlights searched items in rows if search text is set and data reloaded', function () {
            var rowEl,
                searchEl,
                searchIconEl,
                spanEl;

            $scope.$watch('locals.gridOptions.searchText', searchTextChanged);

            el = setUpGrid(basicGridHtml);

            setGridData(dataSet1);

            searchEl = getSearchBox(el);

            searchEl.eq(0).val('John').trigger('change');

            searchIconEl = getSearchIcon(el);
            searchIconEl.eq(0).click();

            $scope.$digest();

            $timeout.flush();

            rowEl = getGridRows(el);

            spanEl = rowEl.eq(0).find('span');
            expect(spanEl.eq(0)).toHaveClass('highlight');

        });

        it('can exclude columns from search', function () {
            var rowEl,
                searchEl,
                searchIconEl,
                spanEl;

            $scope.$watch('locals.gridOptions.searchText', searchTextChanged);

            locals.gridOptions.columns[0].exclude_from_search = true;

            el = setUpGrid(basicGridHtml);

            setGridData(dataSet1);

            searchEl = getSearchBox(el);
            searchEl.eq(0).val('John').trigger('change');

            searchIconEl = getSearchIcon(el);
            searchIconEl.eq(0).click();

            $scope.$digest();

            $timeout.flush();

            rowEl = getGridRows(el);

            spanEl = rowEl.eq(0).find('span');
            expect(spanEl.eq(0)).not.toHaveClass('highlight');

        });

        it('will clear highlight if search text is not set', function () {
            var rowEl,
                searchEl,
                searchIconEl,
                spanEl;

            $scope.$watch('locals.gridOptions.searchText', searchTextChanged);

            el = setUpGrid(basicGridHtml);

            setGridData(dataSet1);

            searchEl = getSearchBox(el);

            searchEl.eq(0).val('John').trigger('change');

            searchIconEl = getSearchIcon(el);
            searchIconEl.eq(0).click();

            $scope.$digest();

            $timeout.flush();

            searchEl.eq(0).val('').trigger('change');
            searchIconEl.eq(0).click();

            $scope.$digest();

            $scope.locals.gridOptions.data = [dataSet1[0], dataSet1[1]];
            $scope.$digest();
            $timeout.flush();

            rowEl = getGridRows(el);

            spanEl = rowEl.eq(0).find('span');
            expect(spanEl.eq(0)).not.toHaveClass('highlight');

        });
    });

    describe('column alignment', function () {
        it('sets the alignment of the column cells and headers based on column options', function () {

            var cellEl,
                headerEl,
                rowEl;

            locals.gridOptions.columns[0].right_align = true;
            locals.gridOptions.columns[1].center_align = true;

            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            headerEl = getHeaders(el);

            expect(headerEl.eq(0)).toHaveClass('bb-grid-th-right');
            expect(headerEl.eq(1)).toHaveClass('bb-grid-th-center');
            expect(headerEl.eq(2)).toHaveClass('bb-grid-th-left');

            rowEl = getGridRows(el);

            cellEl = rowEl.eq(0).find('td');

            expect(cellEl.eq(0)).toHaveCss({"text-align": "right"});
            expect(cellEl.eq(1)).toHaveCss({"text-align": "center"});
            expect(cellEl.eq(2)).toHaveCss({"text-align": "left"});

        });
    });

    describe('row context menu', function () {
        it('can be created on grid rows', function () {
            var rowEl;

            locals.gridOptions.getContextMenuItems = getContextMenuItems;
            el = setUpGrid(basicGridHtml, locals);
            $scope.$digest();

            setGridData(dataSet1);
            $scope.$digest();
            rowEl = getGridRows(el);

            expect(rowEl.eq(0).find('td').eq(0)).toHaveClass('bb-grid-dropdown-cell');
            $scope.$digest();

            rowEl = getGridRows(el);

            expect(rowEl.eq(0).find('td div.bb-context-menu').eq(0)).toHaveClass('dropdown');
            expect(rowEl.eq(0).find('td button.bb-context-menu-btn').length).toBe(1);
            expect($('body ul li a')[0]).toHaveText('Option1');

            expect(rowEl.eq(1).find('td').eq(0)).toHaveClass('bb-grid-dropdown-cell');
            expect(rowEl.eq(1).find('td div.bb-context-menu').length).toBe(0);

            expect(rowEl.eq(2).find('td').eq(0)).toHaveClass('bb-grid-dropdown-cell');
            expect(rowEl.eq(2).find('td div.bb-context-menu').length).toBe(0);

            expect(rowEl.eq(3).find('td').eq(0)).toHaveClass('bb-grid-dropdown-cell');
            expect(rowEl.eq(3).find('td div.bb-context-menu').eq(0)).toHaveClass('dropdown');
            expect(rowEl.eq(3).find('td button.bb-context-menu-btn').length).toBe(1);
            expect($('body ul li a')[0]).toHaveText('Option1');

        });

        it('can have options selected', function () {
            var rowEl,
                contextEl,
                optionEl;

            locals.gridOptions.getContextMenuItems = getContextMenuItems;

            el = setUpGrid(basicGridHtml, locals);
            setGridData(dataSet1);

            rowEl = getGridRows(el);
            expect($('body ul').eq(0)).toHaveCss({"display": "none"});

            contextEl = rowEl.eq(0).find('td div button').eq(0);
            contextEl.click();
            expect($('body ul').eq(0)).not.toHaveCss({"display": "none"});

            optionEl = $('body ul li a').eq(0);
            expect(contextMenuItemClicked).toBe(false);
            optionEl.click();
            expect(contextMenuItemClicked).toBe(true);
        });

        it('cannot have its column sorted', function () {
            var headerEl;

            locals.gridOptions.getContextMenuItems = getContextMenuItems;

            el = setUpGrid(basicGridHtml, locals);
            setGridData(dataSet1);

            headerEl = getHeaders(el);

            expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');

            headerEl.eq(0).click();

            expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
            expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');

        });


    });

    describe('sizing and scrolling', function () {
        it('can have columns set to a width greater than the table size which will cause a horizontal scroll bar on the top and bottom', function () {
            var headerEl,
                expectedScrollbarWidth,
                topScrollbarEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 300;
            locals.gridOptions.columns[1].width_all = 300;
            locals.gridOptions.columns[2].width_all = 300;

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            headerEl = getHeaders(el);

            expect(headerEl[0].style.width).toBe('300px');

            //expect top scrollbar to have height
            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');

            expectedScrollbarWidth = bbWindow.getScrollbarWidth();

            expect(topScrollbarEl[0].style.height).toBe(expectedScrollbarWidth + 'px');
        });

        it('will not emit an includedColumnsChanged event on media breakpoint change', function () {
            var callback,
                thisHappened = false,
                rowEl;

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (gridCallback) {
                callback = gridCallback;
            });

            el = setUpGrid(basicGridHtml, locals);

            $scope.$on('includedColumnsChanged', function () {
                thisHappened = true;
            });

            callback({xs: true});

            rowEl = getGridRows(el);
            expect(rowEl.length).toBe(0);

            expect(thisHappened).toBe(false);
        });

        it('does not set the top scrollbar height if breakpoints are xs', function () {
            var callback,
                headerEl,
                topScrollbarEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (gridCallback) {
                callback = gridCallback;
            });

            locals.gridOptions.columns[0].width_all = 300;
            locals.gridOptions.columns[1].width_all = 300;
            locals.gridOptions.columns[2].width_all = 300;

            el = setUpGrid(gridWrapperHtml, locals);

            callback({xs: true});

            setGridData(dataSet1);

            headerEl = getHeaders(el);

            expect(headerEl[0].style.width).toBe('300px');

            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');

            expect(topScrollbarEl[0].style.height).toBe('0px');
        });

        it('can have columns set to a width less than the table size which will cause no horizontal scroll bar', function () {
            var headerEl,
                topScrollbarEl,
                gridWrapperHtml = '<div style="width: 800px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 100;
            locals.gridOptions.columns[1].width_all = 100;
            locals.gridOptions.columns[2].width_all = 100;

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            headerEl = getHeaders(el);

            expect(headerEl[0].style.width).toBe('100px');

            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');

            expect(topScrollbarEl[0].style.height).toBe('0px');
        });

        it('will scroll properly on header viewkeeper state change when fixed', function () {
            var tableWrapperEl,
                headerViewKeeperEl,
                stateChangedCallback,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 300;
            locals.gridOptions.columns[1].width_all = 300;
            locals.gridOptions.columns[2].width_all = 300;



            spyOn(bbViewKeeperBuilder, 'create').and.callFake(
                function (callObject) {
                    if ($(callObject.el).hasClass('ui-jqgrid-hdiv')) {
                        stateChangedCallback = callObject.onStateChanged;
                    }

                    return {
                        destroy: function () {

                        },
                        scrollToTop: function () {

                        },
                        syncElPosition: function () {

                        },
                        isFixed: true
                    };

                }
            );

            el = setUpGrid(gridWrapperHtml, locals);

            headerViewKeeperEl = el.find('.table-responsive .ui-jqgrid-hdiv');

            setGridData(dataSet1);

            tableWrapperEl = el.find('.table-responsive');


            headerViewKeeperEl.addClass('bb-viewkeeper-fixed');

            tableWrapperEl.scrollLeft(5);

            stateChangedCallback();

            expect(headerViewKeeperEl.scrollLeft()).toBe(tableWrapperEl.scrollLeft());


        });

        it('will scroll properly on header viewkeeper state change when not fixed', function () {
            var tableWrapperEl,
                headerViewKeeperEl,
                stateChangedCallback,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 300;
            locals.gridOptions.columns[1].width_all = 300;
            locals.gridOptions.columns[2].width_all = 300;



            spyOn(bbViewKeeperBuilder, 'create').and.callFake(
                function (callObject) {
                    if ($(callObject.el).hasClass('ui-jqgrid-hdiv')) {
                        stateChangedCallback = callObject.onStateChanged;
                    }

                    return {
                        destroy: function () {

                        },
                        scrollToTop: function () {

                        },
                        syncElPosition: function () {

                        },
                        isFixed: false
                    };

                }
            );

            el = setUpGrid(gridWrapperHtml, locals);

            headerViewKeeperEl = el.find('.table-responsive .ui-jqgrid-hdiv');

            setGridData(dataSet1);

            tableWrapperEl = el.find('.table-responsive');

            tableWrapperEl.scrollLeft(20);

            stateChangedCallback();

            expect(headerViewKeeperEl.scrollLeft()).toBe(0);


        });

        it('will set the grid width to the new header width on vanilla resize', function () {
            var tableEl,
                headerEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 300;
            locals.gridOptions.columns[1].width_all = 300;
            locals.gridOptions.columns[2].width_all = 300;

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            tableEl = el.find('.table-responsive .bb-grid-table');

            headerEl = getHeaders(el);

            spyOn($.fn, 'setGridWidth');

            tableEl[0].p.resizeStart({}, 0);
            tableEl[0].p.resizeStop(700, 0);
            expect($.fn.setGridWidth).toHaveBeenCalledWith(1300, false);

        });

        it('will make the extended column smaller by resize amount when that is smaller than amount column was originally extended', function () {
            var tableEl,
                headerEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 100;
            locals.gridOptions.columns[1].width_all = 100;
            locals.gridOptions.columns[2].width_all = 100;

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            headerEl = getHeaders(el);

            expect(headerEl[2].style.width).toBe('400px');

            tableEl = el.find('.table-responsive .bb-grid-table');

            spyOn($.fn, 'setGridWidth');
            spyOn($.fn, 'setColProp');

            tableEl[0].p.resizeStart({}, 0);
            tableEl[0].p.resizeStop(200, 0);
            expect($.fn.setColProp).toHaveBeenCalledWith(locals.gridOptions.columns[2].name, {widthOrg: 300});
            expect($.fn.setGridWidth).toHaveBeenCalledWith(600, true);

        });

        it('will return extended column to original size and grow table when the resize amount is greater than amount column was originally extended', function () {
            var tableEl,
                headerEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 100;
            locals.gridOptions.columns[1].width_all = 100;
            locals.gridOptions.columns[2].width_all = 100;

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            tableEl = el.find('.table-responsive .bb-grid-table');

            headerEl = getHeaders(el);

            expect(headerEl[2].style.width).toBe('400px');

            spyOn($.fn, 'setGridWidth');
            spyOn($.fn, 'setColProp');

            tableEl[0].p.resizeStart({}, 0);

            tableEl[0].p.resizeStop(450, 0);

            expect($.fn.setColProp).toHaveBeenCalledWith(locals.gridOptions.columns[2].name, {widthOrg: 100});
            expect($.fn.setGridWidth).toHaveBeenCalledWith(650, true);
        });

        it('will set width normally when there is an extended column and the grid size is being decreased', function () {
            var tableEl,
                headerEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 100;
            locals.gridOptions.columns[1].width_all = 100;
            locals.gridOptions.columns[2].width_all = 100;

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            tableEl = el.find('.table-responsive .bb-grid-table');

            headerEl = getHeaders(el);

            expect(headerEl[2].style.width).toBe('400px');

            spyOn($.fn, 'setGridWidth');
            spyOn($.fn, 'setColProp');

            tableEl[0].p.resizeStart({}, 0);
            tableEl[0].p.resizeStop(50, 0);

            expect($.fn.setColProp).not.toHaveBeenCalled();
            expect($.fn.setGridWidth).toHaveBeenCalledWith(550, false);

        });

        it('will sync the header viewkeeper to the tableWrapper on resize when the viewkeeper is fixed', function () {
            var tableEl,
                headerEl,
                tableWrapperEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            spyOn(bbViewKeeperBuilder, 'create').and.returnValue(
                {
                    destroy: function () {

                    },
                    scrollToTop: function () {

                    },
                    syncElPosition: function () {

                    },
                    isFixed: true
                }
            );

            locals.gridOptions.columns[0].width_all = 100;
            locals.gridOptions.columns[1].width_all = 300;
            locals.gridOptions.columns[2].width_all = 300;

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            tableEl = el.find('.table-responsive .bb-grid-table');

            spyOn($.fn, 'setGridWidth');
            spyOn($.fn, 'setColProp');

            headerEl = el.find('.ui-jqgrid-hdiv');
            tableWrapperEl = getTableWrapperEl(el);

            headerEl.width(710);
            headerEl.scrollLeft(30);

            tableEl[0].p.resizeStart({}, 0);
            tableEl[0].p.resizeStop(110, 0);

            expect($.fn.setColProp).not.toHaveBeenCalled();
            expect($.fn.setGridWidth).toHaveBeenCalledWith(710, false);

            expect(headerEl.width()).toBe(tableWrapperEl.width());
            expect(headerEl.scrollLeft()).toBe(tableWrapperEl.scrollLeft());


        });

        it('will increase the size of elements for a last column resize when the grid is smaller than the table wrapper', function () {
            var tableEl,
                headerEl,
                expectedWidth,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.getContextMenuItems = getContextMenuItems;
            locals.gridOptions.multiselect = true;

            locals.gridOptions.columns[0].width_all = 100;
            locals.gridOptions.columns[1].width_all = 100;
            locals.gridOptions.columns[2].width_all = 100;

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            tableEl = el.find('.table-responsive .bb-grid-table');

            headerEl = getHeaders(el);

            spyOn($.fn, 'setGridWidth');
            spyOn($.fn, 'setColProp');

            el.find('.ui-jqgrid').width(500);

            tableEl[0].p.resizeStart({}, 4);

            expectedWidth = el.find('.table-responsive').width();

            expect(el.find('.ui-jqgrid').width()).toBe(expectedWidth);

            expect(el.find('.ui-jqgrid .ui-jqgrid-hdiv').width()).toBe(expectedWidth);

            expect(el.find('.ui-jqgrid-hdiv tr')[0].style.paddingRight).toBe(expectedWidth.toString() + 'px');
            tableEl[0].p.resizeStop(200, 4);
        });
    });

    describe('media breakpoint column resizing', function () {
        it('can have xs, sm, md, and lg breakpoints set', function () {
            var callback,
                headerEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_xs = 100;
            locals.gridOptions.columns[0].width_sm = 200;
            locals.gridOptions.columns[0].width_md = 300;
            locals.gridOptions.columns[0].width_lg = 400;

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (gridCallback) {
                callback = gridCallback;
            });

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            //no breakpoints clled set defaults to 150px
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('150px');

            callback({ xs: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('100px');

            callback({ sm: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('200px');

            callback({ md: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('300px');

            callback({ lg: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('400px');

            callback({});
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('150px');
        });

        it('can have a width_all that will be the width for unspecified breakpoints', function () {
            var callback,
                headerEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_xs = 100;
            locals.gridOptions.columns[0].width_all = 200;

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (gridCallback) {
                callback = gridCallback;
            });

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            callback({ xs: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('100px');

            callback({ sm: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('200px');

            callback({ md: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('200px');

            callback({ lg: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('200px');

            callback({});
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('200px');
        });

        it('will have columns defualt to 150px if no breakpoint widths and no width_all is set', function () {
            var callback,
                headerEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_xs = 100;

            spyOn(bbMediaBreakpoints, 'register').and.callFake(function (gridCallback) {
                callback = gridCallback;
            });

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            callback({ xs: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('100px');

            callback({ sm: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('150px');

            callback({ md: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('150px');

            callback({ lg: true });
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('150px');

            callback({});
            headerEl = getHeaders(el);
            expect(headerEl[0].style.width).toBe('150px');
        });
    });

    describe('column reordering', function () {
        it('changes the order of selected columns without initializing grids', function () {
            var tableEl,
                headerEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            el = setUpGrid(gridWrapperHtml);

            setGridData(dataSet1);

            tableEl = el.find('.table-responsive .bb-grid-table');
            tableEl[0].p.sortable.update([1, 0, 2]);

            $scope.locals.gridOptions.columns[0].width_all = 1000;

            expect($scope.locals.gridOptions.selectedColumnIds[0]).toBe(2);
            expect($scope.locals.gridOptions.selectedColumnIds[1]).toBe(1);
            expect($scope.locals.gridOptions.selectedColumnIds[2]).toBe(3);

            headerEl = getHeaders(el);

            expect(headerEl[0].style.width).toBe('150px');
        });

        it('will have the correct offset when there is a context menu', function () {
            var tableEl;

            locals.gridOptions.getContextMenuItems = getContextMenuItems;

            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            tableEl = el.find('.table-responsive .bb-grid-table');
            tableEl[0].p.sortable.update([0, 2, 1, 3]);

            expect($scope.locals.gridOptions.selectedColumnIds[0]).toBe(2);
            expect($scope.locals.gridOptions.selectedColumnIds[1]).toBe(1);
            expect($scope.locals.gridOptions.selectedColumnIds[2]).toBe(3);
        });

        it('will have the correct offset when there is a context menu and multiselect', function () {
            var tableEl;

            locals.gridOptions.getContextMenuItems = getContextMenuItems;
            locals.gridOptions.multiselect = true;

            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            tableEl = el.find('.table-responsive .bb-grid-table');
            tableEl[0].p.sortable.update([0, 1, 3, 2, 4]);

            expect($scope.locals.gridOptions.selectedColumnIds[0]).toBe(2);
            expect($scope.locals.gridOptions.selectedColumnIds[1]).toBe(1);
            expect($scope.locals.gridOptions.selectedColumnIds[2]).toBe(3);
        });
    });

    describe('selectedColumnIds changing', function () {
        it('will fire an includedColumnsChanged event that can cause existing data to not be reloaded', function () {

            var rowEl,
                thisHappened = false;

            $scope.$on('includedColumnsChanged', function (event, data) {
                data.willResetData = true;
                thisHappened = true;
            });


            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            locals.gridOptions.selectedColumnIds = [1, 2];

            $scope.$digest();

            rowEl = getGridRows(el);
            expect(thisHappened).toBe(true);
            expect(rowEl.length).toBe(0);
        });
    });

    describe('resizing tableWrapper', function () {

        it('does nothing if the tableWrapper width is unchanged on window resize', function () {
            var tableWrapperEl,
                windowEl = $($window);

            el = setUpGrid(basicGridHtml);

            tableWrapperEl = getTableWrapperEl(el);

            spyOn($.fn, 'setGridWidth');
            windowEl.trigger('resize');

            expect($.fn.setGridWidth).not.toHaveBeenCalled();

        });

        it('does nothing if the columns have been resized on window resize', function () {
            var tableWrapperEl,
                topScrollbarEl,
                tableEl,
                gridWrapperHtml = '<div style="width: 700px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>',
                windowEl = $($window);

            locals.gridOptions.columns[0].width_all = 600;
            locals.gridOptions.columns[1].width_all = 5;
            locals.gridOptions.columns[2].width_all = 5;

            el = setUpGrid(gridWrapperHtml, locals);

            tableEl = el.find('.table-responsive .bb-grid-table');

            tableEl[0].p.resizeStart({}, 2);
            tableEl[0].p.resizeStop(50, 2);

            spyOn($.fn, 'setGridWidth');

            tableWrapperEl = getTableWrapperEl(el);

            tableWrapperEl.width(599);

            windowEl.trigger('resize');

            expect($.fn.setGridWidth).not.toHaveBeenCalled();


            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');

            expect(topScrollbarEl[0].style.width).toBe('599px');

        });

        it('gets the new table width from the totalcolumn width when no extended column resize on window resize', function () {
            var expectedScrollbarWidth,
                tableWrapperEl,
                topScrollbarEl,
                topScrollbarDivEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>',
                windowEl = $($window);

            locals.gridOptions.columns[0].width_all = 600;
            locals.gridOptions.columns[1].width_all = 5;
            locals.gridOptions.columns[2].width_all = 5;

            el = setUpGrid(gridWrapperHtml, locals);

            spyOn($.fn, 'setGridWidth');

            tableWrapperEl = getTableWrapperEl(el);

            tableWrapperEl.width(599);

            windowEl.trigger('resize');

            expect($.fn.setGridWidth).toHaveBeenCalledWith(610);

            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');
            topScrollbarDivEl = topScrollbarEl.find('div');

            expect(topScrollbarDivEl[0].style.width).toBe('610px');
            expectedScrollbarWidth = bbWindow.getScrollbarWidth();

            expect(topScrollbarDivEl[0].style.height).toBe(expectedScrollbarWidth + 'px');

            expect(topScrollbarEl[0].style.height).toBe(expectedScrollbarWidth + 'px');
            expect(topScrollbarEl[0].style.width).toBe('599px');
        });

        it('sets the total column width when no extended column and totalcolumn width exactly the same as the tablewrapperwidth', function () {
            var tableWrapperEl,
                topScrollbarEl,
                topScrollbarDivEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>',
                windowEl = $($window);

            locals.gridOptions.columns[0].width_all = 590;
            locals.gridOptions.columns[1].width_all = 5;
            locals.gridOptions.columns[2].width_all = 5;

            el = setUpGrid(gridWrapperHtml, locals);

            spyOn($.fn, 'setGridWidth');

            tableWrapperEl = getTableWrapperEl(el);

            tableWrapperEl.width(599);

            windowEl.trigger('resize');

            expect($.fn.setGridWidth).toHaveBeenCalledWith(599);

            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');
            topScrollbarDivEl = topScrollbarEl.find('div');

            expect(topScrollbarDivEl[0].style.width).toBe('599px');
            expect(topScrollbarDivEl[0].style.height).toBe('0px');
            expect(topScrollbarEl[0].style.height).toBe('0px');


            expect(topScrollbarEl[0].style.width).toBe('599px');
        });

        it('takes away from the extended column width when there is an extended column and the tableWrapper resize is less than the extended portion of the column on window resize', function () {
            var tableWrapperEl,
                topScrollbarEl,
                topScrollbarDivEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>',
                windowEl = $($window);

            locals.gridOptions.columns[0].width_all = 5;
            locals.gridOptions.columns[1].width_all = 5;
            locals.gridOptions.columns[2].width_all = 5;
            el = setUpGrid(gridWrapperHtml, locals);

            spyOn($.fn, 'setGridWidth');
            spyOn($.fn, 'setColProp');

            tableWrapperEl = getTableWrapperEl(el);

            tableWrapperEl.width(299);

            windowEl.trigger('resize');

            expect($.fn.setColProp).toHaveBeenCalledWith(locals.gridOptions.columns[2].name, {widthOrg: 289});

            expect($.fn.setGridWidth).toHaveBeenCalledWith(299, true);

            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');
            topScrollbarDivEl = topScrollbarEl.find('div');

            expect(topScrollbarDivEl[0].style.height).toBe('0px');
            expect(topScrollbarEl[0].style.height).toBe('0px');
        });

        it('returns the column its original size and decreases the table size when the window resize is greater than the extended portion of the column on window resize', function () {
            var expectedScrollbarWidth,
                tableWrapperEl,
                topScrollbarEl,
                topScrollbarDivEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>',
                windowEl = $($window);

            locals.gridOptions.columns[0].width_all = 5;
            locals.gridOptions.columns[1].width_all = 5;
            locals.gridOptions.columns[2].width_all = 589;

            el = setUpGrid(gridWrapperHtml, locals);

            spyOn($.fn, 'setGridWidth').and.callThrough();
            spyOn($.fn, 'setColProp').and.callThrough();
            tableWrapperEl = getTableWrapperEl(el);

            tableWrapperEl.width(589);
            windowEl.trigger('resize');
            expect($.fn.setColProp).toHaveBeenCalledWith(
                locals.gridOptions.columns[2].name,
                {widthOrg: 589});


            expect($.fn.setGridWidth).toHaveBeenCalledWith(599, true);

            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');
            topScrollbarDivEl = topScrollbarEl.find('div');
            expectedScrollbarWidth = bbWindow.getScrollbarWidth();
            expect(topScrollbarEl[0].style.height).toBe(expectedScrollbarWidth + 'px');

        });

        it('takes away from the extended column width when there is an extended column and the tableWrapper resize is less than the extended portion of the column when the rows are changed', function () {
            var tableWrapperEl,
                topScrollbarEl,
                topScrollbarDivEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 5;
            locals.gridOptions.columns[1].width_all = 5;
            locals.gridOptions.columns[2].width_all = 5;
            el = setUpGrid(gridWrapperHtml, locals);

            spyOn($.fn, 'setGridWidth');
            spyOn($.fn, 'setColProp');

            tableWrapperEl = getTableWrapperEl(el);

            tableWrapperEl.width(299);

            setGridData(dataSet1);

            expect($.fn.setColProp).toHaveBeenCalledWith(locals.gridOptions.columns[2].name, {widthOrg: 289});

            expect($.fn.setGridWidth).toHaveBeenCalledWith(299, true);

            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');
            topScrollbarDivEl = topScrollbarEl.find('div');

            expect(topScrollbarDivEl[0].style.height).toBe('0px');
            expect(topScrollbarEl[0].style.height).toBe('0px');
        });

        it('returns the column its original size and decreases the table size when the window resize is greater than the extended portion of the column when the rows are changed', function () {
            var expectedScrollbarWidth,
                tableWrapperEl,
                topScrollbarEl,
                topScrollbarDivEl,
                gridWrapperHtml = '<div style="width: 300px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 5;
            locals.gridOptions.columns[1].width_all = 5;
            locals.gridOptions.columns[2].width_all = 289;

            el = setUpGrid(gridWrapperHtml, locals);

            spyOn($.fn, 'setGridWidth').and.callThrough();
            spyOn($.fn, 'setColProp').and.callThrough();
            tableWrapperEl = getTableWrapperEl(el);

            tableWrapperEl.width(289);
            setGridData(dataSet1);
            expect($.fn.setColProp).toHaveBeenCalledWith(
                locals.gridOptions.columns[2].name,
                {widthOrg: 289});

            expect($.fn.setGridWidth).toHaveBeenCalledWith(299, true);


            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');
            topScrollbarDivEl = topScrollbarEl.find('div');

            expectedScrollbarWidth = bbWindow.getScrollbarWidth();
            expect(topScrollbarDivEl[0].style.height).toBe(expectedScrollbarWidth + 'px');
            expect(topScrollbarEl[0].style.height).toBe(expectedScrollbarWidth + 'px');

        });
    });

    describe('multiselect', function () {
        it('should center the header checkbox', function () {
            var th;

            locals.gridOptions.multiselect = true;

            el = setUpGrid('<div style="width: 300px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>', locals);

            th = el.find('th:first');

            // This will validate our assumption that the first TH element contains a checkbox when multiselect is enabled.
            expect(th.find('input[type="checkbox"]')).toExist();

            expect(th).toHaveCss({
                textAlign: 'center'
            });

        });

        it('should resize normally when there is multiselect, and an extended column is resized', function () {
            var tableEl,
                headerEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            locals.gridOptions.columns[0].width_all = 100;
            locals.gridOptions.columns[1].width_all = 100;
            locals.gridOptions.columns[2].width_all = 100;
            locals.gridOptions.multiselect = true;

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            tableEl = el.find('.table-responsive .bb-grid-table');

            headerEl = getHeaders(el);

            expect(headerEl[3].style.width).toBe('362px');

            spyOn($.fn, 'setGridWidth');
            spyOn($.fn, 'setColProp');

            tableEl[0].p.resizeStart({}, 3);
            tableEl[0].p.resizeStop(450, 3);

            expect($.fn.setColProp).not.toHaveBeenCalled();
            expect($.fn.setGridWidth).toHaveBeenCalledWith(688, false);
        });

        it('should select row properly', function () {
            var rowEl,
                gridDirectiveEl;

            locals.gridOptions.multiselect = true;

            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            rowEl = getGridRows(el);
            //make sure it also works with clicking fancy check
            rowEl.eq(0).find('td .bb-check-checkbox').click();
            $timeout.flush();
            gridDirectiveEl = el.find('[bb-grid-options]');

            expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([dataSet1[0]]);

            expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');
            expect(findCheckBox(rowEl.eq(0))).toBeChecked();

            clickRowMultiselect(rowEl, 0);
            $timeout.flush();
            expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([]);

            expect(rowEl.eq(0)).not.toHaveClass('ui-state-highlight');
            expect(findCheckBox(rowEl.eq(0))).not.toBeChecked();

        });

        it('should select all rows properly', function () {
            var headerEl,
                gridDirectiveEl,
                rowEl;

            locals.gridOptions.multiselect = true;

            el = setUpGrid(basicGridHtml, locals);

            headerEl = getHeaders(el);
            gridDirectiveEl = el.find('[bb-grid-options]');

            clickSelectAll(headerEl);

            expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([]);

            clickSelectAll(headerEl);

            setGridData(dataSet1);
            rowEl = getGridRows(el);

            clickSelectAll(headerEl);

            expect(gridDirectiveEl.isolateScope().selectedRows).toEqual(dataSet1);

            expect(rowEl).toHaveClass('ui-state-highlight');
            expect(rowEl.find('td .bb-check-wrapper input')).toBeChecked();
            expect(headerEl.find('.bb-check-wrapper input').eq(0)).toBeChecked();

            clickSelectAll(headerEl);

            expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([]);
            expect(rowEl).not.toHaveClass('ui-state-highlight');
            expect(findCheckBox(rowEl)).not.toBeChecked();
            expect(headerEl.find('.bb-check-wrapper input').eq(0)).not.toBeChecked();
        });

        it('will keep the selected rows selected on load more', function () {
            var headerEl,
                gridDirectiveEl,
                rowEl;

            locals.gridOptions.multiselect = true;

            el = setUpGrid(basicGridHtml, locals);

            headerEl = getHeaders(el);
            gridDirectiveEl = el.find('[bb-grid-options]');

            setGridData(dataSet1);

            clickSelectAll(headerEl);
            expect(gridDirectiveEl.isolateScope().selectedRows).toEqual(dataSet1);

            gridDirectiveEl.isolateScope().locals.loadMore();

            $scope.locals.gridOptions.data.push({
                name: 'Jimmy',
                instrument: 'Rhythm tamborine'
            });
            $scope.$digest();

            rowEl = getGridRows(el);

            expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([dataSet1[0], dataSet1[1], dataSet1[2], dataSet1[3]]);
            expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');
            expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
            expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');
            expect(rowEl.eq(3)).toHaveClass('ui-state-highlight');
            expect(findCheckBox(rowEl.eq(0))).toBeChecked();
            expect(findCheckBox(rowEl.eq(1))).toBeChecked();
            expect(findCheckBox(rowEl.eq(2))).toBeChecked();
            expect(findCheckBox(rowEl.eq(3))).toBeChecked();

        });

        it('will have the fancy select all checkbox unselected after a normal row is clicked', function () {
            var headerEl,
                rowEl;

            locals.gridOptions.multiselect = true;

            el = setUpGrid(basicGridHtml, locals);

            headerEl = getHeaders(el);
            setGridData(dataSet1);

            rowEl = getGridRows(el);

            clickSelectAll(headerEl);

            clickRowMultiselect(rowEl, 0);
            $timeout.flush();
            expect(rowEl.eq(0)).not.toHaveClass('ui-state-highlight');
            expect(findCheckBox(rowEl.eq(0))).not.toBeChecked();
            expect(headerEl.find('.bb-check-wrapper input').eq(0)).not.toBeChecked();
        });

        it('will do nothing on select row if status is true and the row is already in the selected rows object', function () {
            var rowEl,
                gridDirectiveEl;

            locals.gridOptions.multiselect = true;

            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            rowEl = getGridRows(el);

            gridDirectiveEl = el.find('[bb-grid-options]');

            gridDirectiveEl.isolateScope().selectedRows.push(dataSet1[0]);

            clickRowMultiselect(rowEl, 0);
            $timeout.flush();
            expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([dataSet1[0]]);
        });

        describe('binding selectedRows', function () {
            it('should allow selected rows to be set from the parent controller', function () {
                var gridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions"  bb-selected-rows="locals.selectedRows"></bb-grid></div>',
                    rowEl;

                locals.gridOptions.multiselect = true;
                locals.selectedRows = [];

                el = setUpGrid(gridHtml, locals);

                setGridData(dataSet1);
                rowEl = getGridRows(el);
                clickRowMultiselect(rowEl, 0);
                $timeout.flush();
                expect($scope.locals.selectedRows).toEqual([dataSet1[0]]);

                $scope.locals.selectedRows = [];
                $scope.locals.selectedRows.push(dataSet1[1]);
                $scope.$digest();

                rowEl = getGridRows(el);

                expect(rowEl.eq(0)).not.toHaveClass('ui-state-highlight');
                expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
                expect(rowEl.eq(2)).not.toHaveClass('ui-state-highlight');
                expect(rowEl.eq(3)).not.toHaveClass('ui-state-highlight');
                expect(findCheckBox(rowEl.eq(0))).not.toBeChecked();
                expect(findCheckBox(rowEl.eq(1))).toBeChecked();
                expect(findCheckBox(rowEl.eq(2))).not.toBeChecked();
                expect(findCheckBox(rowEl.eq(3))).not.toBeChecked();
            });

            it('will not allow selections to be set from the parent controller when the selection objects are not in the data', function () {
                var gridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions"  bb-selected-rows="locals.selectedRows"></bb-grid></div>',
                    rowEl;

                locals.gridOptions.multiselect = true;
                locals.selectedRows = [];

                el = setUpGrid(gridHtml, locals);

                setGridData(dataSet1);
                rowEl = getGridRows(el);
                clickRowMultiselect(rowEl, 0);
                $timeout.flush();
                expect($scope.locals.selectedRows).toEqual([dataSet1[0]]);

                $scope.locals.selectedRows = [];
                $scope.locals.selectedRows.push({fakeProperty: 'Neener neener'});
                $scope.$digest();

                rowEl = getGridRows(el);

                expect(rowEl.eq(0)).not.toHaveClass('ui-state-highlight');
                expect(rowEl.eq(1)).not.toHaveClass('ui-state-highlight');
                expect(rowEl.eq(2)).not.toHaveClass('ui-state-highlight');
                expect(rowEl.eq(3)).not.toHaveClass('ui-state-highlight');
                expect(findCheckBox(rowEl.eq(0))).not.toBeChecked();
                expect(findCheckBox(rowEl.eq(1))).not.toBeChecked();
                expect(findCheckBox(rowEl.eq(2))).not.toBeChecked();
                expect(findCheckBox(rowEl.eq(3))).not.toBeChecked();
            });

            it('should keep selected rows on data changed', function () {
                var gridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions"  bb-selected-rows="locals.selectedRows"></bb-grid></div>',
                    rowEl;

                locals.gridOptions.multiselect = true;
                locals.selectedRows = [];

                el = setUpGrid(gridHtml, locals);

                setGridData(dataSet1);
                rowEl = getGridRows(el);
                clickRowMultiselect(rowEl, 0);
                $timeout.flush();
                expect($scope.locals.selectedRows).toEqual([dataSet1[0]]);

                $scope.locals.gridOptions.data = [dataSet1[0]];
                $scope.$digest();


                rowEl = getGridRows(el);

                expect($scope.locals.selectedRows).toEqual([dataSet1[0]]);

                expect(rowEl.length).toBe(1);

                expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');

                expect(findCheckBox(rowEl.eq(0))).toBeChecked();

            });
        });
        function findCheckBox(rowEl) {
            return rowEl.find('td .bb-check-wrapper input').eq(0);
        }

        describe('shift click', function () {
            it('selects correctly when nothing is selected before shift click', function () {
                var rowEl,
                    gridDirectiveEl;

                locals.gridOptions.multiselect = true;

                el = setUpGrid(basicGridHtml, locals);

                gridDirectiveEl = el.find('[bb-grid-options]');

                setGridData(dataSet1);

                rowEl = getGridRows(el);

                shiftClickRowMultiselect(rowEl, 2);
                $timeout.flush();
                expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([dataSet1[2], dataSet1[1], dataSet1[0]]);
                expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');
                expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
                expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');

                expect(findCheckBox(rowEl.eq(0))).toBeChecked();
                expect(findCheckBox(rowEl.eq(1))).toBeChecked();
                expect(findCheckBox(rowEl.eq(2))).toBeChecked();

            });

            it('selects correctly when last selected is before shift click', function () {
                var rowEl,
                    gridDirectiveEl;

                locals.gridOptions.multiselect = true;

                el = setUpGrid(basicGridHtml, locals);

                gridDirectiveEl = el.find('[bb-grid-options]');

                setGridData(dataSet1);

                rowEl = getGridRows(el);

                clickRowMultiselect(rowEl, 1);
                $timeout.flush();

                shiftClickRowMultiselect(rowEl, 2);

                expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([dataSet1[2], dataSet1[1]]);

                expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
                expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');

                expect(findCheckBox(rowEl.eq(1))).toBeChecked();
                expect(findCheckBox(rowEl.eq(2))).toBeChecked();
            });

            it('selects correctly when last selected is after shift click', function () {
                var rowEl,
                    gridDirectiveEl;

                locals.gridOptions.multiselect = true;

                el = setUpGrid(basicGridHtml, locals);

                gridDirectiveEl = el.find('[bb-grid-options]');

                setGridData(dataSet1);

                rowEl = getGridRows(el);

                clickRowMultiselect(rowEl, 3);
                $timeout.flush();

                shiftClickRowMultiselect(rowEl, 1);
                expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([dataSet1[1], dataSet1[2], dataSet1[3]]);
                expect(rowEl.eq(3)).toHaveClass('ui-state-highlight');
                expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
                expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');

                expect(findCheckBox(rowEl.eq(3))).toBeChecked();
                expect(findCheckBox(rowEl.eq(1))).toBeChecked();
                expect(findCheckBox(rowEl.eq(2))).toBeChecked();
            });

            it('selects correctly when last selected is the shift click', function () {
                var rowEl,
                    gridDirectiveEl;

                locals.gridOptions.multiselect = true;

                el = setUpGrid(basicGridHtml, locals);

                gridDirectiveEl = el.find('[bb-grid-options]');

                setGridData(dataSet1);

                rowEl = getGridRows(el);

                clickRowMultiselect(rowEl, 1);
                $timeout.flush();
                shiftClickRowMultiselect(rowEl, 1);
                $timeout.flush();
                expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([dataSet1[1]]);
                expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');

                expect(findCheckBox(rowEl.eq(1))).toBeChecked();

            });

            it('clears other selections that are not in the shift click path', function () {
                var rowEl,
                    gridDirectiveEl;

                locals.gridOptions.multiselect = true;

                el = setUpGrid(basicGridHtml, locals);

                gridDirectiveEl = el.find('[bb-grid-options]');

                setGridData(dataSet1);

                rowEl = getGridRows(el);
                clickRowMultiselect(rowEl, 3);
                $timeout.flush();
                clickRowMultiselect(rowEl, 0);
                $timeout.flush();
                shiftClickRowMultiselect(rowEl, 2);
                expect(gridDirectiveEl.isolateScope().selectedRows).toEqual([dataSet1[2], dataSet1[1], dataSet1[0]]);
                expect(rowEl.eq(0)).toHaveClass('ui-state-highlight');
                expect(rowEl.eq(1)).toHaveClass('ui-state-highlight');
                expect(rowEl.eq(2)).toHaveClass('ui-state-highlight');

                expect(findCheckBox(rowEl.eq(0))).toBeChecked();
                expect(findCheckBox(rowEl.eq(1))).toBeChecked();
                expect(findCheckBox(rowEl.eq(2))).toBeChecked();

            });
        });

    });

    describe('column templating', function () {
        it('can have a template url that displays a formatted object in a cell', function () {
            var rowEl;

            $templateCache.put('bbGrid/samples/mycolumn.html',
                '<div>' +
                '<div class="bb-test-title">Title: {{data.title}}</div>' +
                '<div class="bb-test-info">Info: {{data.info}}</div>' +
                '</div>');

            locals.gridOptions.columns.push({
                caption: 'Templated',
                jsonmap: 'templated',
                id: 4,
                name: 'templated',
                width_all: 300,
                template_url: 'bbGrid/samples/mycolumn.html'
            });

            dataSet1[0].templated = {
                title: 'Johnny',
                info: 'JInfo'
            };

            dataSet1[1].templated = {
                title: 'Paully',
                info: 'PInfo'
            };

            dataSet1[2].templated = {
                title: 'Georgy',
                info: 'GInfo'
            };

            dataSet1[3].templated = {
                title: 'Ringoy',
                info: 'RInfo'
            };

            locals.gridOptions.selectedColumnIds.push(4);

            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            rowEl = getGridRows(el);

            expect(rowEl.eq(0).find('td .bb-test-title')).toHaveText('Title: Johnny');
            expect(rowEl.eq(0).find('td .bb-test-info')).toHaveText('Info: JInfo');

            expect(rowEl.eq(1).find('td .bb-test-title')).toHaveText('Title: Paully');
            expect(rowEl.eq(1).find('td .bb-test-info')).toHaveText('Info: PInfo');

            expect(rowEl.eq(2).find('td .bb-test-title')).toHaveText('Title: Georgy');
            expect(rowEl.eq(2).find('td .bb-test-info')).toHaveText('Info: GInfo');

            expect(rowEl.eq(3).find('td .bb-test-title')).toHaveText('Title: Ringoy');
            expect(rowEl.eq(3).find('td .bb-test-info')).toHaveText('Info: RInfo');
        });

        it('can have a controller and resources passed to the template', function () {
            var columnButtonClicked = false,
                rowEl;

            $templateCache.put('bbGrid/samples/mycolumn.html',
                '<div>' +
                '<div class="bb-test-title">{{resources.title}}: {{data.title}}</div>' +
                '<div class="bb-test-info">Info: {{data.info}}</div>' +
                '<button ng-click="locals.clickIt()">My Button</button>' +
                '</div>');

            function columnController($scope) {
                $scope.locals = {
                    clickIt: function () {
                        columnButtonClicked = true;
                    }
                };
            }

            columnController.$inject = ['$scope'];

            locals.gridOptions.columns.push({
                caption: 'Templated',
                controller: columnController,
                jsonmap: 'templated',
                id: 4,
                name: 'templated',
                width_all: 300,
                template_url: 'bbGrid/samples/mycolumn.html'
            });

            locals.gridOptions.resources = {
                title: 'Title'
            };

            dataSet1[0].templated = {
                title: 'Johnny',
                info: 'JInfo'
            };

            dataSet1[1].templated = {
                title: 'Paully',
                info: 'PInfo'
            };

            dataSet1[2].templated = {
                title: 'Georgy',
                info: 'GInfo'
            };

            dataSet1[3].templated = {
                title: 'Ringoy',
                info: 'RInfo'
            };

            locals.gridOptions.selectedColumnIds.push(4);

            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            rowEl = getGridRows(el);

            expect(rowEl.eq(0).find('td .bb-test-title')).toHaveText('Title: Johnny');
            expect(rowEl.eq(0).find('td .bb-test-info')).toHaveText('Info: JInfo');

            expect(rowEl.eq(1).find('td .bb-test-title')).toHaveText('Title: Paully');
            expect(rowEl.eq(1).find('td .bb-test-info')).toHaveText('Info: PInfo');

            expect(rowEl.eq(2).find('td .bb-test-title')).toHaveText('Title: Georgy');
            expect(rowEl.eq(2).find('td .bb-test-info')).toHaveText('Info: GInfo');

            expect(rowEl.eq(3).find('td .bb-test-title')).toHaveText('Title: Ringoy');
            expect(rowEl.eq(3).find('td .bb-test-info')).toHaveText('Info: RInfo');

            rowEl.eq(0).find('td button').click();

            expect(columnButtonClicked).toBe(true);

            setGridData([]);

            $scope.$digest();
        });

        it('has built in see more functionality', function () {
            var contentText = 'ha ha ha ha ha ahahhaahhaha hahah ahhahah hahah lahahal hahahl ahhahlahhal hahalhah hahahahh a hahahah aha ha ha ha ah ah ah ah aha ha hah ha haha ha ah ahhhha a a hhhahahh  hahah ahah ha ha ha ah ah ah ah aha hha hah a ah ah ahah ahahhhha a hhhahah ahahah ah aha ha ha ha ha ha ha ha aha ha hah ha ha ha ah hhhahhhha ha ha ha ha ah ah aha hah ahaha hah ha a',
                rowEl;

            locals.gridOptions.columns[2].allow_see_more = true;

            dataSet1[0].bio = contentText;

            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            rowEl = getGridRows(el);

            expect(rowEl.eq(0).find('td div[bb-text-expand]').length).toBe(1);
            $scope.locals.gridOptions.selectedColumnIds = [2, 3];

            $scope.$digest();

            rowEl = getGridRows(el);

            expect(rowEl.eq(0).find('td div[bb-text-expand]').length).toBe(1);
        });

        //Note: users should use column templates instead of formatters to keep dom info out of controllers.
        it('can use jqgrid column formatters if a template url is not provided', function () {
            var rowEl;

            function myColumnFormatter(cellValue) {
                return '<div class="bb-test-col-formatter">Hurr Durr: ' + cellValue + '</div>';
            }

            locals.gridOptions.columns.push({
                caption: 'Templated',
                jsonmap: 'templated',
                id: 4,
                name: 'templated',
                width_all: 300,
                colFormatter: myColumnFormatter
            });

            dataSet1[0].templated = 'Johnny';

            dataSet1[1].templated = 'Paully';

            dataSet1[2].templated = 'Georgy';

            dataSet1[3].templated = 'Ringoy';

            locals.gridOptions.selectedColumnIds.push(4);

            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            rowEl = getGridRows(el);

            expect(rowEl.eq(0).find('td .bb-test-col-formatter')).toHaveText('Hurr Durr: Johnny');

            expect(rowEl.eq(1).find('td .bb-test-col-formatter')).toHaveText('Hurr Durr: Paully');

            expect(rowEl.eq(2).find('td .bb-test-col-formatter')).toHaveText('Hurr Durr: Georgy');

            expect(rowEl.eq(3).find('td .bb-test-col-formatter')).toHaveText('Hurr Durr: Ringoy');
        });

        it('can access row data from the column template', function () {
            var rowEl;

            $templateCache.put('bbGrid/samples/mycolumn.html',
                '<div>' +
                '<div class="bb-test-rowDataName">{{rowData.name}}</div>' +
                '</div>');

            locals.gridOptions.columns.push({
                caption: 'Templated',
                jsonmap: 'templated',
                id: 4,
                name: 'templated',
                width_all: 300,
                template_url: 'bbGrid/samples/mycolumn.html'
            });

            locals.gridOptions.resources = {
                title: 'Title'
            };

            dataSet1[0].templated = {
                title: 'Johnny',
                info: 'JInfo'
            };

            dataSet1[1].templated = {
                title: 'Paully',
                info: 'PInfo'
            };

            dataSet1[2].templated = {
                title: 'Georgy',
                info: 'GInfo'
            };

            dataSet1[3].templated = {
                title: 'Ringoy',
                info: 'RInfo'
            };

            locals.gridOptions.selectedColumnIds.push(4);

            el = setUpGrid(basicGridHtml, locals);

            setGridData(dataSet1);

            rowEl = getGridRows(el);

            expect(rowEl.eq(0).find('td .bb-test-rowDataName')).toHaveText('John');

            expect(rowEl.eq(1).find('td .bb-test-rowDataName')).toHaveText('Paul');

            expect(rowEl.eq(2).find('td .bb-test-rowDataName')).toHaveText('George');

            expect(rowEl.eq(3).find('td .bb-test-rowDataName')).toHaveText('Ringo');
        });
    });

    describe('back to top', function () {
        it('scrolls the toolbar view keeper back to the top', function () {
            var backToTopEl,
                stateChangedCallback,
                scrollToTopCalled = false;

            spyOn(bbViewKeeperBuilder, 'create').and.callFake(
                function (callObject) {
                    if ($(callObject.el).hasClass('bb-grid-toolbar-viewkeeper')) {
                        stateChangedCallback = callObject.onStateChanged;
                    }

                    return {
                        destroy: function () {

                        },
                        scrollToTop: function () {
                            scrollToTopCalled = true;
                        },
                        syncElPosition: function () {

                        },
                        isFixed: true
                    };

                }
            );

            el = setUpGrid(basicGridHtml);

            setGridData(dataSet1);

            backToTopEl = el.find('.bb-table-backtotop');

            expect(backToTopEl.eq(0)).toBeHidden();

            stateChangedCallback();
            $timeout.flush();

            expect(backToTopEl.eq(0)).toBeVisible();

            backToTopEl.eq(0).click();

            expect(scrollToTopCalled).toBe(true);
        });
    });

    describe('wait', function () {
        it('will show the empty wait div if no rows and wait is true', function () {
            var emptyEl;

            el = setUpGrid(basicGridHtml);
            $scope.locals.gridOptions.loading = true;
            $scope.$digest();

            emptyEl = el.find('.bb-grid-empty-wait');

            expect(emptyEl.length).toBe(1);

        });
    });

    it('will not add an invalid column from selectedColumnIds', function () {
        var headerEl;

        locals.gridOptions.selectedColumnIds.push(4);

        el = setUpGrid(basicGridHtml, locals);

        //column headers are created
        headerEl = getHeaders(el);
        expect(headerEl.length).toBe(3);

        expect(headerEl.eq(0)).toHaveText('Name');
        expect(headerEl.eq(1)).toHaveText('Instrument');
        expect(headerEl.eq(2)).toHaveText('Biography');
    });

    it('will not initialize the grid if columns are not defined', function () {
        var headerEl;

        locals.gridOptions.columns = null;

        el = setUpGrid(basicGridHtml, locals);

        //column headers are created
        headerEl = getHeaders(el);
        expect(headerEl.length).toBe(0);

    });
});
