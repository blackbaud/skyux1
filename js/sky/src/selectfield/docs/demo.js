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
            }
        ];

        vm.selectedItems = [vm.listItems[1]];
    }
    
    angular.module('stache')
        .controller('SelectFieldTestController', SelectFieldTestController);
}());
