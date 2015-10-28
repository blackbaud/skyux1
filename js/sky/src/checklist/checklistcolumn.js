/*global angular */

(function () {
    'use strict';

    function bbChecklistColumn() {
        return {
            require: '^bbChecklistColumns',
            restrict: 'E',
            scope: {
                bbChecklistColumnCaption: "=",
                bbChecklistColumnField: "=",
                bbChecklistColumnClass: "=",
                bbChecklistColumnWidth: "=",
                bbChecklistColumnAutomationId: "="
            },
            link: function ($scope, element, attrs, bbChecklistColumns) {
                /*jslint unparam: true */
                var column = {
                    caption: $scope.bbChecklistColumnCaption,
                    field: $scope.bbChecklistColumnField,
                    'class': $scope.bbChecklistColumnClass,
                    width: $scope.bbChecklistColumnWidth,
                    automationId: $scope.bbChecklistColumnAutomationId
                };

                bbChecklistColumns.addColumn(column);
            }
        };
    }
    
    angular.module('sky.checklist.column', ['sky.checklist.columns'])
        .directive('bbChecklistColumn', bbChecklistColumn);
}());