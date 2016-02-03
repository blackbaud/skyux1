/*global angular */

(function () {
    'use strict';

    function SelectFieldTestController(bbModal) {
        var vm = this;

        vm.selectedItems = [
            {
                title: 'Constituent summary',
                description: 'Summary information about the constituent who gave the gift',
                category: 'Constituent'
            }
        ];

        vm.fieldClick = function () {
            var modalInstance = bbModal.open({
                controller: 'SelectFieldPickerTestController as pickerCtrl',
                templateUrl: 'demo/selectfield/selectfieldpicker.html',
                resolve: {
                    selectedItems: function () {
                        return vm.selectedItems;
                    },
                    selectedItemsChange: function () {
                        return function (items) {
                            vm.selectedItems = items;
                        };
                    }
                }
            });
        };
    }

    SelectFieldTestController.$inject = ['bbModal'];

    function SelectFieldPickerTestController($uibModalInstance, selectedItems, selectedItemsChange) {
        var vm = this;

        vm.listItems = [
            {
                title: 'Constituent summary',
                description: 'Summary information about the constituent who gave the gift',
                category: 'Constituent'
            },
            {
                title: 'Soft credits',
                description: 'Soft credits for the gift',
                category: 'Giving'
            },
            {
                title: 'Amount',
                description: 'Amount of the gift',
                category: 'Giving'
            },
            {
                title: 'Sweatshirt',
                description: 'This column has nothing to do with the other ones',
                category: 'Miscellaneous'
            }
        ];

        vm.selectedListItems = selectedItems.slice();

        vm.save = function () {
            selectedItemsChange(vm.selectedListItems);
            $uibModalInstance.close();
        }
    }

    SelectFieldPickerTestController.$inject = ['$uibModalInstance', 'selectedItems', 'selectedItemsChange'];

    angular.module('stache')
        .controller('SelectFieldTestController', SelectFieldTestController)
        .controller('SelectFieldPickerTestController', SelectFieldPickerTestController);
}());
