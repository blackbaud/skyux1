/*global angular */

(function () {
    'use strict';

    function SelectFieldTestController() {
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
            },
            {
                title: 'Item 1',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 2',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            }
        ];

        vm.selectedItems = vm.listItems.slice(0, 2);
        vm.selectedSingleItems = [vm.listItems[1]];
    }

    angular.module('stache')
        .controller('SelectFieldTestController', SelectFieldTestController);
}());
