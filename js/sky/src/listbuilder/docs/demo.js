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
            ],
        sortOptions = [
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
        ],
        gridOptions = {
                columns: [
                    {
                        caption: 'Name',
                        jsonmap: 'name',
                        id: 1,
                        name: 'name',
                        right_align: true,
                        category: 'My category',
                        description: 'Column description',
                        width_all: 300,
                        width_xs: 100
                    },
                    {
                        caption: 'Occupation',
                        jsonmap: 'occupation',
                        id: 2,
                        name: 'occupation',
                        width_all: 300,
                        width_xs: 100
                    },
                    {
                        caption: 'Dues paid',
                        jsonmap: 'duesPaid',
                        id: 3,
                        name: 'duesPaid',
                        width_all: 300,
                        template_url: 'bbGrid/samples/mycolumn.html',
                        controller: 'TemplateController as templateCtrl'
                    },
                    {
                        caption: 'Date',
                        jsonmap: 'joinDate',
                        id: 4,
                        name: 'joinDate',
                        width_all: 200,
                        template_url: 'bbGrid/samples/date.html'
                    }
                ],
                getContextMenuItems: function (rowid, rowObject) {
                    return [
                        {
                            id: 'menu',
                            title: 'Option1',
                            cmd: function () {
                                alert('Context menu option chosen!');
                                return false;
                            }
                        }
                    ];
                },
                multiselect: true,
                selectedColumnIds: [1, 2, 3, 4],
                columnPickerHelpKey: 'bb-security-users.html'
            };

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

            self.gridOptions.sortOptions = {
                column: sortProperty,
                descending: sortDescending
            };
            
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
            var selectedLength = selectedIds.length,
                arrayLength = array.length,
                item,
                newData = [],
                i;

            /* 
                if selectAll is active, set each data item as selected and add new items to selected items
            */
            if (self.selectAllActive) {
                for (i = 0; i < arrayLength; i++) {
                    if (selectedIds.indexOf(array[i].id) === -1) {
                        selectedIds.push(array[i].id);
                    }
                }
            } else if (onlyShowSelected) { /* Filter if showOnly selected is set */
                for (i = 0; i < selectedLength; i++) {
                    item = getItemById(selectedIds[i], array);
                    if (item) {
                        newData.push(item);
                    } 
                }
                return newData;
            }

            return array;
        }

        function applySearchFilterSort(searchText, filters, sortProperty, sortDescending, maxData, showOnlySelected, selectedIds) {
            var filteredData,
                baseData = angular.copy(dataSet);
            filteredData = searchArray(searchText, baseData);
            filteredData = filter(filteredData, filters);
            filteredData = applyMultiselectOptions(filteredData, showOnlySelected, selectedIds);
            filteredData = sortArray(sortProperty, sortDescending, filteredData);

            self.gridOptions.data = filteredData.slice(0, maxData);
            self.hasMoreData = filteredData.length > self.gridOptions.data.length;
            nextSkip = self.gridOptions.data.length;

        }

        function applyAllAndUpdateSelectOptions(searchText, filters, sortProperty, sortDescending, maxData, showOnlySelected, selectedIds) {
            applySearchFilterSort(searchText, filters, sortProperty, sortDescending, maxData, showOnlySelected, selectedIds);
            itemsChanged(selectedIds, self.selectAllActive, true);
        }

        function onSearch(searchText) {
            return $timeout(function () {
                var searchedData
                self.searchText = searchText;
                applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected, self.selectedIds);
                
            });
        }

        function onDismissFilter(index) {
            self.appliedFilters.splice(index, 1);
            applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected, self.selectedIds);
        }

        function sortItems(item) {
            sortProperty = item.name;
            sortDescending = item.descending;
            applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected, self.selectedIds);
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
                    applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected, self.selectedIds);
                });
        }

        function loadData() {
            var newData = getData(nextTop, nextSkip);
                
            
            self.gridOptions.data = self.gridOptions.data.concat(newData);
            if (maxRecordsShown < self.gridOptions.data.length) {
                maxRecordsShown = self.gridOptions.data.length;
            }
            applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected, self.selectedIds);
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

        function itemsChanged(selectedIds, allSelected, shouldNotApplyFilters) {
            var i,
                item; 

            self.selectedIds = selectedIds;
            self.selectAllActive = allSelected;

            if (self.showOnlySelected && !shouldNotApplyFilters) {
                applySearchFilterSort(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, self.showOnlySelected, selectedIds);
            }

            self.payMembershipSelections = [];
            self.secondarySelections = [];
            for (i = 0; i < selectedIds.length; i++) {
                item = getItemById(selectedIds[i], self.gridOptions.data);
                if (item) {
                    if (!item.duesPaid) {
                        self.payMembershipSelections.push(selectedIds[i]);
                    }
                    self.secondarySelections.push(selectedIds[i]);
                }
                
            }
        }

        function payMembership(selections) {
            var i,
                item;
            for (i = 0; i < selections.length; i++) {
                //simulate client side duesPaid changing
                item = getItemById(selections[i], self.gridOptions.data); 
                item.duesPaid = true;

                //simulate server side duesPaid changing
                item = getItemById(selections[i], dataSet);
                item.duesPaid = true;
            }
            self.payMembershipSelections = [];
        }

        function secondaryAction(selections) {
            console.log('secondary action taken with ', selections);
        }

        function toggleOnlySelected(showOnlySelected) {
            self.showOnlySelected = showOnlySelected;
            // reload data with filter options (including only show selected)

            applyAllAndUpdateSelectOptions(self.searchText, self.appliedFilters, sortProperty, sortDescending, maxRecordsShown, showOnlySelected, self.selectedIds);
            
        }

        function multiselectAvailable() {
            return self.activeView === 'repeater' || self.activeView === 'card';
        }

        function actionsShown() {
            return (self.payMembershipSelections.length > 0 || self.secondarySelections.length > 0) && multiselectAvailable();
        }

        function saveAction() {
            alert('List has been saved!');
        }

        self.saveAction = saveAction;

        self.multiselectAvailable = multiselectAvailable;

        self.actionsShown = actionsShown;

        self.toggleOnlySelected = toggleOnlySelected;

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
        self.gridOptions = gridOptions;
        self.gridOptions.data = [];
        self.activeView = 'card';
        loadData();

        self.sortOptions = sortOptions;

        self.initialState = self.sortOptions[4].id;

    }

    ListbuilderTestController.$inject = ['$timeout', 'bbModal'];

    function RunTemplateCache($templateCache) {
        $templateCache.put('bbGrid/samples/date.html', '<div>{{data | date: \'medium\'}}</div>');

        $templateCache.put('bbGrid/samples/mycolumn.html',
            '<div>' +
            '<div ng-if="data" style="margin-bottom: 10px; margin-top: 10px;">' +
                ' <span class="label label-success">Membership dues paid</span>' +
            '</div>' +
            '<div ng-if="!data" style="margin-bottom: 10px; margin-top: 10px;">' +
                '<span class="label label-danger">Membership dues not paid</span>' +
            '</div>' +
            '</div>');
    }
    RunTemplateCache.$inject = ['$templateCache'];

    function TemplateController($scope) {
        var self = this;

        self.clickIt = function () {
            alert('Column button clicked, id: ' + $scope.rowData.id);
        };
    }

    TemplateController.$inject = ['$scope'];

    
    angular
        .module('stache')
        .controller('ListbuilderTestController', ListbuilderTestController)
        .controller('ListbuilderFilterController', ListbuilderFilterController)
        .controller('TemplateController', TemplateController)
        .run(RunTemplateCache);
}());