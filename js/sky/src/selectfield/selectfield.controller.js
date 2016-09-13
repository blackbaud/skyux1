/*global angular */

(function () {
    'use strict';

    function BBSelectFieldController($scope, bbChecklistUtility, bbFormat, bbResources, $filter) {
        var vm = this;

        vm.getFieldInclude = function () {
            var fieldStyle = vm.bbSelectFieldStyle;

            if (fieldStyle !== 'single') {
                fieldStyle = 'multiple';
            }

            return 'sky/templates/selectfield/selectfield' + fieldStyle + '.include.html';
        };

        /* Begin "public" API methods (called by child directives) */
        vm.setPicker = function (picker) {
            vm.picker = picker;
        };

        vm.getSelectedItems = function () {
            var selectedItems = vm.bbSelectFieldSelectedItems;

            // Make a copy of the array so that changes the user makes before confirming the dialog
            // don't make their way back up to the parent scope.
            return angular.isArray(selectedItems) ? selectedItems.slice() : [];
        };

        vm.setSelectedItems = function (selectedItems) {
            vm.bbSelectFieldSelectedItems = selectedItems;
        };

        vm.selectFieldClick = function () {
            if (vm.picker) {
                vm.picker.open();
            }
        };

        vm.getSummaryCountText = function () {
            var selectedItems = vm.bbSelectFieldSelectedItems,
                formattedCount;

            /*istanbul ignore else */
            /* sanity check */
            if (angular.isArray(selectedItems)) {

                formattedCount = $filter('bbAutonumeric')(selectedItems.length, 'number', true);
                return bbFormat.formatText(bbResources.selectfield_summary_text, formattedCount);
            }
        };

        function clearField($event) {
            $event.stopPropagation();
            $event.preventDefault();
            vm.bbSelectFieldSelectedItems = [];
            if (angular.isFunction(vm.setModelTouched)) {
                vm.setModelTouched();
            }
            
        }

        vm.clearField = clearField;

        vm.removeAll = function () {
            vm.bbSelectFieldSelectedItems = [];
        };

        vm.remove = function (item) {
            bbChecklistUtility.remove(vm.bbSelectFieldSelectedItems, item);
        };
        /* End "public" API methods (called by child directives) */
    }

    BBSelectFieldController.$inject = ['$scope', 'bbChecklistUtility', 'bbFormat', 'bbResources', '$filter'];

    angular.module('sky.selectfield.controller', ['sky.autonumeric', 'sky.checklist.utility'])
        .controller('BBSelectFieldController', BBSelectFieldController);

}());
