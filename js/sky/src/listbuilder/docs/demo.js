/*global angular */
(function () {
    'use strict';
    
    function ListbuilderTestController($timeout) {
        var self = this,
            contentCount = 1,
            data;

        function createData(amount) {
            var i,
                newData = [];

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
            self.searchText = searchText;
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
            self.data = filteredData;
            if (angular.isFunction(highlightResults)) {
                highlightResults();
            } 

        }

        function onLoadMore(loadingComplete) {
            $timeout(function () {
                var newData = createData(5);

                data = data.concat(newData);
                self.data = data;
                onSearch(self.searchText);
                loadingComplete();
            }, 4000);
            
        }

        self.onSearch = onSearch;
        self.onLoadMore = onLoadMore;
      
        data = createData(5);
        self.data = data;
        
    }

    ListbuilderTestController.$inject = ['$timeout'];
    
    angular
        .module('stache')
        .controller('ListbuilderTestController', ListbuilderTestController);
}());