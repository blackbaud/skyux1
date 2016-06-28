/*global angular */
(function () {
    'use strict';
    
    function ListbuilderTestController($timeout) {
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

        function onLoadMore(loadingComplete) {
            $timeout(function () {
                var newData = createData(5);

                self.data = self.data.concat(newData);
                loadingComplete();
            }, 4000);
            
        }

        self.onSearch = onSearch;
        self.onLoadMore = onLoadMore;
      
        self.data = createData(5);
        
    }

    ListbuilderTestController.$inject = ['$timeout'];
    
    angular
        .module('stache')
        .controller('ListbuilderTestController', ListbuilderTestController);
}());