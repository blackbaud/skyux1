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
            maxRecordsShown = 0,
            nextSkip = 0,
            nextTop = 6,
            dataSet = [
                {
                    id: 0,
                    name: 'Tim Duggy',
                    occupation: 'Software Engineer',
                    joinDate: new Date('1/1/2016'),
                    duesPaid: false
                },
                {
                    id: 1,
                    name: 'Janet Smith',
                    occupation: 'Accountant',
                    joinDate: new Date('2/23/2006'),
                    duesPaid: true
                },
                {
                    id: 2,
                    name: 'James Wheeler',
                    occupation: 'Marketing Director',
                    joinDate: new Date('4/12/2013'),
                    duesPaid: true
                },
                {
                    id: 3,
                    name: 'Jarod Douglas',
                    occupation: 'Real Estate Agent',
                    joinDate: new Date('12/12/2012'),
                    duesPaid: false
                },
                {
                    id: 4,
                    name: 'Sarah Silver',
                    occupation: 'Software Engineer',
                    joinDate: new Date('11/7/1999'),
                    duesPaid: true
                },
                {
                    id: 5,
                    name: 'Tina Maller',
                    occupation: 'Sales',
                    joinDate: new Date('3/5/2016'),
                    duesPaid: true
                },
                {
                    id: 6,
                    name: 'Megan Johnson',
                    occupation: 'Manager',
                    joinDate: new Date('1/1/2013'),
                    duesPaid: true
                },
                {
                    id: 7,
                    name: 'Reed Sawyer',
                    occupation: 'Accountant',
                    joinDate: new Date('3/9/2006'),
                    duesPaid: true
                },
                {
                    id: 8, 
                    name: 'James Dunn',
                    occupation: 'Auto Technician',
                    joinDate: new Date('6/12/2015'),
                    duesPaid: false
                },
                {
                    id: 9,
                    name: 'Douglas Herman',
                    occupation: 'Lawyer',
                    joinDate: new Date('3/1/2012'),
                    duesPaid: true
                },
                {
                    id: 10,
                    name: 'Helen Walker',
                    occupation: 'Software Consultant',
                    joinDate: new Date('4/7/2007'),
                    duesPaid: true
                },
                {
                    id: 11,
                    name: 'Christopher Lewen',
                    occupation: 'Sales',
                    joinDate: new Date('5/26/2016'),
                    duesPaid: true
                }
            ];

        function getData(top, skip) {
            var i,
                newData = [];
            
            for (i = 0; i < top && dataSet.length > skip + i; i++) {
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

        function filter(array, filters) {
            var i,
                item,
                newData = angular.copy(array);
            if (angular.isDefined(filters) &&  filters.length > 0) {
                for (i = 0; i < filters.length; i++) {
                    item = filters[i];
                    if (item.name === 'tenYears') {
                        newData = newData.filter(function (filterObj) {
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
            if (sortProperty) {
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
            } else {
                return array;
            }
            
        }

        function getItemById(id, array) {
            var i,
                length = array.length;

            for (i = 0; i < length; i++) {
                if (array[i].id === id) {
                    return array[i];
                }
            }
        }

        function applyMultiselectOptions(array, onlyShowSelected, selectedIds) {
            var length = selectedIds.length,
                item,
                newData = [],
                i;

            for (i = 0; i < length; i++) {
                item = getItemById(selectedIds[i], array);
                if (item) {
                    item.selected = true;
                    if (onlyShowSelected) {
                        newData.push(item);
                    }
                }
                
            }

            if (onlyShowSelected) {
                return newData;
            } else {
                return array;
            }
        }

        function applySearchFilterSort(searchText, filters, sortProperty, sortDescending, maxData, showOnlySelected) {
            var filteredData;
            filteredData = searchArray(searchText, dataSet);
            filteredData = filter(filteredData, filters);
            filteredData = applyMultiselectOptions(filteredData, showOnlySelected, self.selectedIds);
            filteredData = sortArray(sortProperty, sortDescending, filteredData);

            self.data = filteredData.slice(0, maxData);
            self.hasMoreData = filteredData.length > self.data.length;
            nextSkip = self.data.length;

        }

        function applyAllAndUpdateSelectOptions(searchText, filters, sortProperty, sortDescending, maxData, showOnlySelected) {
            applySearchFilterSort(searchText, filters, sortProperty, sortDescending, maxData, showOnlySelected);
            itemsChanged(self.selectedIds, false);
        }

        function onSearch(searchText) {
            return $timeout(function () {
                var searchedData
                self.searchText = searchText;
                applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected);
                
            });
        }

        function onDismissFilter(index) {
            self.appliedFilters.splice(index, 1);
            applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected);
        }

        function sortItems(item) {
            sortProperty = item.name;
            sortDescending = item.descending;
            applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected);
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
                    applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected);
                });
        }

        function loadData() {
            var newData = getData(nextTop, nextSkip);
                
            
            self.data = self.data.concat(newData);
            if (maxRecordsShown < self.data.length) {
                maxRecordsShown = self.data.length;
            }
            applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected);
        }

        function onLoadMore() {
            return $timeout(function () {
                loadData();
            }, 4000);
            
        }

        function onAddClick() {
            alert('Add button clicked');
        }

        function viewChanged(newView) {
            self.activeView = newView;
        }

        function itemsChanged(selectedItems, shouldApplyFilters) {
            var i,
                item; 

            self.selectedIds = selectedItems;

            if (self.showOnlySelected && shouldApplyFilters) {
                applySearchFilterSort(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected);
            }

            self.payMembershipSelections = [];
            self.secondarySelections = [];
            for (i = 0; i < selectedItems.length; i++) {
                item = getItemById(selectedItems[i], self.data);
                if (item) {
                    if (!item.duesPaid) {
                        self.payMembershipSelections.push(selectedItems[i]);
                    }
                    self.secondarySelections.push(selectedItems[i]);
                }
                
            }
        }

        function payMembership(selections) {
            var i,
                item;
            for (i = 0; i < selections.length; i++) {
                item = getItemById(selections[i], self.data); 
                item.duesPaid = true;
            }
            self.payMembershipSelections = [];
        }

        function secondaryAction(selections) {
            console.log('secondary action taken with ', selections);
        }

        function addSelectedItem(id, array) {
            if (array.indexOf(id) === -1) {
                array.push(id);
            }
        }

        function removeSelectedItem(id, array) {
            var itemIndex = array.indexOf(id);
            if (itemIndex !== -1) {
                array.splice(itemIndex, 1);
            }
        }

        function selectAll() {
            var length = self.data.length,
                i;

            for (i = 0; i < length; i++) {
                self.data[i].selected = true;
                addSelectedItem(self.data[i].id, self.selectedIds);
            }

            itemsChanged(self.selectedIds);

        }

        function clearAll() {
            var length = self.data.length,
                i;

            for (i = 0; i < length; i++) {
                self.data[i].selected = false;
                removeSelectedItem(self.data[i].id, self.selectedIds);
            }

            itemsChanged(self.selectedIds);
            
        }

        function toggleOnlySelected(showOnlySelected) {
            self.showOnlySelected = showOnlySelected;
            // when true do not need to reapply all data, when false need to reapply.

            applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, showOnlySelected);
            
        }

        self.toggleOnlySelected = toggleOnlySelected;

        self.selectAll = selectAll;
        self.clearAll = clearAll;

        self.secondarySelections = [];
        self.payMembershipSelections = [];

        self.selectedIds = [];

        self.payMembership = payMembership;
        self.secondaryAction = secondaryAction;
        self.itemsChanged = itemsChanged;
        self.onFilterClick = onFilterClick;

        self.onSearch = onSearch;
        self.onLoadMore = onLoadMore;
        self.onAddClick = onAddClick;
        self.sortItems = sortItems;
        self.viewChanged = viewChanged;
        self.hasMoreData = true;
        self.onDismissFilter = onDismissFilter;
        self.data = [];
        loadData();

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