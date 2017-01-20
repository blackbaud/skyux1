/*global angular */
(function () {
    'use strict';
    
    function ListbuilderTestController($timeout) {
        var self = this,
            contentCount = 1,
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
                        caption: 'Content',
                        jsonmap: 'content',
                        id: 2,
                        name: 'content',
                        width_all: 300,
                        width_xs: 100
                    }
                ],
                getContextMenuItems: function () {
                    return [
                        {
                            id: 'menu',
                            title: 'Option1',
                            cmd: function () {
                                return false;
                            }
                        }
                    ];
                },
                multiselect: true,
                selectedColumnIds: [1, 2],
                columnPickerHelpKey: 'bb-security-users.html'
            },
            data;

        function createData(amount) {
            var i,
                newData = [];

            for (i = 0; i < amount; i++) {
                newData.push(
                    {
                        id: i,
                        name: (contentCount + ' Title'),
                        content: (contentCount + ' Content')
                    }
                );
                contentCount++;

            }

            return newData;
        }

        function onSearch(searchText, highlightResults) {
            var filteredData = data;
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
            self.gridOptions.data = filteredData;
            if (angular.isFunction(highlightResults)) {
                highlightResults();
            } 

        }

        function onLoadMore(loadingComplete) {
            $timeout(function () {
                var newData = createData(5);

                data = data.concat(newData);
                self.gridOptions.data = data;
                loadingComplete();
            }, 4000);
            
        }

        self.payMembershipSelections = [];
        self.secondarySelections = [0];

        self.onSearch = onSearch;
        self.onLoadMore = onLoadMore;
      
        data = createData(5);
        self.gridOptions = gridOptions;
        self.gridOptions.data = data;
        
    }

    ListbuilderTestController.$inject = ['$timeout'];
    
    angular
        .module('screenshots', ['sky'])
        .controller('ListbuilderTestController', ListbuilderTestController);
}());