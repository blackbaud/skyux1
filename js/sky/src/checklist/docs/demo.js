/* global angular */

(function () {
    'use strict';

    function ChecklistTestController() {
        var items,
            listItems,
            listItemsSingle,
            self = this;

        function loadItems(searchText) {
            var filteredItems = [],
                i;

            for (i = 0; i < items.length; i++) {
                if (!searchText || items[i].column.toLowerCase().indexOf(searchText.toLowerCase()) >= 0 || items[i].description.toLowerCase().indexOf(searchText.toLowerCase()) >= 0) {
                    filteredItems.push({ column: items[i].column, description: items[i].description });
                }
            }

            self.items = filteredItems;
        }

        items = [
            { column: 'Constituent summary', description: 'Summary information about the constituent who gave the gift' },
            { column: 'Soft credits', description: 'Soft credits for the gift' },
            { column: 'Amount', description: 'Amount of the gift' }
        ];

        listItems = [
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

        listItemsSingle = listItems.slice();

        self.selectedItems = [];
        self.includeSearch = true;
        self.listItems = listItems;
        self.listItemsSingle = listItemsSingle;

        self.onSearch = function (args) {
            loadItems(args.searchText);
        };

        loadItems();
    }

    angular.module('stache')
      .controller('ChecklistTestController', ChecklistTestController);

}());
