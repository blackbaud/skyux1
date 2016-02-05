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
                '<div>Title: {{data.title}}</div>' +
                '<a href="" tooltip-trigger="focus" tooltip-placement="bottom" bb-tooltip="bbGrid/samples/gridtooltip.html"> Info: {{data.info}}</a>' +
                '<button class="btn btn-success" ng-click="templateCtrl.clickIt()">My Button</button>' +
            '</div>');
    }

    function TemplateController($scope) {
        var self = this;

        self.clickIt = function () {
            alert('Column button clicked, id: ' + $scope.rowData.id);
        };
    }

    function GridTestController($scope, $filter, $timeout) {

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

        function applyFilters() {
            self.appliedFilters.instruments = [];
            if (self.guitarFilter) {
                self.appliedFilters.instruments.push({name: 'guitars'});
            }
            if (self.drumsFilter) {
                self.appliedFilters.instruments.push({name: 'drums'});
            }
        }

        function updateActions(selections) {
            var i,
                selection;

            action1.selections = [];
            action2.selections = [];

            for (i = 0; i < selections.length; i++) {
                selection = selections[i];
                if (selection.instrument.indexOf('guitar') > -1) {
                    action1.selections.push(selection);
                } else if (selection.instrument.indexOf('Drum') > -1) {
                    action2.selections.push(selection);
                }
            }
        }

        function action1Clicked() {
            var i,
                message = 'The selected guitar players are ';
            if (action1.selections && action1.selections.length > 0) {
                for (i = 0; i < action1.selections.length; i = i + 1) {
                    message += action1.selections[i].name;
                    if (i !== (action1.selections.length - 1)) {
                        message += ', ';
                    }
                }
                alert(message);
            }
        }

        function action2Clicked() {
            var message = 'Drum Drum Drum!';

            alert(message);
        }


        action1 = {
            actionCallback: action1Clicked,
            automationId: 'Action1Button',
            isPrimary: true,
            selections: [],
            title: 'Guitar Action'
        };

        action2 = {
            actionCallback: action2Clicked,
            automationId: 'Action2Button',
            isPrimary: false,
            selections: [],
            title: 'Drum Action'
        };

        self.appliedFilters = {
            instruments: []
        };

        self.clickCustom = function () {
            alert('custom button clicked');
        };

        self.filterOptions = {
            applyFilters: function (args) {
                applyFilters();
                args.filters = angular.copy(self.appliedFilters);
            },
            clearFilters: function (args) {
                self.guitarFilter = false;
                self.drumsFilter = false;
                applyFilters();
                args.filters = angular.copy(self.appliedFilters);
            }
        };

        self.gridActions = [
            action1,
            action2
        ];
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
                sortOptions: {
                    excludedColumns: ['bio']
                },
                filtersOpen: true,
                selectedColumnIds: [1, 2, 3, 5],
                columnPickerHelpKey: 'bb-security-users.html',
                columnPickerMode: 'list',
                colPickerSearchProperties: ['caption', 'description']
            };

            self.guitarFilter = false;

            self.drumsFilter = false;

            self.updateActions = updateActions;

            self.setSelections = setSelections;

            self.selectedRows = [dataSetBand[1]];

            function setSelections() {
                self.selectedRows = [dataSetBand[3]];
            }

            $scope.$watch(function () {
                return self.gridOptions.sortOptions;
            }, function () {
                self.gridOptions.data.sort(function (a, b) {
                    var descending = self.gridOptions.sortOptions.descending ? -1 : 1,
                        sortProperty = self.gridOptions.sortOptions.column;
                    if (a[sortProperty] > b[sortProperty]) {
                        return (descending);
                    } else if (a[sortProperty] < b[sortProperty]) {
                        return (-1 * descending);
                    } else {
                        return 0;
                    }
                });
            }, true);

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
                if (angular.isDefined(filters) && filters.instruments && filters.instruments.length > 0) {
                    for (i = 0; i < filters.instruments.length; i++) {
                        item = filters.instruments[i];
                        if (item.name === 'guitars') {
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

            function filterAndSearch() {
                var filteredData = [],
                    searchedData = [];

                filteredData = filter(dataSetBand, self.gridOptions.filters);
                searchedData = search(filteredData, self.gridOptions.searchText);
                self.gridOptions.data = searchedData;

            }

            $scope.$watch(function () {
                return self.gridOptions.searchText;
            }, function () {
                filterAndSearch();
            });

            $scope.$watch(function () {
                return self.gridOptions.filters;
            }, function () {
                filterAndSearch();
            });

            self.gridOptions.hasMoreRows = true;

            /* This function creates unique data sets to be appended to our
               grid */
            function getLoadMoreDataSet() {
                var i,
                    newData;

                newData = angular.copy(dataSetBand);

                for (i = 0; i < dataSetBand.length; i++) {
                    newData[i].flag = newDataFlag;
                }
                newDataFlag++;
                return newData;
            }

            $scope.$on('loadMoreRows', function (event, data) {
                /* If a promise exists on the event data, then we can resolve
                       it with the next set of data that should be concatenated
                       to the grid */
                self.gridOptions.loading = true;
                $timeout(function () {
                    data.promise.resolve(getLoadMoreDataSet());
                    self.gridOptions.loading = false;
                }, 2000);

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
                    width_xs: 100,
                    width_all: 300
                },
                {
                    caption: 'Skills',
                    jsonmap: 'skills',
                    id: 2,
                    name: 'skills',
                    allow_see_more: true,
                    width_all: 100
                },
                {
                    caption: 'Number of cats',
                    jsonmap: 'cats',
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

        $scope.$watch(function () {
            return self.gridOptions2.filters;
        }, function (newValue) {

            self.gridOptions2.filtersAreActive = newValue && (newValue.checkFilter || newValue.selectFilter);

            if (angular.isDefined(newValue)) {

                if (newValue.checkFilter) {
                    self.gridOptions2.data = [dataSet1[2]];
                    self.paginationOptions.recordCount = 1;
                }

                if (newValue.selectFilter) {
                    if (newValue.selectFilter === 'option1') {
                        if (newValue.checkFilter) {
                            self.gridOptions2.data = [dataSet1[0], dataSet1[2]];
                        } else {
                            self.gridOptions2.data = [dataSet1[0]];
                        }

                        self.paginationOptions.recordCount = self.gridOptions2.data.length;
                        return;
                    } else if (newValue.selectFilter === 'option2') {

                        if (newValue.checkFilter) {
                            self.gridOptions2.data = [dataSet1[1], dataSet1[2]];
                        } else {
                            self.gridOptions2.data = [dataSet1[1]];
                        }

                        self.paginationOptions.recordCount = self.gridOptions2.data.length;
                        return;
                    }
                } else if (newValue.checkFilter) {
                    self.gridOptions2.data = [dataSet1[2]];
                    self.paginationOptions.recordCount = self.gridOptions2.data.length;
                    return;
                }
            }
            self.gridOptions2.data = dataSet1;
            self.paginationOptions.recordCount = 30;

        }, true);

        $scope.$on('loadMoreRows', function (event, data) {
            self.gridOptions2.data = getPaginationDataSet(data.top, data.skip);
        });
    }

    PaginationGridTestController.$inject = ['$scope'];

    RunTemplateCache.$inject = ['$templateCache'];

    TemplateController.$inject = ['$scope'];

    GridTestController.$inject = ['$scope', '$filter', '$timeout'];

    angular.module('stache')
    .run(RunTemplateCache)
    .controller('TemplateController', TemplateController)
    .controller('GridTestController', GridTestController)
    .controller('PaginationGridTestController', PaginationGridTestController);

}());
