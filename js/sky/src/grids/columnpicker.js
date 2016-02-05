/*jslint browser: false, plusplus: true */
/*global angular */

(function () {
    'use strict';

    function buildCategoryList(columns) {
        var categories = [],
            column,
            index,
            len;

        len = columns.length;

        for (index = 0; index < len; index++) {
            column = columns[index];

            if (column.category) {
                if (categories.indexOf(column.category) === -1) {
                    categories.push(column.category);
                }
            }
        }

        return categories;
    }


    function columnCompare(a, b) {
        a = a.caption.toLocaleLowerCase();
        b = b.caption.toLocaleLowerCase();

        if (a < b) {
            return -1;
        }

        if (a > b) {
            return 1;
        }

        return 0;
    }
    
    function getInitialSelectedColumns(columns, selectedIds) {
        var selectedColumns = [];
        
        angular.forEach(columns, function (column) {
            if (selectedIds.indexOf(column.id) >= 0) {
                selectedColumns.push(column);
            }
        });
        
        return selectedColumns;
    }
    
    function translateColumnsToChecklistObjects(columns) {
        var translatedColumns = [];
        angular.forEach(columns, function (column) {
            translatedColumns.push({
                id: column.id,
                name: column.name,
                title: column.caption,
                category: column.category,
                description: column.description
            });
        });
        return translatedColumns;
    }

    function BBGridColumnPickerController($scope, availableColumns, initialSelectedColumnIds, columnPickerHelpKey, listMode, colPickerSearchProperties) {
        var columns,
            initialSelectedColumns;
        
        columns = angular.copy(availableColumns);
        columns.sort(columnCompare);
        $scope.initialColumns = columns;
        columns = translateColumnsToChecklistObjects(columns);        
        initialSelectedColumns = getInitialSelectedColumns(columns, initialSelectedColumnIds);

        $scope.columns = columns;
        $scope.categories = buildCategoryList(columns);
        $scope.locals = {};
        $scope.locals.selectedColumns = initialSelectedColumns.slice(0);
        $scope.columnPickerHelpKey = columnPickerHelpKey;
        $scope.listMode = listMode;
        if (colPickerSearchProperties) {
            $scope.colPickerSearchProperties = colPickerSearchProperties;
            $scope.searchCallback = function (args) {
                var i,
                    j, 
                    n,
                    m, 
                    p,
                    val,
                    item, 
                    items = $scope.initialColumns,
                    filteredItems = [],
                    searchTextUpper = angular.isString(args.searchText) ? args.searchText.toUpperCase() : '';
                for (i = 0, n = items.length; i < n; i++) {
                    item = items[i];
                        
                    if (!args.category || item.category === args.category) {
                        if (!searchTextUpper) {
                            filteredItems.push(item);
                        } else {
                            for (j = 0, m = $scope.colPickerSearchProperties.length; j < m; j++) {
                                p = $scope.colPickerSearchProperties[j];
                                if (item.hasOwnProperty(p)) {
                                    val = item[p];

                                    if (angular.isString(val) && val.toUpperCase().indexOf(searchTextUpper) >= 0) {
                                        filteredItems.push(item);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
                
                $scope.columns = translateColumnsToChecklistObjects(filteredItems); 
            };
        }
        
        $scope.applyChanges = function () {
            var column,
                scopeColumns = $scope.columns,
                selectedColumns = $scope.locals.selectedColumns,
                columnIds = [],
                i;
            
            //Loop through previously selected columns.  If they are still selected, add
            //them to the resulting list in their original order.
            angular.forEach(initialSelectedColumnIds, function (columnId) {
                for (i = 0; i < scopeColumns.length; i++) {
                    column = scopeColumns[i];

                    if (column.id === columnId) {
                        if (selectedColumns.indexOf(column) >= 0) {
                            columnIds.push(column.id);
                        }
                        break;
                    }
                }
            });

            //Loop through all columns.  If they are selected and not already in the list
            //then add them to the end.
            angular.forEach(selectedColumns, function (column) {
                var id = column.id;
                
                if (columnIds.indexOf(id) < 0) {
                    columnIds.push(id);
                }
            });

            $scope.$close(columnIds);
        };
    }
    
    BBGridColumnPickerController.$inject = ['$scope', 'columns', 'selectedColumnIds', 'columnPickerHelpKey', 'listMode', 'colPickerSearchProperties'];

    angular.module('sky.grids.columnpicker', ['sky.checklist', 'sky.resources'])
        .controller('BBGridColumnPickerController', BBGridColumnPickerController);
}());