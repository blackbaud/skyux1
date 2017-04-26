/*global angular */

(function () {
    'use strict';

    angular.module('sky.repeater.component', ['sky.repeater.controller'])
        .component('bbRepeater', {
            bindings: {
                bbRepeaterExpandMode: '@?'
            },
            controller: 'BBRepeaterController',
            templateUrl: 'sky/templates/repeater/repeater.component.html',
            transclude: true
        });
})();
