/*global angular */

(function () {
    'use strict';

    function bbChecklistColumn() {
        return {
            require: ['bbChecklistColumn', '^bbChecklistColumns'],
            restrict: 'E',
            bindToController: {
                bbChecklistColumnCaption: "=",
                bbChecklistColumnField: "=",
                bbChecklistColumnClass: "=",
                bbChecklistColumnWidth: "=",
                bbChecklistColumnAutomationId: "="
            },
            controller: function () {},
            controllerAs: 'bbChecklistColumn',
            scope: {},
            link: function ($scope, element, attrs, ctrls) {
                var bbChecklistColumns = ctrls[1],
                    column,
                    vm = ctrls[0];

                column = {
                    caption: vm.bbChecklistColumnCaption,
                    field: vm.bbChecklistColumnField,
                    'class': vm.bbChecklistColumnClass,
                    width: vm.bbChecklistColumnWidth,
                    automationId: vm.bbChecklistColumnAutomationId
                };

                bbChecklistColumns.addColumn(column);
            }
        };
    }

    angular.module('sky.checklist.column.directive', ['sky.checklist.columns.directive'])
        .directive('bbChecklistColumn', bbChecklistColumn);
}());
