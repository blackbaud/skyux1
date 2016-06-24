/*global angular */
(function () {
    'use strict';
    
    function ListbuilderTestController() {
        var self = this,
            contentCount = 1;

        function createData(amount) {
            var i,
                newData = [],
                dataIndex;

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

        function onSearch(searchText, highlightResults) {
            var filteredData = data;
            if (searchText) {
                filteredData = data.filter(function (item) {
                    var property;
                    for (property in item) {
                        if (item.hasOwnProperty(property)) {
                            if (item[property].indexOf(searchText) > -1) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
               

            }
            self.data = filteredData;
            if (angular.isFunction(highlightResults)) {
                highlightResults();
            } 

        }

        function onLoadMore() {
            var newData = createData(5);

            self.data = self.data.concat(newData);
        }

        self.onSearch = onSearch;
        self.onLoadMore = onLoadMore;
      
        self.data = createData(5);
        
    }
    
    angular
        .module('stache')
        .controller('ListbuilderTestController', ListbuilderTestController);
}());