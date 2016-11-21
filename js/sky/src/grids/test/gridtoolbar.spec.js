/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */

describe('Grid toolbars', function () {
    'use strict';

    var basicGridHtml,
        bbViewKeeperBuilder,
        $compile,
        $document,
        el,
        dataSet1,
        fxOff,
        locals,
        $scope,
        options;

    function setUpGrid(gridHtml, setLocals) {
        var el = angular.element(gridHtml);

        $document.find('body').eq(0).append(el);

        if (angular.isDefined(setLocals)) {
            $scope.locals = setLocals;
        } else {
            $scope.locals = locals;
        }

        $compile(el)($scope);

        $scope.$digest();

        return el;
    }

    function getAddButton(el) {
        return el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-toolbar-btn.btn-primary');
    }

    function setGridData(data) {
        $scope.locals.gridOptions.data = data;
        $scope.$digest();
    }

    function setOptions(options) {
        locals.gridOptions = options;
        $scope.$digest();
    }

    function getGridRows(el) {
        return el.find('.ui-jqgrid-bdiv tr.ui-row-ltr');
    }

    function getHeaders(el) {
        return el.find('.bb-grid-container .table-responsive .ui-jqgrid-hbox > table > thead > tr > th');
    }

    beforeEach(module('ngMock'));
    beforeEach(module(
        'sky.grids',
        'sky.templates'
    ));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$document_, _bbViewKeeperBuilder_) {
        $scope = _$rootScope_;
        $compile = _$compile_;

        $document = _$document_;

        bbViewKeeperBuilder = _bbViewKeeperBuilder_;

        locals = {
        };

        options =  {
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
            selectedColumnIds: [1, 2, 3]
        };

        basicGridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

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

    describe('inline filters', function () {
        it('will toggle the visibility of the filters if the hasInlineFilters option is specified and it will react to options.filtersAreActive change', function () {

            var inlineHtml = '<div><bb-grid bb-grid-options="locals.gridOptions"><div class="bb-filters-inline"><input class="hehe" type="checkbox" ng-model="locals.gridOptions.filters.check"/></div></bb-grid></div>',
                filterButtonEl,
                filterInputEl;
            setOptions(options);
            locals.gridOptions.hasInlineFilters = true;
            locals.gridOptions.filters = {
                check: false
            };

            el = setUpGrid(inlineHtml, locals);



            filterInputEl = el.find('.hehe');

            expect(filterInputEl).not.toBeVisible();

            filterButtonEl = el.find('.bb-filter-btn');

            filterButtonEl.click();

            $scope.$digest();

            expect(filterInputEl).toBeVisible();

            $scope.locals.gridOptions.filters.check = true;
            $scope.locals.gridOptions.filtersAreActive = true;
            $scope.$digest();


            expect(filterButtonEl).toHaveClass('bb-filters-inline-active');

            expect($scope.locals.gridOptions.filters.check).toBe(true);


            $scope.locals.gridOptions.filters.check = false;
            $scope.locals.gridOptions.filtersAreActive = false;
            $scope.$digest();

            expect(filterButtonEl).not.toHaveClass('bb-filters-inline-active');

            expect($scope.locals.gridOptions.filters.check).toBe(false);

            filterButtonEl.click();

            $scope.$digest();

            expect(filterInputEl).not.toBeVisible();

        });

        it('will set the visibility of the filters if options.filtersOpen is defined', function () {
            var inlineHtml = '<div><bb-grid bb-grid-options="locals.gridOptions"><div class="bb-filters-inline"><input class="hehe" type="checkbox" ng-model="locals.gridOptions.filters.check"/></div></bb-grid></div>',
                filterInputEl;
            setOptions(options);
            locals.gridOptions.hasInlineFilters = true;
            locals.gridOptions.filtersOpen = true;

            el = setUpGrid(inlineHtml, locals);


            filterInputEl = el.find('.hehe');

            expect(filterInputEl).toBeVisible();

            locals.gridOptions.filtersOpen = false;
            $scope.$digest();

            expect(filterInputEl).not.toBeVisible();

            $scope.$destroy();

        });
    });

    describe('top scrollbar scrolling', function () {
        it('will have a top horizontal scroll bar that will sync with the bottom scroll bar', function () {
            var topScrollbarEl,
                tableWrapperEl,
                headerViewKeeperEl,
                gridWrapperHtml = '<div style="width: 600px;"><bb-grid bb-grid-options="locals.gridOptions"></bb-grid></div>';

            setOptions(options);

            locals.gridOptions.columns[0].width_all = 300;
            locals.gridOptions.columns[1].width_all = 300;
            locals.gridOptions.columns[2].width_all = 300;

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

            el = setUpGrid(gridWrapperHtml, locals);

            setGridData(dataSet1);

            topScrollbarEl = el.find('.bb-grid-container .bb-grid-toolbar-container .bb-grid-top-scrollbar');

            tableWrapperEl = el.find('.table-responsive');

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
    });

    describe('add button on toolbar', function () {
        it('can be enabled', function () {
            var addButtonEl;
            setOptions(options);

            locals.gridOptions.onAddClick = function () {

            };

            el = setUpGrid(basicGridHtml, locals);


            addButtonEl = getAddButton(el);

            expect(addButtonEl).toBeVisible();
        });

        it('can call the onAddClick function when the add button is clicked', function () {
            var addButtonCalled = false,
                addButtonEl;


            el = setUpGrid(basicGridHtml, locals);

            setOptions(options);

            locals.gridOptions.onAddClick = function () {
                addButtonCalled = true;
            };

            addButtonEl = getAddButton(el);

            expect(addButtonCalled).toBe(false);

            addButtonEl.click();

            expect(addButtonCalled).toBe(true);
        });
    });

    describe('searching', function () {
        it('sets searchText on search', function () {
            var searchEl,
                searchIconEl;

            el = setUpGrid(basicGridHtml);
            setOptions(options);

            setGridData(dataSet1);

            searchEl = el.find('.bb-grid-toolbar-container .bb-search-container input');

            searchEl.eq(0).val('John').trigger('change');

            searchIconEl = el.find('.bb-grid-toolbar-container .bb-search-container .bb-search-icon');
            searchIconEl.eq(0).click();

            $scope.$digest();

            expect($scope.locals.gridOptions.searchText).toBe('John');

        });

        it('responds to consumer searchText change', function () {
            var searchEl;

            el = setUpGrid(basicGridHtml);
            setOptions(options);

            setGridData(dataSet1);

            searchEl = el.find('.bb-grid-toolbar-container .bb-search-container input');

            expect(searchEl).toHaveValue('');

            $scope.locals.gridOptions.searchText = 'John';

            $scope.$digest();

            expect(searchEl).toHaveValue('John');
        });

    });

    describe('custom toolbar', function () {
        it('can have custom controls on the toolbar', function () {
            var customClicked = false,
                customToolbarGridHtml = '<div><bb-grid bb-grid-options="locals.gridOptions" bb-grid-custom-toolbar><bb-grid-toolbar><button type="button" class="btn bb-btn-secondary bb-grid-toolbar-btn bb-test-button" ng-click="locals.clickCustom()">This is a custom button</button></bb-grid-toolbar></bb-grid></div>';
            locals.clickCustom = function () {
                customClicked = true;
            };

            el = setUpGrid(customToolbarGridHtml, locals);
            setOptions(options);

            el.find('.bb-grid-toolbar-button-container .bb-test-button').click();

            expect(customClicked).toBe(true);
        });

        describe('filters', function () {
            describe('Filter button', function () {
                it('will create a filter button with an onClick event', function () {
                    var filterButtonClicked = false,
                        customToolbarGridHtml = '<div>' +
                        '<bb-grid bb-grid-options="locals.gridOptions">' +
                        '<bb-grid-toolbar bb-grid-filter-click="locals.clickFilter()">' +
                        '</bb-grid-toolbar>' +
                        '</bb-grid>' +
                        '</div>';

                    locals.clickFilter = function () {
                        filterButtonClicked = true;
                    };

                    el = setUpGrid(customToolbarGridHtml, locals);
                    setOptions(options);
                    expect(el.find('.bb-grid-toolbar-btn.bb-filter-btn').length).toBe(0);

                    el.find('.bb-filter-btn .bb-btn-secondary').click();
                    $scope.$digest();
                    expect(filterButtonClicked).toBe(true);
                    
                });

            });

            describe('Filter summary', function () {
                it('will place a filter summary in the summary section', function () {
                    var customToolbarGridHtml = '<div>' +
                        '<bb-grid bb-grid-options="locals.gridOptions">' +
                        '<bb-grid-toolbar bb-grid-filter-click="locals.clickFilter()">' +
                        '<bb-grid-toolbar-filter-summary>' + 
                        '<bb-filter-summary>' +
                        '<bb-filter-summary-item>' + 
                        'One filter' +
                        '</bb-filter-summary-item>' +
                        '</bb-filter-summary>' +
                        '</bb-grid-toolbar-filter-summary>' +
                        '</bb-grid-toolbar>' +
                        '</bb-grid>' +
                        '</div>',
                        summaryContainerEl;

                    el = setUpGrid(customToolbarGridHtml, locals);
                    setOptions(options);

                    summaryContainerEl = el.find('.bb-grid-filter-summary-container');
                    expect(summaryContainerEl.find('.bb-filter-summary .bb-filter-summary-item')).toHaveText('One filter');
                    
                });
            });
        });

        describe('searching', function () {

            var searchGridHtml,
                searchPlaceholderHtml;
            
            
            beforeEach(function () {
                searchGridHtml = '<div>' +
                        '<bb-grid bb-grid-options="locals.gridOptions">' +
                        '<bb-grid-toolbar bb-grid-search-text="locals.searchText" ' +
                            'bb-grid-search="locals.onSearch(searchText)" ' +
                            '>' +
                        '</bb-grid-toolbar>' +
                        '</bb-grid>' +
                        '</div>';
                searchPlaceholderHtml = '<div>' +
                        '<bb-grid bb-grid-options="locals.gridOptions">' +
                        '<bb-grid-toolbar bb-grid-search-text="locals.searchText" ' +
                            'bb-grid-search="locals.onSearch(searchText)" ' +
                            'bb-grid-search-placeholder="locals.placeholder" ' +
                            '>' +
                        '</bb-grid-toolbar>' +
                        '</bb-grid>' +
                        '</div>';
            });

            

            it('sets searchText on search', function () {
                var searchEl,
                    actualSearchText,
                    searchIconEl,
                    rowEl,
                    spanEl;

                locals.onSearch = function (searchText) {
                    actualSearchText = searchText;
                };

                el = setUpGrid(searchGridHtml, locals);
                setOptions(options);

                setGridData(dataSet1);

                searchEl = el.find('.bb-search-input');

                searchEl.eq(0).val('John').trigger('change');
                $scope.$digest();

                searchIconEl = el.find('.bb-search-btn-apply');
                searchIconEl.eq(0).click();

                $scope.$digest();

                expect(actualSearchText).toBe('John');

                rowEl = getGridRows(el);

                spanEl = rowEl.eq(0).find('span');
                expect(spanEl.eq(0)).toHaveClass('highlight');

            });


            it('responds to consumer searchText change', function () {
                var searchEl, actualSearchText;

                locals.onSearch = function (searchText) {
                    actualSearchText = searchText;
                };

                el = setUpGrid(searchGridHtml, locals);
                setOptions(options);

                setGridData(dataSet1);

                searchEl = el.find('.bb-search-input');

                expect(searchEl).toHaveValue('');

                $scope.locals.searchText = 'John';

                $scope.$digest();

                expect(searchEl).toHaveValue('John');
            });

            it('sets placeholder when present', function () {
                locals.placeholder = 'New text';

                el = setUpGrid(searchPlaceholderHtml, locals);

                expect(el.find('.bb-search-input-container input')).toHaveAttr('placeholder', locals.placeholder);
            });

            it('has default placeholder when not present', function () {

                el = setUpGrid(searchGridHtml, locals);

                expect(el.find('.bb-search-input-container input')).toHaveAttr('placeholder', 'Find in this list');
            });
        });

        describe('sorting', function () {
            var sortGridHtml;
            
            
            beforeEach(function () {
                sortGridHtml = '<div>' +
                        '<bb-grid bb-grid-options="locals.gridOptions">' +
                        '<bb-grid-toolbar bb-grid-search-text="locals.searchText" ' +
                            'bb-grid-search="locals.onSearch(searchText)" ' +
                            '>' +
                            '<bb-grid-toolbar-sort>' +
                                '<bb-sort bb-sort-append-to-body>' +
                                    '<bb-sort-item ' +
                                        'bb-sort-item-select="locals.sortItems()"> ' +
                                        'My Sort option' +
                                    '</bb-sort-item>' +
                                '</bb-sort>' +
                            '</bb-grid-toolbar-sort>' +
                        '</bb-grid-toolbar>' +
                        '</bb-grid>' +
                        '</div>';
            });

            it('allows users to transclude sort content', function () {
                var sortContainerEl;
                el = setUpGrid(sortGridHtml, locals);
                setOptions(options);

                sortContainerEl = el.find('.bb-grid-toolbar-sort-container');
                expect(sortContainerEl.find('.btn i')).toHaveClass('fa-sort');
            });

            it('prevents sort action on header click when sort content is specified', function () {
                var headerEl;
                
                el = setUpGrid(sortGridHtml, locals);
                setOptions(options);

                headerEl = getHeaders(el);

                setGridData(dataSet1);

                expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
                expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');

                headerEl.eq(0).click();

                expect(headerEl.eq(0)).not.toHaveClass('sorting-asc');
                expect(headerEl.eq(0)).not.toHaveClass('sorting-desc');

                
            });
        });     
    });
});
