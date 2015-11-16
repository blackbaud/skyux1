/*global angular */

(function () {
    'use strict';
    angular.module('screenshots', ['sky'])
    .controller('ChecklistTestController', ['$scope', function ($scope) {
        var items,
            listItems;
        
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
        
        $scope.locals = {
            selectedListItems: [listItems[1]],
            selectedItems: [items[0]],
            onSearch: function () {
                angular.noop();
            },
            listItems: listItems,
            items: items
        };
    }]);
}());