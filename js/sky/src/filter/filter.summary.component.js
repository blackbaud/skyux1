/* global angular */
(function () {
    'use strict';

    angular.module('sky.filter.summary.component', ['sky.resources'])
        .component('bbFilterSummary', {
            templateUrl: 'sky/templates/filter/filter.summary.component.html',
            transclude: true
        });
})();