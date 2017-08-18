(function () {
    'use strict';

    function SplitPanelFilterController($uibModalInstance, existingFilters, bbCheckDirtyForm) {
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
                result.push({ name: 'tenYears', value: true, label: 'transaction older than ten years' });
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
        self.splitpanelNavigator = bbCheckDirtyForm;

    }

    SplitPanelFilterController.$inject = ['$uibModalInstance', 'existingFilters', 'bbCheckDirtyForm'];


    function SplitPanelModalController($uibModalInstance, params) {
        var self = this;
        function save() {
            $uibModalInstance.close({ result: true, params: params });
        }

        function doNotSave() {
            $uibModalInstance.close({ result: false });
        }
        self.save = save;
        self.doNotSave = doNotSave;

    }

    SplitPanelModalController.$inject = ['$uibModalInstance', 'params'];

    function SplitPanelTestController($scope, $timeout, bbModal, $window, bbWait, bbCheckDirtyForm) {
        var self = this,
            sortProperty,
            sortDescending,
            isPersonal,
            maxRecordsShown = 0,
            nextSkip = 0,
            nextTop = 12,
            recordedFilters = [],
            isItemRecorded = false,
            isSetFocusToVendor = true,
            dataSet = [
            {
                amount: '$25.00',
                description: 'Amazon market palce amz.com',
                transactionDate: new Date('09/14/2016'),
                merchant: 'Nicole Guersey (Visa1234)',
                isPersonal: false,
                recorded: false
            },
            {
                amount: '$250.00',
                description: 'Walt Disney world 0914',
                transactionDate: new Date('2/23/2016'),
                merchant: 'David johnson (Visa3333)',
                isPersonal: true,
                recorded: false
            },
            {
                amount: '- $25.00',
                description: 'Amazon',
                transactionDate: new Date('2/23/2016'),
                merchant: 'Nicole Guersey (Visa1234)',
                isPersonal: true,
                recorded: false
            },
            {
                amount: '$15.00',
                description: 'Walmart',
                transactionDate: new Date('2/23/2016'),
                merchant: 'David johnson (Visa3333)',
                isPersonal: false,
                recorded: false
            },
            {
                amount: '$100.00',
                description: 'Walt Disney world 0914',
                merchant: 'Nicole Guersey (Visa1234)',
                transactionDate: new Date('11/7/1999'),
                isPersonal: false,
                status: "Recorded",
                recorded: true
            },
            {
                amount: '$25.00',
                description: 'Amazon market palce amz.com',
                transactionDate: new Date('09/14/2016'),
                merchant: 'Nicole Guersey (Visa1234)',
                isPersonal: false,
                status: "Recorded",
                recorded: true
            },
            {
                amount: '$250.00',
                description: 'Walt Disney world 0914',
                transactionDate: new Date('2/23/2016'),
                merchant: 'David johnson (Visa3333)',
                isPersonal: true,
                status: "Recorded",
                recorded: true
            },
            {
                amount: '- $25.00',
                description: 'Amazon',
                transactionDate: new Date('2/23/2016'),
                merchant: 'Nicole Guersey (Visa1234)',
                isPersonal: false,
                recorded: false
            },
            {
                amount: '$15.00',
                description: 'Wallmart',
                transactionDate: new Date('2/23/2016'),
                merchant: 'David johnson (Visa3333)',
                isPersonal: false,
                recorded: false
            },
            {
                amount: '$100.00',
                description: 'Walt Disney world 0914',
                merchant: 'Nicole Guersey (Visa1234)',
                transactionDate: new Date('11/7/1999'),
                isPersonal: true,
                recorded: false
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
                        if (item.hasOwnProperty(property) && (property === 'amount' || property === 'description')) {
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
                            return new Date().getFullYear() - filterObj.transactionDate.getFullYear() >= 10;
                        });
                    }
                    if (item.name === 'showUnrecorded') {
                        newData = newData.filter(function (filterObj) {
                            return filterObj.recorded === false;
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
                controller: 'SplitPanelFilterController as filterCtrl',
                templateUrl: 'demo/listbuilder/filters.html',
                resolve: {
                    existingFilters: function () {
                        return angular.copy(self.allAppliedFilters);
                    }, bbCheckDirtyForm: function () {
                        return self.splitpanelNavigator;
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


            selectFirstItem();

            self.updatedDate = getFormattedDate(new Date());
            $scope.$emit("bbEndWait");
        }

        function selectFirstItem() {
            var newIndex;
            if (!isItemRecorded) {
                if (self.data && self.data.length > 0) {
                    self.selectedItem = self.data[0];
                    self.selectedItem.$index = 0;

                    //Whenever first item is selected its imperative that we make the item visible in the viewport
                    $timeout(function () {
                        if ($(".bb-splitpanel-list-container").length > 0) {
                            $(".bb-splitpanel-list-container")[0].scrollTop = 0;
                        }
                    });
                }
            } else {
                if (!self.showUnrecord) {
                    if (self.data.length !== (self.selectedItem.$index + 1)) {
                        newIndex = self.selectedItem.$index + 1;
                    } else {
                        newIndex = 0;
                    }
                } else {
                    if (self.data.length !== (self.selectedItem.$index)) {
                        newIndex = self.selectedItem.$index;
                    } else {
                        newIndex = 0;
                    }
                }
                if (newIndex === 0) {
                    $timeout(function () {
                        $(".bb-splitpanel-list-container")[0].scrollTop = 0;
                    }, 4000);
                }
                self.selectedItem = self.data[newIndex];
                self.selectedItem.$index = newIndex;

                isItemRecorded = false;
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

        //this is used to get panel data on selection of item
        function getPaneldata(p) {

            self.isDetailScreen = true;

            self.selectedItem = p;
        }

        function next() {
            var newIndex = 0;
            if (self.selectedItem.$index < self.data.length - 1) {
                newIndex = self.selectedItem.$index + 1;
                self.selectedItem = self.data[newIndex];
                self.selectedItem.$index = newIndex;
            }
        }

        function previous() {
            var newIndex = 0;
            if (self.selectedItem.$index !== 0) {
                newIndex = self.selectedItem.$index - 1;
                self.selectedItem = self.data[newIndex];
                self.selectedItem.$index = newIndex;
            }
        }

        function save(func, param) {

            self.splitpanelNavigator.setDirtyFormDefault();
        }

        function doNotSave(func, param) {
            self.splitpanelNavigator.setDirtyFormDefault();
        }

        //This method is used to download transaction and update refresh date
        function downloadTransactions() {
            self.updatedDate = getFormattedDate(new Date());
            alert('Transactions are downloaded')

        }

        function onlyShowRecorded() {

            selectFirstItem();

            self.recordedFilters = [];
            if (self.allAppliedFilters) {
                self.recordedFilters = angular.copy(self.allAppliedFilters);
            }

            if (self.showUnrecord) {
                self.recordedFilters.push({ label: "showUnrecord transaction", name: "showUnrecorded", value: true });
            }

            applySearchFilterSort(self.searchText, self.recordedFilters, sortProperty, sortDescending, maxRecordsShown);
        }

        function back() {
            self.isDetailScreen = false;
        }

        function record() {
            $scope.$emit("bbBeginWait");

            //adding 2 sec wait to show bbwait, no need of it in implementation
            return $timeout(function () {
                //setting itemRecorded flag as success and status of current item as recorded
                isItemRecorded = true;
                if (self.data && angular.isDefined(self.selectedItem.$index) && self.data[self.selectedItem.$index]) {
                    self.data[self.selectedItem.$index].recorded = true;
                    self.data[self.selectedItem.$index].status = "Recorded";
                }
                loadData();
            }, 2000);

        }


        //this method is used to select item by up/down arrow keys in the list
        function navigateUpAndDown() {
            var code = event.keyCode;
            if ((code == 38 && self.selectedItem.$index !== 0) || code == 40) {
                self.splitpanelNavigator.checkDirtyForm(nextAndPreviousHandler, code);
                //setting flag ot have focus on vendor control
                isSetFocusToVendor = false;
            }
        }

        //this method is used to handle next and previous on arrow keys
        function nextAndPreviousHandler(keyCode) {
            switch (keyCode) {
                case 38:
                    self.previous();
                    break;
                case 40:
                    self.next();
                    break;
            }

            if (angular.element("#item" + self.selectedItem.$index) && angular.element("#item" + self.selectedItem.$index)[0]) {
                angular.element("#item" + self.selectedItem.$index)[0].focus();
            }
        }

        self.onFilterClick = onFilterClick;
        self.onSearch = onSearch;
        self.onLoadMore = onLoadMore;
        self.sortItems = sortItems;
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
        self.recordedFilters = recordedFilters;
        self.back = back;
        self.navigateUpAndDown = navigateUpAndDown;
        self.record = record;
        self.bbmodal = bbModal;
        self.isDetailScreen = false;

        loadData();

        self.sortOptions = [
            {
                id: 1,
                label: 'Amount (ascending)',
                name: 'amount',
                descending: false
            },
            {
                id: 2,
                label: 'Amount (Descending)',
                name: 'amount',
                descending: true
            },
            {
                id: 3,
                label: 'Transaction date  (newest first)',
                name: 'transactionDate',
                descending: true
            },
            {
                id: 4,
                label: 'Transaction date (oldest first)',
                name: 'transactionDate',
                descending: false
            },
            {
                id: 5,
                label: 'description (A - Z)',
                name: 'description',
                descending: false
            },
            {
                id: 6,
                label: 'description (Z - A)',
                name: 'description',
                descending: true
            }
        ];

        self.initialState = self.sortOptions[4].id;
        self.updatedDate;
        $scope.forms = {};
        self.splitpanelNavigator = bbCheckDirtyForm.init({
            enableFormDirtyCheck: true,
            forms: $scope.forms,
            action1Callback: save,
            action2Callback: doNotSave,
            modalController: 'SplitPanelModalController as ctrl',
            modalTemplate: 'demo/splitpanel/confirmpopup.html',
            scope: $scope,
            bbModal: self.bbmodal
        });

    }

    SplitPanelTestController.$inject = ['$scope', '$timeout', 'bbModal', '$window', 'bbWait', 'bbCheckDirtyForm'];


    angular
        .module('stache')
        .controller('SplitPanelTestController', SplitPanelTestController)
        .controller('SplitPanelFilterController', SplitPanelFilterController)
        .controller('SplitPanelModalController', SplitPanelModalController);
}());