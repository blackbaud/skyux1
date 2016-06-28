/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.microlayout.component', [])
        .component('bbMicrolayout', {
            templateUrl: 'sky/templates/microlayout/microlayout.component.html',
            transclude: {
                heading: '?bbMicrolayoutHeading', 
                content: 'bbMicrolayoutContent'
            }
        });
}());