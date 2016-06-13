/*global angular */

(function () {
    'use strict';

    angular.module('sky.chevron.component', ['sky.chevron.controller'])
        .component('bbChevron', {
            bindings: {
                bbChevronDirection: '=?'
            },
            controller: 'BBChevronController',
            templateUrl: 'sky/templates/chevron/chevron.component.html'
        });
}());