/*global angular */
(function () {
    'use strict';

    function ListbuilderFilterController($uibModalInstance, existingFilters) {
        var self = this;

        function clearAllFilters() {
            self.filters = {
                tenYears: false,
                showUnrecorded: false
            };
        }

        function transformFiltersToArray(filters) {
            var result = [];

            if (filters.tenYears) {
                result.push({ name: 'tenYears', value: true, label: 'members with ten years' });
            }

            if (filters.showUnrecorded) {
                result.push({ name: 'showUnrecorded', value: true, label: 'unpaid members' });
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


    function ListbuilderModalController($uibModalInstance) {
        var self = this;
        function save() {
            $uibModalInstance.close(true);
        }

        function doNotSave() {
            $uibModalInstance.close(false);
        }
        self.save = save;
        self.doNotSave = doNotSave;

    }

    ListbuilderModalController.$inject = ['$uibModalInstance'];

    function ListbuilderTestController($scope, $timeout, bbModal, $window) {
        var self = this,
            sortProperty,
            sortDescending,
            isPersonal,
            maxRecordsShown = 0,
            nextSkip = 0,
            nextTop = 12,
            recordedFilters = [],
            //dataSet = [];
            dataSet = [
            {
                name: '$25.00',
                occupation: 'Amazon market palce amz.com',
                joinDate: new Date('09/14/2016'),
                newField: 'Nicole Guersey (Visa1234)',
                isPersonal: false,
                duesPaid: true
            },
            {
                name: '$250.00',
                occupation: 'Walt Disney world 0914',
                joinDate: new Date('2/23/2016'),
                newField: 'David johnson (Visa3333)',
                isPersonal: true,
                duesPaid: false
            },
            {
                name: '- $25.00',
                occupation: 'Amazon',
                joinDate: new Date('2/23/2016'),
                newField: 'Nicole Guersey (Visa1234)',
                isPersonal: true,
                duesPaid: false
            },
            {
                name: '$15.00',
                occupation: 'Wallmart',
                joinDate: new Date('2/23/2016'),
                newField: 'David johnson (Visa3333)',
                isPersonal: false,
                duesPaid: true
            },
            {
                name: '$100.00',
                occupation: 'Walt Disney world 0914',
                newField: 'Nicole Guersey (Visa1234)',
                joinDate: new Date('11/7/1999'),
                isPersonal: false,
                duesPaid: false
            },
            {
                name: '$25.00',
                occupation: 'Amazon market palce amz.com',
                joinDate: new Date('09/14/2016'),
                newField: 'Nicole Guersey (Visa1234)',
                isPersonal: false,
                duesPaid: true
            },
            {
                name: '$250.00',
                occupation: 'Walt Disney world 0914',
                joinDate: new Date('2/23/2016'),
                newField: 'David johnson (Visa3333)',
                isPersonal: true,
                duesPaid: true
            },
            {
                name: '- $25.00',
                occupation: 'Amazon',
                joinDate: new Date('2/23/2016'),
                newField: 'Nicole Guersey (Visa1234)',
                isPersonal: false,
                duesPaid: true
            },
            {
                name: '$15.00',
                occupation: 'Wallmart',
                joinDate: new Date('2/23/2016'),
                newField: 'David johnson (Visa3333)',
                isPersonal: false,
                duesPaid: true
            },
            {
                name: '$100.00',
                occupation: 'Walt Disney world 0914',
                newField: 'Nicole Guersey (Visa1234)',
                joinDate: new Date('11/7/1999'),
                isPersonal: true,
                duesPaid: true
            }
        ];
        self.dirtyValue;


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
            if (angular.isDefined(filters) && filters.length > 0) {
                for (i = 0; i < filters.length; i++) {
                    item = filters[i];
                    if (item.name === 'tenYears') {
                        newData = newData.filter(function (filterObj) {
                            return new Date().getFullYear() - filterObj.joinDate.getFullYear() >= 10;
                        });
                    }
                    if (item.name === 'showUnrecorded') {
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

        function applySearchFilterSort(searchText, filters, sortProperty, sortDescending, maxData) {
            var filteredData;
            filteredData = searchArray(searchText, dataSet);
            filteredData = filter(filteredData, filters);
            filteredData = sortArray(sortProperty, sortDescending, filteredData);

            self.data = filteredData.slice(0, maxData);
            self.hasMoreData = filteredData.length > self.data.length;
            nextSkip = self.data.length;
        }

        function onSearch(searchText) {
            return $timeout(function () {
                var searchedData
                self.searchText = searchText;
                applySearchFilterSort(self.searchText, self.recordedFilters, sortProperty, sortDescending, maxRecordsShown);
            });
        }

        function onDismissFilter(index) {
            self.allAppliedFilters.splice(index, 1);
            onlyShowRecorded();


        }

        function sortItems(item) {
            sortProperty = item.name;
            sortDescending = item.descending;
            applySearchFilterSort(self.searchText, self.recordedFilters, sortProperty, sortDescending, maxRecordsShown);
        }

        function onFilterClick() {
            bbModal.open({
                controller: 'ListbuilderFilterController as filterCtrl',
                templateUrl: 'demo/listbuilder/filters.html',
                resolve: {
                    existingFilters: function () {
                        return angular.copy(self.allAppliedFilters);
                    }
                }
            }).result
                .then(function (result) {
                    self.allAppliedFilters = angular.copy(result);

                    onlyShowRecorded();

                });
        }

        function loadData() {
            var newData = getData(nextTop, nextSkip);


            self.data = self.data.concat(newData);
            if (maxRecordsShown < self.data.length) {
                maxRecordsShown = self.data.length;
            }
            applySearchFilterSort(self.searchText, self.recordedFilters, sortProperty, sortDescending, maxRecordsShown);


            //displaying panel data for first item
            selectFirstItem();

            self.updatedDate = getFormattedDate(new Date());

        }

        function selectFirstItem() {
            if (self.data && self.data[0] && self.data[0] !== null) {
                self.selectedItem = self.data[0];
                self.selectedItem.$index = 0;
            }

        }

        function getFormattedDate(date) {
            var p = date;
            return (p.getMonth() + 1) + "/" + p.getDate() + "/" + p.getFullYear();
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

        //this is used to get panel data on selection of item
        function getPaneldata(p) {
            //get data from database for particualar item
            //not confirm it should be in panel directive or listBuilder-content

            self.selectedItem = p;
        }

        //check dirty and open modal
        function checkDirtyForm(func, param) {

            if (angular.isDefined($scope.forms) && angular.isDefined($scope.forms.containerForm) && $scope.forms.containerForm.$dirty) {
                self.dirtyValue = self.selectedItem;
                var listScope = $scope;
                bbModal.open({
                    controller: 'ListbuilderModalController as ctrl',
                    templateUrl: 'demo/splitpanel/confirmpopup.html'
                })
                .result.then(function (result) {
                    listScope.forms.containerForm.$setPristine();
                    if (result) {
                        self.save(func, param);
                    } else {
                        self.doNotSave(func, param);
                    }
                });
            } else {
                invokeMethodWithParameters(func, param);
            }
        }

        function invokeMethodWithParameters(func, param) {
            if (param === undefined) {
                func();
            } else {
                func(param);
            }
        }

        function next() {
            if (self.selectedItem.$index < self.data.length - 1) {
                var newIndex = self.selectedItem.$index + 1;
                self.selectedItem = self.data[newIndex];
                self.selectedItem.$index = newIndex;
            }
        }

        function previous() {

            if (self.selectedItem.$index !== 0) {
                var newIndex = self.selectedItem.$index - 1;
                self.selectedItem = self.data[newIndex];
                self.selectedItem.$index = newIndex;
            }
        }

        function save(func, param) {

            alert("data saved");
            //TODO : will save here
            invokeMethodWithParameters(func, param);
        }

        function doNotSave(func, param) {
            alert("data not saved");
            //loadData(); // ideally it should refersh the data, then no need revert unsaved data
            invokeMethodWithParameters(func, param);

        }

        function downloadTransactions() {
            //download transaction and update date
            self.updatedDate = getFormattedDate(new Date());
            alert('Transactions are downloaded')

        }

        function onlyShowRecorded() {

            selectFirstItem();
            //TODO: loadData with filter of unrecorded transcation

            self.recordedFilters = [];
            if (self.allAppliedFilters) {
                self.recordedFilters = angular.copy(self.allAppliedFilters);
            }

            if (self.showUnrecord) {
                self.recordedFilters.push({ label: "showUnrecord transaction", name: "showUnrecorded", value: true });
            }

            applySearchFilterSort(self.searchText, self.recordedFilters, sortProperty, sortDescending, maxRecordsShown);
        }

        self.onFilterClick = onFilterClick;
        self.onSearch = onSearch;
        self.onLoadMore = onLoadMore;
        self.onAddClick = onAddClick;
        self.sortItems = sortItems;
        self.viewChanged = viewChanged;
        self.getPaneldata = getPaneldata;
        self.hasMoreData = true;
        self.onDismissFilter = onDismissFilter;
        self.data = [];
        self.next = next;
        self.save = save;
        self.doNotSave = doNotSave;
        self.previous = previous;
        self.downloadTransactions = downloadTransactions;
        self.onlyShowRecorded = onlyShowRecorded;
        self.checkDirtyForm = checkDirtyForm;
        self.recordedFilters = recordedFilters;


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


        self.showTitle = true;
        self.showContent = true;
        self.showActions = true;
        self.showCheckbox = true;

        self.updatedDate;
        $scope.forms = {};
    }

    ListbuilderTestController.$inject = ['$scope', '$timeout', 'bbModal', '$window'];


    angular
        .module('stache')
        .controller('ListbuilderTestController', ListbuilderTestController)
        .controller('ListbuilderFilterController', ListbuilderFilterController)
        .controller('ListbuilderModalController', ListbuilderModalController);
}());