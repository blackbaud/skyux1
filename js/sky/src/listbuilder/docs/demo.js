/*global angular */
(function () {
    'use strict';

    function ListbuilderFilterController($uibModalInstance, existingFilters) {
        var self = this;

        function clearAllFilters() {
            self.filters = {
                tenYears: false,
                onlyUnpaid: false
            };
        }
        
        function transformFiltersToArray(filters) {
            var result = [];

            if (filters.tenYears) {
                result.push({name: 'tenYears', value: true, label: 'members with ten years'});
            }

            if (filters.onlyUnpaid) {
                result.push({name: 'onlyUnpaid', value: true, label: 'unpaid members'});
            }

            return result;
        }

        function transformArrayToFilters(array) {
            var i,
                filters = {};

            for (i = 0; i < array.length; i++) {
                filters[array[i].name] = array[i].value;
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

        self.clearAllFilters = clearAllFilters;
        self.applyFilters = applyFilters;

    }

    ListbuilderFilterController.$inject = ['$uibModalInstance', 'existingFilters'];
    
    function ListbuilderTestController($timeout, bbModal) {
        var self = this,
            sortProperty,
            sortDescending,
            maxRecordsShown,
            dataSet = [
                {
                    name: 'Tim Duggy',
                    occupation: 'Software Engineer',
                    joinDate: new Date('1/1/2016'),
                    duesPaid: false
                },
                {
                    name: 'Janet Smith',
                    occupation: 'Accountant',
                    joinDate: new Date('2/23/2006'),
                    duesPaid: true
                },
                {
                    name: 'James Wheeler',
                    occupation: 'Marketing Director',
                    joinDate: new Date('4/12/2013'),
                    duesPaid: true
                },
                {
                    name: 'Jarod Douglas',
                    occupation: 'Real Estate Agent',
                    joinDate: new Date('12/12/2012'),
                    duesPaid: false
                },
                {
                    name: 'Sarah Silver',
                    occupation: 'Software Engineer',
                    joinDate: new Date('11/7/1999'),
                    duesPaid: true
                },
                {
                    name: 'Tina Maller',
                    occupation: 'Sales',
                    joinDate: new Date('3/5/2016'),
                    duesPaid: true
                },
                {
                    name: 'Megan Johnson',
                    occupation: 'Manager',
                    joinDate: new Date('1/1/2013'),
                    duesPaid: true
                },
                {
                    name: 'Reed Sawyer',
                    occupation: 'Accountant',
                    joinDate: new Date('3/9/2006'),
                    duesPaid: true
                },
                {
                    name: 'James Dunn',
                    occupation: 'Auto Technician',
                    joinDate: new Date('6/12/2015'),
                    duesPaid: false
                },
                {
                    name: 'Douglas Herman',
                    occupation: 'Lawyer',
                    joinDate: new Date('3/1/2012'),
                    duesPaid: true
                },
                {
                    name: 'Helen Walker',
                    occupation: 'Software Consultant',
                    joinDate: new Date('4/7/2007'),
                    duesPaid: true
                },
                {
                    name: 'Christopher Lewen',
                    occupation: 'Sales',
                    joinDate: new Date('5/26/2016'),
                    duesPaid: true
                }
            ];

        function getData(top, skip) {
            var i,
                newData = [];
            
            for (i = 0; i < top && dataSet.length - 1 > skip + i; i++) {
                newData.push(dataSet[skip + i]);
            }
            return newData;
        }

        function searchArray(searchText, array) {
            var filteredData;
            if (searchText) {
                filteredData = array.filter(function (item) {
                    var property;
                    for (property in item) {
                        if (item.hasOwnProperty(property) && (property === 'name' || property === 'occupation')) {
                            if (item[property].indexOf(searchText) > -1) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
                return filteredData;
            }
            return array;
            
        }

        function onSearch(searchText) {
            return $timeout(function () {
                var searchedData
                self.searchText = searchText;
                searchedData = searchArray(searchText, dataSet);
                
                self.data = searchedData.slice(0, maxRecordsShown);
                
            }, 1000);
        }

        function filter(array, filters) {
            var i,
                item,
                newData = angular.copy(array);
            if (angular.isDefined(filters) &&  filters.length > 0) {
                for (i = 0; i < filters.length; i++) {
                    item = filters[i];
                    if (item.name === 'tenYears') {
                        newData = newData.filter(function (filterObj) {
                            console.log('now year: ', new Date().getFullYear());
                            console.log('filtered year: ', filterObj.joinDate.getFullYear());
                            return new Date().getFullYear() - filterObj.joinDate.getFullYear() >= 10;
                        });
                    }
                    if (item.name === 'onlyUnpaid') {
                        newData = newData.filter(function (filterObj) {
                            return filterObj.duesPaid === false;
                        });
                    }
                }
                return newData;
            } else {
                return array;
            }
        }

        function sortArray(sortProperty, sortDescending, array) {
            return array.sort(function (a, b) {
                var descending = sortDescending ? -1 : 1;

                if (a[sortProperty] > b[sortProperty]) {
                    return (descending);
                } else if (a[sortProperty] < b[sortProperty]) {
                    return (-1 * descending);
                } else {
                    return 0;
                }
            });

        }

        function sortItems(item) {
            sortProperty = item.name;
            sortDescending = item.descending;
            self.data = sortArray(item.name, item.descending, self.data);
        }

        self.sortItems = sortItems;

        function onLoadMore() {
            return $timeout(function () {
                var newData = getData(6, 6);
                
                maxRecordsShown = 12;
                self.data = self.data.concat(newData);
                onSearch(self.searchText);
                self.hasMoreData = false;
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
                    self.data = filter(dataSet, self.appliedFilters);
                });
        }

        self.onFilterClick = onFilterClick;

        self.onSearch = onSearch;
        self.onLoadMore = onLoadMore;
        self.onAddClick = onAddClick;
        self.hasMoreData = true;

        self.data = getData(6, 0);

        maxRecordsShown = self.data.length

        self.sortOptions = [
            {
                id: 1,
                label: 'Name (A - Z)',
                name: 'name',
                descending: false
            },
            {
                id: 2,
                label: 'Name (Z - A)',
                name: 'name',
                descending: true
            },
            {
                id: 3,
                label: 'Date joined (newest first)',
                name: 'joinDate',
                descending: true
            },
            {
                id: 4,
                label: 'Date joined (oldest first)',
                name: 'joinDate',
                descending: false
            },
            {
                id: 5,
                label: 'Occupation (A - Z)',
                name: 'occupation',
                descending: false
            },
            {
                id: 6,
                label: 'Occupation (Z - A)',
                name: 'occupation',
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