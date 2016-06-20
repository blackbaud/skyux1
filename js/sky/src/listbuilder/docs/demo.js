/*global angular */
(function () {
    'use strict';
    
    function ListbuilderTestController() {
        var self = this;
      
        self.data = [
        {
            name: 'First',
            content: 'Content 1'
        },
        {
            name: 'Second',
            content: 'Content 2'
        }];
    }
    
    angular
        .module('stache')
        .controller('ListbuilderTestController', ListbuilderTestController);
}());