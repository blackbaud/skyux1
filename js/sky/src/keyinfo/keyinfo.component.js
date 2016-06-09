/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.keyinfo.component', [])
        .component('bbKeyInfo', {
            bindings: {
                bbKeyInfoLayout: '@?'
            }, 
            templateUrl: 'sky/templates/keyinfo/keyinfo.component.html',
            transclude: {
                value: 'bbKeyInfoValue',
                label: 'bbKeyInfoLabel'
            }
        });
}());