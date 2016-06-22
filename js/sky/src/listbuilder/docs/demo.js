/*global angular */
(function () {
    'use strict';
    
    function ListbuilderTestController() {
        var self = this,
            data = [
            {
                name: 'First',
                content: 'Content 1'
            },
            {
                name: 'Second',
                content: 'Content 2'
            },
            {
                name: 'Third',
                content: 'Content 3'
            },
            {
                name: 'Fourth',
                content: 'Content 4'
            },
            {
                name: 'Fifth',
                content: 'Content 5'
            }];

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

        self.onSearch = onSearch;
      
        self.data = data;


        
    }
    
    angular
        .module('stache')
        .controller('ListbuilderTestController', ListbuilderTestController);
}());