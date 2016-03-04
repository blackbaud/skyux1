/*global angular */

(function () {
    'use strict';

    function BBChecklistColumnsController() {
        var vm = this;

        vm.columns = [];

        vm.addColumn = function (column) {
            vm.columns.push(column);
        };
    }

    angular.module('sky.checklist.columns.controller', [])
        .controller('BBChecklistColumnsController', BBChecklistColumnsController);
}());
