/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.microlayoutcontent.component', [])
        .component('bbMicrolayoutContent', {
            templateUrl: 'sky/templates/microlayout/microlayoutcontent.component.html',
            transclude: {
                value: 'bbMicrolayoutValue',
                label: 'bbMicrolayoutLabel'
            }
        });
}());