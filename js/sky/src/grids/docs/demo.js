/*global angular, alert*/
//A comment

(function () {
    'use strict';

    function RunTemplateCache($templateCache) {
        $templateCache.put('bbGrid/samples/date.html', '<div>{{data | date: \'medium\'}}</div>');

        $templateCache.put('bbGrid/samples/gridtooltip.html',
                          '<div style="height: 70px; width: 300px;"><a>On your face</a></div>');
        $templateCache.put('bbGrid/samples/mycolumn.html',
            '<div>' +
                '<div><span class="bb-grid-no-search"> Title: </span>{{data.title}}</div>' +
                '<a href="" tooltip-trigger="focus" tooltip-placement="bottom" uib-tooltip-template="\'bbGrid/samples/gridtooltip.html\'"> <span class="bb-grid-no-search"> Info:</span> {{data.info}}</a>' +
                '<button class="btn btn-success" ng-click="templateCtrl.clickIt()">My Button</button>' +
            '</div>');
    }

    function TemplateController($scope) {
        var self = this;

        self.clickIt = function () {
            alert('Column button clicked, id: ' + $scope.rowData.id);
        };
    }

    function GridFilterController($uibModalInstance, existingFilters) {
        var self = this;

        function clearAllFilters() {
            self.filters = {
            };
        }
        
        function transformFiltersToArray(filters) {
            var result = [];

            if (filters.playsGuitar) {
                result.push({name: 'guitar', value: true, label: 'plays guitar'});
            }

            if (filters.playsDrums) {
                result.push({name: 'drums', value: true, label: 'plays drums'});
            }

            return result;
        }

        function transformArrayToFilters(array) {
            var i,
                filters = {};

            for (i = 0; i < array.length; i++) {
                if (array[i].name === 'guitar') {
                    filters.playsGuitar = array[i].value;
                }

                if (array[i].name === 'drums') {
                    filters.playsDrums = array[i].value;
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

        self.clearAllFilters = clearAllFilters;
        self.applyFilters = applyFilters;
    }

    function GridTestController($scope, $filter, $timeout, bbModal) {

        var newDataFlag = 0,
            action1,
            action2,
            dataSetBand = [
                {
                    id: 'blaarrrh',
                    name: 'John',
                    instrument: 'Rhythm guitar',
                    bio: '',
                    templated: {
                        title: 'Johnny',
                        info: 'JInfo'
                    },
                    mydate: Date.parse('1/21/2015')
                },
                {
                    id: 'PaulId',
                    name: 'Paul',
                    instrument: 'Bass',
                    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus in purus odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec consequat ante et felis accumsan volutpat. Nulla leo leo, lacinia nec felis sit amet, tristique feugiat ipsum. Mauris ac velit in mi aliquam auctor vel ac leo. Nullam vehicula congue risus, vitae congue turpis iaculis at. Vestibulum imperdiet tellus erat, sit amet rhoncus neque fringilla vitae.',
                    templated: {
                        title: 'Paully',
                        info: 'PInfo'
                    },
                    mydate: Date.parse('2/23/2012')
                },
                {
                    id: 'GeorgeId',
                    name: 'George',
                    instrument: 'Lead guitar',
                    bio: '',
                    templated: {
                        title: 'Georgy',
                        info: 'GInfo'
                    },
                    mydate: Date.parse('4/14/1999')
                },
                {
                    id: 'RingoId',
                    name: 'Ringo',
                    instrument: 'Drums',
                    bio: '',
                    templated: {
                        title: 'Ringoy',
                        info: 'RInfo'
                    },
                    mydate: Date.parse('6/22/1989')
                }
            ],
            self = this;

        function actionsShown() {
            return (self.action1Selections && self.action1Selections.length > 0) || (self.action2Selections && self.action2Selections.length > 0);
        }

        self.actionsShown = actionsShown;

        function getItemById(id) {
            var i;
            for (i = 0; i < self.gridOptions.data.length; i++) {
                if (id === self.gridOptions.data[i].id) {
                    return self.gridOptions.data[i];
                }
            }
        }

        function updateActions(selectedIds) {
            var i,
                selection;

            self.action1Selections = [];
            self.action2Selections = [];

            for (i = 0; i < selectedIds.length; i++) {
                selection = getItemById(selectedIds[i]);
                if (selection.instrument.indexOf('guitar') > -1) {
                    self.action1Selections.push(selection);
                } else if (selection.instrument.indexOf('Drum') > -1) {
                    self.action2Selections.push(selection);
                }
            }
        }

        function action1Clicked() {
            var i,
                message = 'The selected guitar players are ';
            if (self.action1Selections && self.action1Selections.length > 0) {
                for (i = 0; i < self.action1Selections.length; i = i + 1) {
                    message += self.action1Selections[i].name;
                    if (i !== (self.action1Selections.length - 1)) {
                        message += ', ';
                    }
                }
                alert(message);
            }
        }

        self.action1Clicked = action1Clicked;


        function action2Clicked() {
            var message = 'Drum Drum Drum!';

            alert(message);
        }

        self.action2Clicked = action2Clicked;

        function search(array, text) {
            if (angular.isDefined(text) && text !== '') {
                return array.filter(function (element) {
                    var check = ((element.name.indexOf(text) > -1) ||
                            (element.instrument.indexOf(text) > -1) ||
                            (element.bio.indexOf(text) > -1) ||
                            (element.templated.info.indexOf(text) !== -1) ||
                            (($filter('date')(element.mydate, 'medium')).indexOf(text) > -1));
                    return check;
                });

            } else {
                return array;
            }
        }


        function filter(array, filters) {
            var i,
                item,
                newData = [];
            if (angular.isDefined(filters) &&  filters.length > 0) {
                for (i = 0; i < filters.length; i++) {
                    item = filters[i];
                    if (item.name === 'guitar') {
                        newData.push.apply(newData, [dataSetBand[0], dataSetBand[1], dataSetBand[2]]);
                    }
                    if (item.name === 'drums') {
                        newData.push(dataSetBand[3]);
                    }
                }
                return newData;
            } else {
                return array;
            }
        }

        function filterAndSearch(searchText, filters) {
            var filteredData = [],
                searchedData = [];

            filteredData = filter(dataSetBand, filters);
            searchedData = search(filteredData, searchText);
            self.gridOptions.data = searchedData;
        }

        function onDismissFilter(index) {
            self.appliedFilters.splice(index, 1);
            filterAndSearch(self.searchText, self.appliedFilters);
        }

        function openFilters() {
            bbModal
                .open({
                    controller: 'GridFilterController as filterCtrl',
                    templateUrl: 'demo/grids/filters.html',
                    resolve: {
                        existingFilters: function () {
                            
                            return angular.copy(self.appliedFilters);
                        }
                    }
                })
                .result
                .then(function (result) {
                    self.appliedFilters = angular.copy(result);
                    filterAndSearch(self.searchText, self.appliedFilters);
                });
        }

        function onGridSearch(searchText) {
            self.searchText = searchText;
            filterAndSearch(self.searchText, self.appliedFilters);
        }

        self.onGridSearch = onGridSearch;

        self.openFilters = openFilters;

        self.onDismissFilter = onDismissFilter;

        self.summaryIsDismissible = true;

        self.clickCustom = function () {
            alert('custom button clicked');
        };

        $timeout(function () {
            self.gridOptions = {
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
                        caption: 'Instrument',
                        jsonmap: 'instrument',
                        id: 2,
                        name: 'instrument',
                        width_all: 300,
                        width_xs: 100
                    },
                    {
                        caption: 'Biography',
                        jsonmap: 'bio',
                        id: 3,
                        name: 'bio',
                        allow_see_more: true,
                        center_align: true,
                        width_all: 400,
                        width_xs: 100
                    },
                    {
                        caption: 'Templated',
                        jsonmap: 'templated',
                        id: 4,
                        name: 'templated',
                        width_all: 300,
                        template_url: 'bbGrid/samples/mycolumn.html',
                        controller: 'TemplateController as templateCtrl'
                    },
                    {
                        caption: 'Date',
                        jsonmap: 'mydate',
                        id: 5,
                        name: 'mydate',
                        width_all: 200,
                        template_url: 'bbGrid/samples/date.html'
                    }
                ],
                data: dataSetBand,
                getContextMenuItems: function (rowid, rowObject) {
                    if (rowid === 'blaarrrh' || rowObject.name === 'Ringo') {
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
                    }
                },
                multiselect: true,
                selectedColumnIds: [1, 2, 3, 5],
                columnPickerHelpKey: 'bb-security-users.html'
            };



            self.setSelections = setSelections;

            self.selectedIds = [dataSetBand[1].id];

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
                    label: 'Instrument (A - Z)',
                    name: 'instrument',
                    descending: false
                },
                {
                    id: 4,
                    label: 'Instrument (Z - A)',
                    name: 'instrument',
                    descending: true
                },
                {
                    id: 5,
                    label: 'Date (newest first)',
                    name: 'mydate',
                    descending: true

                },
                {
                    id: 6,
                    label: 'Date (oldest first)',
                    name: 'mydate',
                    descending: false
                }
            ];

            

            function sortItems(item) {
                self.gridOptions.data.sort(function (a, b) {
                    var descending = item.descending ? -1 : 1,
                        sortProperty = item.name;
                    if (a[sortProperty] > b[sortProperty]) {
                        return (descending);
                    } else if (a[sortProperty] < b[sortProperty]) {
                        return (-1 * descending);
                    } else {
                        return 0;
                    }
                });

                self.gridOptions.sortOptions = {
                    column: item.name,
                    descending: item.descending
                };
            }

            self.sortItems = sortItems;

            function setSelections() {
                self.selectedIds = [dataSetBand[3].id];
            }

            self.gridOptions.hasMoreRows = true;
            self.action1Selections = [];
            self.action2Selections = [];

            /* This function creates unique data sets to be appended to our
               grid */
            function getLoadMoreDataSet() {
                var i,
                    newData;

                newData = angular.copy(dataSetBand);

                for (i = 0; i < dataSetBand.length; i++) {
                    newData[i].id = newDataFlag;
                    newDataFlag++;
                }
                
                return newData;
            }

            $scope.$on('loadMoreRows', function (event, data) {
                $timeout(function () {
                    self.gridOptions.hasMoreRows = false;
                    self.gridOptions.data = self.gridOptions.data.concat(getLoadMoreDataSet());
                    data.promise.resolve();
                }, 2000);
            });

            $scope.$on('bbGridMultiselectSelectedIdsChanged', function (event, selectedIds) {
                event.preventDefault();
                event.stopPropagation();
                updateActions(selectedIds);
            });

            $scope.$on('includedColumnsChanged', function (event, data) {
                // Optionally set the data's willResetData property to true if the controller will handle reloading the results
                // after the user has changed the selected grid columns.
            });
        });
    }

    function PaginationGridTestController($scope) {
        var dataSet1 = [
            {
                name: 'Patrick',
                skills: 'Karate, Kung Fu, Italian cooking, Ditch digging'
            },
            {
                name: 'Paul',
                skills: 'Arguing',
                cats: '13'
            },
            {
                name: 'George',
                skills: 'Curiousity',
                cats: '1'
            },
            {
                name: 'Ringo',
                skills: 'Slow typing'
            },
            {
                name: 'Samwise',
                skills: 'Loyalty, Gardening'
            }
        ],
        dataSet2 = [
            {
                name: 'Corey',
                skills: 'Vegetables',
                cats: 'Threve'
            },
            {
                name: 'Daniel',
                skills: 'Arguing, spelunking',
                cats: '1'
            },
            {
                name: 'Rick',
                skills: 'Leadership, Zombie slaying'
            },
            {
                name: 'Jeremey',
                skills: 'Knowledge, Speling',
                cats: 'EleventySeven'
            },
            {
                name: 'Frodo',
                skills: 'Walking, Carrying'
            }
        ],
        dataSet3 = [
            {
                name: 'Gollum',
                skills: 'Precious, Filthy hobbitses, *gollum*'
            },
            {
                name: 'Franklin',
                skills: 'Turtles',
                cats: '13'
            },
            {
                name: 'Tater',
                skills: 'Salad',
                cats: '6'
            },
            {
                name: 'Bev',
                skills: 'Growling'
            },
            {
                name: 'Sean',
                skills: 'Method acting, Drama, Villiany',
                cats: '9'
            }
        ],
        self = this;

        self.gridOptions2 = {
            columns: [
                {
                    caption: 'Name',
                    jsonmap: 'name',
                    id: 1,
                    name: 'name',
                    width_all: 150,
                    title: false
                },
                {
                    caption: 'Skills',
                    jsonmap: 'skills',
                    id: 2,
                    name: 'skills',
                    allow_see_more: true,
                    width_all: 350
                },
                {
                    caption: 'Number of cats',
                    jsonmap: 'cats',
                    width_all: 50,
                    id: 3,
                    name: 'cats'
                }
            ],
            data: dataSet1,
            fixedToolbar: true,
            onAddClick: function () {
                alert('Add button clicked!!');
            },
            onAddClickLabel: 'Add button',
            selectedColumnIds: [1, 2, 3],
            columnPickerHelpKey: 'bb-security-users.html',
            sortOptions: {
                excludedColumns: [
                    'cats',
                    'name',
                    'skills'
                ]
            },
            hasInlineFilters: true,
            filters: {}
        };

        self.paginationOptions = {
            recordCount: 30
        };

        function getPaginationDataSet(top, skip) {
            if (skip === 0 || skip === 15) {
                return dataSet1;
            } else if (skip === 5 || skip === 20) {
                return dataSet2;
            } else {
                return dataSet3;
            }
        }

        function filterItems(filters) {
            self.gridOptions2.filtersAreActive = filters && (filters.checkFilter || filters.selectFilter);

            if (angular.isDefined(filters)) {

                if (filters.checkFilter) {
                    self.gridOptions2.data = [dataSet1[2]];
                    self.paginationOptions.recordCount = 1;
                }

                if (filters.selectFilter) {
                    if (filters.selectFilter === 'option1') {
                        if (filters.checkFilter) {
                            self.gridOptions2.data = [dataSet1[0], dataSet1[2]];
                        } else {
                            self.gridOptions2.data = [dataSet1[0]];
                        }

                        self.paginationOptions.recordCount = self.gridOptions2.data.length;
                        return;
                    } else if (filters.selectFilter === 'option2') {

                        if (filters.checkFilter) {
                            self.gridOptions2.data = [dataSet1[1], dataSet1[2]];
                        } else {
                            self.gridOptions2.data = [dataSet1[1]];
                        }

                        self.paginationOptions.recordCount = self.gridOptions2.data.length;
                        return;
                    }
                } else if (filters.checkFilter) {
                    self.gridOptions2.data = [dataSet1[2]];
                    self.paginationOptions.recordCount = self.gridOptions2.data.length;
                    return;
                }
            }
            self.gridOptions2.data = dataSet1;
            self.paginationOptions.recordCount = 30;
        }

        function search(array, text) {
            var result;
            if (angular.isDefined(text) && text !== '') {
                result = array.filter(function (element) {
                    var check = ((element.name.indexOf(text) > -1) ||
                            (element.skills.indexOf(text) > -1) ||
                            (element.cats && element.cats.indexOf(text) > -1));
                    return check;
                });

                self.paginationOptions.recordCount = result.length;
                return result;
            } else {
                return array;
            }
        }

        function filterAndSearch(searchText, filters) {
            var searchedData = [];

            filterItems(filters);
            searchedData = search(self.gridOptions2.data, searchText);
            self.gridOptions2.data = searchedData;
        }

        $scope.$watch(function () {
            return self.gridOptions2.filters;
        }, function (newValue) {
            filterAndSearch(self.searchText, self.gridOptions2.filters)
        }, true);

        function onGridSearch(searchText) {
            self.searchText = searchText;
            filterAndSearch(self.searchText, self.gridOptions2.filters);
        }
        self.onGridSearch = onGridSearch;

        $scope.$on('loadMoreRows', function (event, data) {
            self.gridOptions2.data = getPaginationDataSet(data.top, data.skip);
        });
    }

    PaginationGridTestController.$inject = ['$scope'];

    RunTemplateCache.$inject = ['$templateCache'];

    TemplateController.$inject = ['$scope'];

    GridFilterController.$inject = ['$uibModalInstance', 'existingFilters']

    GridTestController.$inject = ['$scope', '$filter', '$timeout', 'bbModal'];

    angular.module('stache')
    .run(RunTemplateCache)
    .controller('TemplateController', TemplateController)
    .controller('GridTestController', GridTestController)
    .controller('GridFilterController', GridFilterController)
    .controller('PaginationGridTestController', PaginationGridTestController);

}());
