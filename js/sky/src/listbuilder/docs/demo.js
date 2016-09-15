/*global angular */
(function () {
    'use strict';

    function ListbuilderFilterController($uibModalInstance, filters) {
        var self = this;

        function clearAllFilters() {
            self.filters = {
                fruitType: 'any'
            };
        }

        function applyFilters() {
            $uibModalInstance.close(self.filters);
        }


        if (!filters) {
            clearAllFilters();
        } else {
            self.filters = filters;
        }

        if (angular.isUndefined(self.filters.fruitType)) {
            self.filters.fruitType = 'any';
        }

        self.clearAllFilters = clearAllFilters;
        self.applyFilters = applyFilters;

    }

    ListbuilderFilterController.$inject = ['$uibModalInstance', 'filters'];
    
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
                    filters: function () {
                        return angular.copy(self.appliedFilters);
                    }
                }
            }).result
                .then(function (result) {
                    self.appliedFilters = angular.copy(result);
                });
        }

        self.onSearch = onSearch;
        self.onLoadMore = onLoadMore;
        self.onAddClick = onAddClick;

        data = createData(5);
        self.data = data;
        
        
    }

    ListbuilderTestController.$inject = ['$timeout', 'bbModal'];
    
    angular
        .module('stache')
        .controller('ListbuilderTestController', ListbuilderTestController)
        .controller('ListbuilderFilterController', ListbuilderFilterController);
}());