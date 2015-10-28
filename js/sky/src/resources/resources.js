/*global angular */

(function () {
    'use strict';

    var serviceModules = [];
    
    function bbResoucesFilter(bbResources) {
        return function (name) {
            return bbResources[name];
        };
    }
    
    bbResoucesFilter.$inject = ['bbResources'];

    angular.module('sky.resources', serviceModules)
        .constant('bbResources', {
            /* Strings are defined in separate JSON files located in js/sky/locales. */
        })
        .filter('bbResources', bbResoucesFilter);
}());