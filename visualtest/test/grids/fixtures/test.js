/* global angular */

(function () {
    'use strict';

    function GridTestController($scope, $filter) {
        var self = this,
            action1,
            action2,
            dataSet1 = [
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
                name: 'Jermey',
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
            ];

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

        action1 = {
            actionCallback: function () {
                angular.noop();
            },
            automationId: 'Action1Button',
            isPrimary: true,
            selections: [],
            title: 'Guitar Action'
        };

        action2 = {
            actionCallback: function () {
                angular.noop();
            },
            automationId: 'Action2Button',
            isPrimary: false,
            selections: [],
            title: 'Drum Action'
        };

        self.appliedFilters = {
            instruments: []
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
                    caption: 'Date',
                    jsonmap: 'mydate',
                    id: 5,
                    name: 'mydate',
                    width_all: 200
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
            selectedColumnIds: [1, 2, 3, 5],
            columnPickerHelpKey: 'bb-security-users.html',
            columnPickerMode: 'list'
        };

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
                angular.noop();
            },
            onAddClickLabel: 'Add button',
            selectedColumnIds: [1, 2, 3],
            columnPickerHelpKey: 'bb-security-users.html',
            sortOptions: {
                descending: true
            },
            hasInlineFilters: true,
            filters: {}
        };

        self.paginationOptions = {
            recordCount: 30
        };

        self.guitarFilter = false;
        self.drumsFilter = false;
        self.updateActions = updateActions;

        function getDataSet(top, skip) {
            if (skip === 0 || skip === 15) {
                return dataSet1;
            } else if (skip === 5 || skip === 20) {
                return dataSet2;
            } else {
                return dataSet3;
            }
        }

        $scope.$on('loadMoreRows', function (event, data) {
            self.gridOptions2.data = getDataSet(data.top, data.skip);
        });

        $scope.$watch(function () {
            return self.gridOptions2.filters;
        }, function (newValue) {
            self.gridOptions2.filtersAreActive = newValue && (newValue.checkFilter || newValue.selectFilter);

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
            return self.gridOptions.filters;
        }, function () {
            filterAndSearch();
        });

    }

    GridTestController.$inject = ['$scope', '$filter'];

    angular.module('screenshots', ['sky'])
    .controller('GridTestController', GridTestController);

}());
