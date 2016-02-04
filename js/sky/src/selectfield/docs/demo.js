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

    function SelectFieldPickerTestController($scope, $uibModalInstance, selectedItems, selectedItemsChange) {
        var initialLoad = true,
            vm = this;

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

        $scope.$watchCollection(function () {
            return vm.selectedListItems;
        }, function () {
            if (!initialLoad && vm.selectedListItems.length > 0) {
                selectedItemsChange(vm.selectedListItems);
                $uibModalInstance.close();
            }

            initialLoad = false;
        });
    }

    SelectFieldPickerTestController.$inject = ['$scope', '$uibModalInstance', 'selectedItems', 'selectedItemsChange'];

    angular.module('stache')
        .controller('SelectFieldTestController', SelectFieldTestController)
        .controller('SelectFieldPickerTestController', SelectFieldPickerTestController);
}());
