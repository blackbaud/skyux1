/*global angular */

(function () {
    'use strict';
    
    function MomentTestController(bbMoment) {
        var self = this;
        
        self.momentDate = bbMoment().format('MMMM Do YYYY, h:mm:ss a');
    }
    
    MomentTestController.$inject = ['bbMoment'];
    
    angular.module('stache').controller('MomentTestController', MomentTestController);
    
}());