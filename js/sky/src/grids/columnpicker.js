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
        a = a.title.toLocaleLowerCase();
        b = b.title.toLocaleLowerCase();

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

    function BBGridColumnPickerController($scope, availableColumns, initialSelectedColumnIds, columnPickerHelpKey, listMode, subsetLabel, subsetProperty, subsetExclude, onlySelected) {
        var columns = [],
            initialSelectedColumns;

        angular.forEach(availableColumns, function (column) {
            var newColumn = {
                id: column.id,
                name: column.name,
                title: column.caption,
                category: column.category,
                description: column.description
            };

            if (subsetProperty) {
                newColumn[subsetProperty] = column[subsetProperty];
            }

            columns.push(newColumn);
        });

        initialSelectedColumns = getInitialSelectedColumns(columns, initialSelectedColumnIds);

        columns.sort(columnCompare);

        $scope.columns = columns;
        $scope.categories = buildCategoryList(columns);
        $scope.locals = {};
        $scope.locals.selectedColumns = initialSelectedColumns.slice(0);
        $scope.locals.subsetLabel = subsetLabel;
        $scope.locals.subsetProperty = subsetProperty;

        if (subsetExclude) {
            $scope.locals.subsetExclude = subsetExclude;
        }

        if (onlySelected) {
            $scope.locals.onlySelected = onlySelected;
        }


        $scope.columnPickerHelpKey = columnPickerHelpKey;
        $scope.listMode = listMode;

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

    BBGridColumnPickerController.$inject = ['$scope', 'columns', 'selectedColumnIds', 'columnPickerHelpKey', 'listMode', 'subsetLabel', 'subsetProperty', 'subsetExclude', 'onlySelected'];

    angular.module('sky.grids.columnpicker', ['sky.checklist', 'sky.resources'])
        .controller('BBGridColumnPickerController', BBGridColumnPickerController);
}());
