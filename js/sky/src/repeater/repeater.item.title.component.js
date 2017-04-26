/*global angular */

(function () {
    'use strict';

    angular.module('sky.repeater.item.title.component', [])
        .component('bbRepeaterItemTitle', {
            templateUrl: 'sky/templates/repeater/repeater.item.title.component.html',
            transclude: true
        });
})();