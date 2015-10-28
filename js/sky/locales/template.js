/*jshint unused: false */
/*global angular, bbResourcesOverrides */

(function () {
'use strict';

var bbResourcesOverrides;
    
/*LOCALEJSON*/

angular.module('sky.resources')
    .config(['bbResources', function (bbResources) {
        angular.extend(bbResources, bbResourcesOverrides);
    }]);
}());