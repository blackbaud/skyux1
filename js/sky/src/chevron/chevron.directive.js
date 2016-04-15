/*global angular */

(function () {
    'use strict';

    function bbChevron() {
        return {
            bindToController: {
                bbChevronDirection: '=?'
            },
            controller: 'BBChevronController',
            controllerAs: 'bbChevron',
            scope: {},
            templateUrl: 'sky/templates/chevron/chevron.directive.html'
        };
    }

    angular.module('sky.chevron.directive', ['sky.chevron.controller'])
        .directive('bbChevron', bbChevron);
}());
