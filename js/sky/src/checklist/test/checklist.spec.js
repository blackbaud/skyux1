/*jshint browser: true, jasmine: true */
/*global $, angular, inject, module */

describe('Checklist directive', function () {
    'use strict';

    var $compile,
        $scope,
        $parse,
        $timeout,
        checklistHtml,
        items,
        locals,
        resources,
        bbWait;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.checklist', 'sky.highlight', 'sky.templates'));

    beforeEach(inject(function (_$rootScope_, _$compile_, _$parse_, _$timeout_, bbResources, _bbWait_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $parse = _$parse_;
        $timeout = _$timeout_;
        bbWait = _bbWait_;

        resources = bbResources;
        items = [
            { column: 'Amount', description: 'Amount of the gift' },
            { column: 'Constituent summary', description: 'Summary information about the constituent who gave the gift' },
            { column: 'Soft credits', description: 'Soft credits for the gift' }
        ];

        function onSearch(searchText) {
            var filteredItems = [],
                i;

            for (i = 0; i < items.length; i++) {
                if (!searchText || items[i].column.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || items[i].description.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
                    filteredItems.push({ column: items[i].column, description: items[i].description });
                }
            }

            locals.items = filteredItems;
        }

        locals = {
            items:  items,
            selectedItems: [items[0]],
            onSearch: function (args) {
                onSearch(args.searchText);
            },
            includeSearch: true
        };

        /*jslint white: true */
        checklistHtml = '<bb-checklist bb-checklist-items="locals.items"' +
                                    'bb-checklist-selected-items="locals.selectedItems"' +
                                    'bb-checklist-filter-callback="locals.onSearch"' +
                                    'bb-checklist-include-search="locals.includeSearch"' +
                                    'bb-checklist-search-placeholder="\'My Placeholder\'"' +
                                    'bb-checklist-no-items-message="\'No items found\'">' +
                                    '<bb-checklist-columns>' +
                                        '<bb-checklist-column bb-checklist-column-caption="\'Column name\'" bb-checklist-column-field="\'column\'" bb-checklist-column-width="\'30%\'" bb-checklist-column-class="\'column-class\'"></bb-checklist-column>' +
                                        '<bb-checklist-column bb-checklist-column-caption="\'Column Description\'" bb-checklist-column-field="\'description\'" bb-checklist-column-width="\'70%\'" bb-checklist-column-class="\'description-class\'"></bb-checklist-column>' +
                                    '</bb-checklist-columns>' +
                                '</bb-checklist>';
        /*jslint white: false*/
    }));

    it('sets the table headers and table rows', function () {

        var i,
            tableHeader,
            tableRows,
            tableCells,
            inputCell,
            el = angular.element(checklistHtml);

        $compile(el)($scope);

        $scope.locals = locals;

        $scope.$digest();

        tableHeader = el.find('th');

        expect(tableHeader.eq(1).text()).toBe('Column name');
        expect(tableHeader.eq(2).text()).toBe('Column Description');

        tableRows = el.find('tbody tr');

        expect(tableRows.length).toBe(3);

        for (i = 0; i < tableRows.length; i = i + 1) {
            tableCells = angular.element(tableRows[i]).find('td');

            inputCell = angular.element(tableCells[0]).find('input');
            expect(inputCell.length).toBe(1);

            expect(tableCells.length).toBe(3);

            expect(tableCells.eq(1).text()).toBe(items[i].column);
            expect(tableCells.eq(1)).toHaveClass('column-class');
            expect(tableCells.eq(2).text()).toBe(items[i].description);
            expect(tableCells.eq(2)).toHaveClass('description-class');
        }


    });

    it('should handle row clicks', function () {
        var rowEl,
            el = angular.element(checklistHtml);

        $compile(el)($scope);

        $scope.locals = locals;

        $scope.$digest();

        rowEl = el.find('tbody tr');

        expect($scope.locals.selectedItems).toEqual([items[0]]);

        rowEl.eq(1).click();

        expect($scope.locals.selectedItems).toEqual([items[0], items[1]]);

        rowEl.eq(0).click();

        expect($scope.locals.selectedItems).toEqual([items[1]]);

    });

    it('should handle input clicks', function () {
        var inputEl,
            el = angular.element(checklistHtml);

        el.appendTo(document.body);

        $compile(el)($scope);

        $scope.locals = locals;

        $scope.$digest();

        inputEl = el.find('tbody tr input');

        expect($scope.locals.selectedItems).toEqual([items[0]]);

        inputEl.eq(1).click();

        expect($scope.locals.selectedItems).toEqual([items[0], items[1]]);

        inputEl.eq(0).click();

        expect($scope.locals.selectedItems).toEqual([items[1]]);

        el.remove();
    });

    it('clears selections', function () {
        var clearEl,
            rowEl,
            el = angular.element(checklistHtml);

        $compile(el)($scope);

        $scope.locals = locals;

        $scope.$digest();

        rowEl = el.find('tbody tr');

        rowEl.eq(1).click();

        expect($scope.locals.selectedItems).toEqual([items[0], items[1]]);

        clearEl = el.find('button:contains("' + resources.checklist_clear_all + '")');

        clearEl.eq(0).click();

        expect($scope.locals.selectedItems).toEqual([]);

    });

    it('selects all', function () {
        var selectEl,
            rowEl,
            el = angular.element(checklistHtml);

        $compile(el)($scope);

        $scope.locals = locals;

        $scope.$digest();

        rowEl = el.find('tbody tr');

        rowEl.eq(1).click();

        expect($scope.locals.selectedItems).toEqual([items[0], items[1]]);

        selectEl = el.find('button:contains("' + resources.checklist_select_all + '")');

        selectEl.eq(0).click();

        expect($scope.locals.selectedItems).toEqual(items);
    });

    it('should watch the search text', function () {
        var searchEl,
            rowEl,
            el = angular.element(checklistHtml),
            elScope;

        $compile(el)($scope);

        $scope.locals = locals;

        $scope.$digest();

        elScope = el.isolateScope();

        rowEl = el.find('tbody tr');

        rowEl.eq(1).click();

        expect($scope.locals.selectedItems).toEqual([items[0], items[1]]);

        searchEl = el.find('input[type="text"]');
        searchEl.val('your mother').trigger('change');

        expect(locals.items).toEqual([]);
    });

    it('throws errors on checklistModel when not applied to an input', function () {
        var el = angular.element('<div checklist-model="locals.selectedItems" checklist-value="locals.item[0]"/>');

        function errorFunctionWrapper() {
            $compile(el)($scope);
        }

        expect(errorFunctionWrapper).toThrow();
    });

    it('throws errors on checklistModel when checklistValue is not provided', function () {
        var el = angular.element('<input checklist-model="locals.selectedItems" />');

        function errorFunctionWrapper() {
            $compile(el)($scope);
        }

        expect(errorFunctionWrapper).toThrow();

    });

    it('handles when selected is not an array on remove', function () {
        var el = angular.element('<input checklist-model="locals.selectedItems" checklist-value="locals.items[0]"/>');

        $scope.locals = locals;

        $scope.locals.selectedItems = [items[0]];

        $compile(el)($scope);

        $scope.$digest();

        $scope.locals.selectedItems = null;
        $scope.$digest();

        expect($scope.locals.selectedItems).toBe(null);
    });

    it('handles when a search function is not available', function () {
        var searchEl,
            rowEl,
            el = angular.element(checklistHtml);

        $compile(el)($scope);

        $scope.locals = locals;

        $scope.locals.onSearch = null;

        $scope.$digest();

        rowEl = el.find('tbody tr');

        rowEl.eq(1).click();

        expect($scope.locals.selectedItems).toEqual([items[0], items[1]]);

        searchEl = el.find('input[type="text"]');
        //searchEl.text('your mother');
        searchEl.val('your mother').trigger('input');

        expect(locals.items.length).toBe(3);
    });

    it('correctly selects all within a search', function () {
        var searchEl,
            selectEl,
            rowEl,
            el = angular.element(checklistHtml),
            elScope;

        $compile(el)($scope);

        $scope.locals = locals;

        $scope.$digest();

        elScope = el.isolateScope();

        rowEl = el.find('tbody tr');

        rowEl.eq(0).click();

        expect($scope.locals.selectedItems).toEqual([]);

        searchEl = el.find('input[type="text"]');
        searchEl.val('Soft').trigger('change');

        expect($scope.locals.items.length).toBe(1);

        selectEl = el.find('button:contains("' + resources.checklist_select_all + '")');

        selectEl.eq(0).click();

        rowEl.eq(0).click();

        expect($scope.locals.selectedItems.length).toBe(1);
        expect($scope.locals.selectedItems[0].column).toBe(items[2].column);
        expect($scope.locals.selectedItems[0].description).toBe(items[2].description);

    });

    it('correctly clears all within a search', function () {
        var searchEl,
            clearEl,
            selectEl,
            rowEl,
            el = angular.element(checklistHtml),
            elScope;

        $compile(el)($scope);

        $scope.locals = locals;

        $scope.$digest();

        elScope = el.isolateScope();

        rowEl = el.find('tbody tr');

        searchEl = el.find('input[type="text"]');
        searchEl.val('Soft').trigger('change');

        expect($scope.locals.items.length).toBe(1);

        selectEl = el.find('a:contains("' + resources.checklist_select_all + '")');

        selectEl.eq(0).click();

        rowEl.eq(0).click();

        clearEl = el.find('a:contains("' + resources.checklist_clear_all + '")');

        clearEl.eq(0).click();

        expect($scope.locals.selectedItems.length).toBe(1);

        expect($scope.locals.selectedItems[0].column).toBe(items[0].column);
        expect($scope.locals.selectedItems[0].description).toBe(items[0].description);
    });

    it('should automatically filter the list of items when search text is entered and filtering is set to local', function () {
        var el,
            rowEl;

        $scope.locals = {
            items: items,
            includeSearch: true
        };

        el = $(checklistHtml);

        el.attr('bb-checklist-filter-local', '');

        $compile(el)($scope);

        el.appendTo(document.body);

        $scope.$digest();

        el.find('.bb-checklist-search-box').val('sum').change();

        rowEl = el.find('.bb-checklist-row');

        expect(rowEl.length).toBe(1);

        expect(rowEl.find('td').eq(1)).toHaveText('Constituent summary');

        el.remove();
    });

    it('should not match search text to an item\'s category', function () {
        var el,
            rowEl,
            searchTextItems;

        searchTextItems = [
            {
                title: 'a',
                description: 'b',
                category: 'z'
            },
            {
                title: 'z',
                description: 'x',
                category: 'y'
            }
        ];

        $scope.locals = {
            items: searchTextItems,
            includeSearch: true
        };

        el = $(checklistHtml);

        el.attr('bb-checklist-filter-local', '');

        $compile(el)($scope);

        el.appendTo(document.body);

        $scope.$digest();

        el.find('.bb-checklist-search-box').val('z').change();

        rowEl = el.find('.bb-checklist-row');

        // The first item should be filtered out even though the category would match the search text.
        expect(rowEl.length).toBe(1);

        el.remove();
    });

    it('should not match search text to anything other than title and description', function () {
        var el,
            rowEl,
            searchTextItems;

        searchTextItems = [
            {
                title: 'a',
                description: 'b',
                category: 'z',
                hidden: 'z'
            },
            {
                title: 'z',
                description: 'x',
                category: 'y',
                hidden: 'b'
            }
        ];

        $scope.locals = {
            items: searchTextItems,
            includeSearch: true
        };

        el = $(checklistHtml);

        el.attr('bb-checklist-filter-local', '');

        $compile(el)($scope);

        el.appendTo(document.body);

        $scope.$digest();

        el.find('.bb-checklist-search-box').val('z').change();

        rowEl = el.find('.bb-checklist-row');

        // The first item should be filtered out even though the category would match the search text.
        expect(rowEl.length).toBe(1);

        el.find('.bb-checklist-search-box').val('b').change();

        rowEl = el.find('.bb-checklist-row');

        // The second item should be filtered out even though the hidden property would match the search text.
        expect(rowEl.length).toBe(1);

        el.remove();
    });

    describe('category toolbar', function () {
        var categories,
            checklistHtml,
            itemsWithCategories;

        beforeEach(function () {
            categories = [
                'Category 1',
                'Category 2'
            ];

            itemsWithCategories = [
                {
                    title: 'Title 1',
                    description: 'Description 1',
                    category: 'Category 1'
                },
                {
                    title: 'Title 2',
                    description: 'Description 2',
                    category: 'Category 1'
                },
                {
                    title: 'Title 3',
                    description: 'Description 3',
                    category: 'Category 2'
                }
            ];

            checklistHtml =
                '<bb-checklist ' +
                    'bb-checklist-items="items" ' +
                    'bb-checklist-selected-items="selectedItems" ' +
                    'bb-checklist-search-placeholder="\'My Placeholder\'" ' +
                    'bb-checklist-no-items-message="\'No items found\'" ' +
                    'bb-checklist-mode="list" ' +
                    'bb-checklist-categories="categories" ' +
                    'bb-checklist-filter-local>' +
                '</bb-checklist>';
        });

        it('should be displayed when categories are specified', function () {
            var buttonEls,
                categoryBarEl,
                el;

            $scope.categories = categories;
            $scope.items = itemsWithCategories;

            el = $compile(checklistHtml)($scope);

            $scope.$digest();

            categoryBarEl = el.find('.bb-checklist-category-bar');

            expect(categoryBarEl).toExist();

            buttonEls = categoryBarEl.find('button');

            expect(buttonEls.length).toBe(3);

            expect(buttonEls.eq(0)).toHaveText(resources.grid_column_picker_all_categories);
            expect(buttonEls.eq(1)).toHaveText('Category 1');
            expect(buttonEls.eq(2)).toHaveText('Category 2');
        });

        it('should automatically filter the list of items when a category is clicked and filtering is set to local', function () {
            var buttonEls,
                categoryBarEl,
                el;

            function validateCategoryButton(buttonIndex, expectedItemCount) {
                var rowEls;

                buttonEls.eq(buttonIndex).click();

                $scope.$digest();

                rowEls = el.find('.bb-checklist-list-row');

                expect(rowEls.length).toBe(expectedItemCount);
            }

            $scope.categories = categories;
            $scope.items = itemsWithCategories;

            el = $compile(checklistHtml)($scope);

            // The bbCheck directive is linked in a $timeout, so this will force it to render.
            $timeout.flush();

            $scope.$digest();

            categoryBarEl = el.find('.bb-checklist-category-bar');
            buttonEls = el.find('button');

            validateCategoryButton(1, 2);
            validateCategoryButton(2, 1);
            validateCategoryButton(0, 3);
        });

        it('should not show the category filter bar when an empty list of categories is supplied', function () {
            var categoryBarEl,
                el;

            $scope.categories = [];
            $scope.items = itemsWithCategories;

            el = $compile(checklistHtml)($scope);

            // The bbCheck directive is linked in a $timeout, so this will force it to render.
            $timeout.flush();

            $scope.$digest();

            categoryBarEl = el.find('.bb-checklist-category-bar');

            expect(categoryBarEl).not.toExist();
        });

        it('should only affect filtered items when using the select all or clear all feature', function () {
            var el;

            $scope.categories = categories;
            $scope.items = itemsWithCategories;

            el = $compile(checklistHtml)($scope);

            // The bbCheck directive is linked in a $timeout, so this will force it to render.
            $timeout.flush();

            $scope.$digest();

            el.find('button').eq(1).click();

            $scope.$digest();

            el.find('.bb-checklist-select-all-bar button').eq(0).click();

            $scope.$digest();

            expect($scope.selectedItems.length).toBe(2);
        });
    });

    describe('list mode', function () {
        var checklistHtml =
            '<bb-checklist ' +
                'bb-checklist-items="items" ' +
                'bb-checklist-selected-items="selectedItems" ' +
                'bb-checklist-search-placeholder="\'My Placeholder\'" ' +
                'bb-checklist-no-items-message="\'No items found\'" ' +
                'bb-checklist-include-search="useSearch" ' +
                'bb-checklist-mode="list" ' +
                'bb-checklist-is-loading="loading" ' +
                '>' +
            '</bb-checklist>',
            testItems = [
                {
                    title: 'Title 1',
                    description: 'Description 1'
                },
                {
                    title: 'Title 2',
                    description: 'Description 2'
                }
            ];

        it('should display items in a list', function () {
            var el,
                rowEls;

            function getTitleEl(rowIndex) {
                return rowEls.eq(rowIndex).find('.bb-checklist-list-title');
            }

            function getDescriptionEl(rowIndex) {
                return rowEls.eq(rowIndex).find('.bb-checklist-list-description');
            }

            $scope.items = testItems;

            el = $compile(checklistHtml)($scope);

            $scope.$digest();

            rowEls = el.find('.bb-checklist-list-row');

            expect(rowEls.length).toBe(2);

            expect(getTitleEl(0)).toHaveText('Title 1');
            expect(getDescriptionEl(0)).toHaveText('Description 1');

            expect(getTitleEl(1)).toHaveText('Title 2');
            expect(getDescriptionEl(1)).toHaveText('Description 2');
        });

        it('should update the model when a checkbox is checked', function () {
            var el,
                checkEl;

            $scope.items = testItems;

            el = $compile(checklistHtml)($scope);
            el.appendTo(document.body);
            $scope.$digest();

            checkEl = el.find('.bb-checklist-wrapper input');
            expect(checkEl.length).toBe(2);
            checkEl.eq(0).click();

            $scope.$digest();
            checkEl = el.find('.bb-checklist-wrapper input');
            expect(checkEl.eq(0)).toBeChecked();
            expect($scope.selectedItems[0]).toEqual($scope.items[0]);
            el.remove();
        });

        it('should add the expected bbauto attributes', function () {
            var checklistItemsEl,
                el,
                rowEls;

            function validateRow(index, expectedFieldVal) {
                expect(rowEls.eq(index)).toHaveAttr('data-bbauto-field', expectedFieldVal);
            }

            $scope.items = [
                {
                    name: 'title1',
                    title: 'Title 1',
                    description: 'Description 1'
                },
                {
                    name: 'title2',
                    title: 'Title 2',
                    description: 'Description 2'
                }
            ];
            el = $compile(checklistHtml)($scope);

            $scope.$digest();

            checklistItemsEl = el.find('.bb-checklist-wrapper [data-bbauto-repeater="ChecklistItems"]');

            expect(checklistItemsEl).toExist();
            expect(checklistItemsEl).toHaveAttr('data-bbauto-repeater-count', '2');

            rowEls = el.find('.bb-checklist-list-row');

            validateRow(0, 'title1');
            validateRow(1, 'title2');
        });

        it('should show wait indication when bbChecklistIsLoading is set to true', function () {
            var el,
                beginSpy,
                endSpy;

            $scope.items = testItems;
            beginSpy = spyOn(bbWait, 'beginElWait').and.callThrough();

            el = $compile(checklistHtml)($scope);
            $scope.$digest();

            $scope.loading = true;
            $scope.$digest();

            expect(beginSpy).toHaveBeenCalled();

            endSpy = spyOn(bbWait, 'endElWait').and.callThrough();

            $scope.loading = false;
            $scope.$digest();

            expect(endSpy).toHaveBeenCalled();
        });

        it('should not mangle the list item text when the Angular bindings contain search text', function () {
            var el,
                rowEl;

            $scope.items = [
                {
                    name: 'title1',
                    title: 'Title 1',
                    description: 'Description 1'
                },
                {
                    name: 'title2',
                    title: 'Title 2',
                    description: 'Description 2'
                }
            ];

            $scope.useSearch = true;

            el = $(checklistHtml);

            el.attr('bb-checklist-filter-local', '');

            $compile(el)($scope);

            el.appendTo(document.body);

            $scope.$digest();

            el.find('.bb-checklist-search-box').val('itx').change();

            rowEl = el.find('.bb-checklist-list-row');

            expect(rowEl.length).toBe(0);

            el.find('.bb-checklist-search-box').val('i').change();

            rowEl = el.find('.bb-checklist-list-row');

            expect(rowEl.find('.bb-checklist-list-title').eq(0).text().trim()).toBe('Title 1');
            //expect(rowEl.find('td').eq(1)).toHaveText('Constituent summary');

            el.remove();
        });

        describe('picker interface', function () {
            it('should emit an event when the control is ready so selected items can be set by a parent directive', function () {
                var $childScope,
                    el;

                function getRowCheckbox(index) {
                    return el
                        .find('.bb-checklist-list-row')
                        .eq(index)
                        .find('.bb-checklist-list-col-checkbox input');
                }

                $childScope = $scope.$new();

                $childScope.items = testItems;

                $scope.$on('bbPickerReady', function (e, args) {
                    args.setSelectedItems([testItems[1]]);
                });

                el = $compile(checklistHtml)($childScope);

                $childScope.$digest();

                expect(getRowCheckbox(0)).not.toBeChecked();
                expect(getRowCheckbox(1)).toBeChecked();
            });
        });

        describe('single-select style', function () {
            it('should display a series of options without checkboxes', function () {
                var el,
                    firstRowEl,
                    rowEls;

                $scope.items = testItems;

                el = $(checklistHtml);
                el.attr('bb-checklist-select-style', 'single');

                $compile(el)($scope);

                $scope.$digest();

                rowEls = el.find('button.bb-checklist-list-row');

                expect(rowEls.length).toBe(2);

                firstRowEl = rowEls.eq(0);

                expect(firstRowEl.find('.bb-checklist-list-title')).toHaveText('Title 1');
                expect(firstRowEl.find('.bb-checklist-list-description')).toHaveText('Description 1');
            });

            describe('picker interface', function () {
                it('should emit an event when an item is selected so parent scopes can respond', function () {
                    var $childScope,
                        el,
                        eventEmitted;

                    $childScope = $scope.$new();

                    $childScope.items = testItems;

                    el = $(checklistHtml);
                    el.attr('bb-checklist-select-style', 'single');

                    $compile(el)($childScope);

                    el.appendTo(document.body);

                    $childScope.$digest();

                    $scope.$on('bbPickerSelected', function (e, args) {
                        eventEmitted = true;

                        expect(args.selectedItems).toEqual([$childScope.items[1]]);
                    });

                    el.find('button.bb-checklist-list-row').eq(1).click();

                    expect(eventEmitted).toBe(true);

                    el.remove();
                });
            });
        });
    });
});
