/*global angular */

(function () {
    'use strict';

    function bbChecklistColumns() {
        function link($scope, element, attrs, ctrls) {
            var bbChecklist = ctrls[1],
                vm = ctrls[0];

            bbChecklist.setColumns(vm.columns);
        }

        return {
            require: ['bbChecklistColumns', '^bbChecklist'],
            restrict: 'E',
            scope: {},
            bindToController: {},
            controller: 'BBChecklistColumnsController',
            controllerAs: 'bbChecklistColumns',
            link: link
        };
    }

    angular.module('sky.checklist.columns.directive', ['sky.checklist.columns.controller'])
        .directive('bbChecklistColumns', bbChecklistColumns);
}());
