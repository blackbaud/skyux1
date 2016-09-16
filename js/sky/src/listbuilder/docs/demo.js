/*global angular */
(function () {
    'use strict';

    function ListbuilderFilterController($uibModalInstance, existingFilters) {
        var self = this;

        function clearAllFilters() {
            self.filters = {
                fruitType: 'any'
            };
        }
        
        function transformFiltersToArray(filters) {
            var result = [];

            if (filters.fruitType && filters.fruitType !== 'any') {
                result.push({name: 'fruitType', value: filters.fruitType, label: filters.fruitType});
            }

            if (filters.hideOrange) {
                result.push({name: 'hideOrange', value: true, label: 'hide orange fruits'});
            }

            return result;
        }

        function transformArrayToFilters(array) {
            var i,
                filters = {};

            for (i = 0; i < array.length; i++) {
                if (array[i].name === 'fruitType') {
                    filters.fruitType = array[i].value;
                }

                if (array[i].name === 'hideOrange') {
                    filters.hideOrange = array[i].value;
                }
            }

            return filters;
        }

        function applyFilters() {
            var result = transformFiltersToArray(self.filters);
            $uibModalInstance.close(result);
        }


        if (!existingFilters) {
            clearAllFilters();
        } else {
            self.filters = transformArrayToFilters(existingFilters);
        }

        if (angular.isUndefined(self.filters.fruitType)) {
            self.filters.fruitType = 'any';
        }

        self.clearAllFilters = clearAllFilters;
        self.applyFilters = applyFilters;

    }

    ListbuilderFilterController.$inject = ['$uibModalInstance', 'existingFilters'];
    
    function ListbuilderTestController($timeout, bbModal) {
        var self = this,
            contentCount = 1,
            data;

        function createData(amount) {
            var i,
                newData = [];

            for (i = 0; i < amount; i++) {
                newData.push(
                    {
                        name: (contentCount + ' Title'),
                        content: (contentCount + ' Content')
                    }
                );
                contentCount++;
            }
            return newData;
        }

        function onSearch(searchText) {
            return $timeout(function () {
                var filteredData = data;
                self.searchText = searchText;
                if (searchText) {
                    filteredData = data.filter(function (item) {
                        var property;
                        for (property in item) {
                            if (item.hasOwnProperty(property) && (property === 'name' || property === 'content')) {
                                if (item[property].indexOf(searchText) > -1) {
                                    return true;
                                }
                            }
                        }
                        return false;
                    });
                

                }
                self.data = filteredData;
            }, 1000);
        }

        function onLoadMore() {
            return $timeout(function () {
                var newData = createData(5);

                data = data.concat(newData);
                self.data = data;
                onSearch(self.searchText);
            }, 4000);
            
        }

        function onAddClick() {
            alert('Add button clicked');
        }

        function onFilterClick() {
            bbModal.open({
                controller: 'ListbuilderFilterController as filterCtrl',
                templateUrl: 'demo/listbuilder/filters.html',
                resolve: {
                    existingFilters: function () {
                        return angular.copy(self.appliedFilters);
                    }
                }
            }).result
                .then(function (result) {
                    self.appliedFilters = angular.copy(result);
                });
        }

        self.onFilterClick = onFilterClick;

        self.onSearch = onSearch;
        self.onLoadMore = onLoadMore;
        self.onAddClick = onAddClick;

        data = createData(5);
        self.data = data;

        self.sortOptions = [
            {
                id: 1,
                label: 'Assigned to (A - Z)',
                name: 'assignee',
                descending: false
            },
            {
                id: 2,
                label: 'Assigned to (Z - A)',
                name: 'assignee',
                descending: true
            },
            {
                id: 3,
                label: 'Date created (newest first)',
                name: 'date',
                descending: true
            },
            {
                id: 4,
                label: 'Date created (oldest first)',
                name: 'date',
                descending: false
            },
            {
                id: 5,
                label: 'Note title (A - Z)',
                name: 'title',
                descending: false
            },
            {
                id: 6,
                label: 'Note title (Z - A)',
                name: 'title',
                descending: true
            }
        ];

        self.initialState = self.sortOptions[4].id;
        
        
    }

    ListbuilderTestController.$inject = ['$timeout', 'bbModal'];
    
    angular
        .module('stache')
        .controller('ListbuilderTestController', ListbuilderTestController)
        .controller('ListbuilderFilterController', ListbuilderFilterController);
}());