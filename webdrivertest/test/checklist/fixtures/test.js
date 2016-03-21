/*global angular */

(function () {
    'use strict';
    angular.module('screenshots', ['sky'])
    .controller('ChecklistTestController', ['$scope', function ($scope) {
        var items,
            listItems,
            listItemsSingle;

        items = [
            { column: 'Constituent summary', description: 'Summary information about the constituent who gave the gift' },
            { column: 'Soft credits', description: 'Soft credits for the gift' },
            { column: 'Amount', description: 'Amount of the gift' }
        ];

        listItems = [
            {
                title: 'Constituent summary and a really long title that can be seen through the lense of everyone in the world it does not make sense, but it does not have to make sense it merely is and shall be',
                description: 'Summary information about the constituent who gave the gift and a really really reeeeeeeealy long description. As long as a winding river in the great outdoor expanse of life. Longer even, because I needed some new words to get another line break.',
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

        $scope.locals = {
            selectedListItems: [listItems[1]],
            selectedItems: [items[0]],
            selectedSingleItem: [listItems[0]],
            onSearch: function () {
                angular.noop();
            },
            listItems: listItems,
            listItemsSingle: listItemsSingle,
            items: items
        };
    }]);
}());
