/*global angular */
(function () {
    'use strict';
    
    function PaginationTestController(bbPaging) {
        var self = this,
            items = [
                {text: 'Item 1'},
                {text: 'Item 2'},
                {text: 'Item 3'},
                {text: 'Item 4'},
                {text: 'Item 5'},
                {text: 'Item 6'},
                {text: 'Item 7'},
                {text: 'Item 8'},
                {text: 'Item 9'},
                {text: 'Item 10'},
                {text: 'Item 11'},
                {text: 'Item 12'}
            ];
        
        self.itemsPaged = bbPaging.init(items);
    }
    
    PaginationTestController.$inject = ['bbPaging'];
    
    angular.module('screenshots', ['sky'])
    .controller('PaginationTestController', PaginationTestController);
}());