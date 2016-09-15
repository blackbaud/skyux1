/*global angular */

(function () {
    'use strict';

    function SelectFieldTestController($timeout) {
        var vm = this,
            searchableItems,
            searchTimeout;

        function loadInitialValues() {
            vm.listItems = searchableItems.slice(0, 6);
        }

        function loadItems(searchText) {
            var filteredItems = [],
                i;

            if (!searchText) {
                loadInitialValues();
            } else {
                for (i = 0; i < searchableItems.length; i++) {
                    if (!searchText || searchableItems[i].title.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || searchableItems[i].description.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
                        filteredItems.push({ title: searchableItems[i].title, description: searchableItems[i].description, category: searchableItems[i].category });
                    }
                }

                vm.listItems = filteredItems;
            }
        }

        /*  If you do not wish to retrieve all the records for the select field at once,
            you can provide a search function that can fetch items remotely */
        vm.onSearch = function (args) {
            vm.loadingSearch = true;

            if (searchTimeout) {
                $timeout.cancel(searchTimeout);
            }

            searchTimeout = $timeout(function () {
                loadItems(args.searchText);
                vm.loadingSearch = false;
            }, 2000);
        };

        vm.loadInitialValues = loadInitialValues;

        searchableItems = [
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
            },
            {
                title: 'Item 1a',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 1b',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 1c',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 1d',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 1e',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 1f',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 1g',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 1h',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 1i',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 1j',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            },
            {
                title: 'Item 1k',
                description: 'This makes the list longer',
                category: 'Miscellaneous'
            }

        ];

        loadInitialValues();

        vm.selectedItems = vm.listItems.slice(0, 2);

        vm.listItemsSingle = angular.copy(vm.listItems);
        vm.selectedSingleItems = [vm.listItemsSingle[1]];
    }

    SelectFieldTestController.$inject = ['$timeout'];

    angular.module('stache')
        .controller('SelectFieldTestController', SelectFieldTestController);
})();
