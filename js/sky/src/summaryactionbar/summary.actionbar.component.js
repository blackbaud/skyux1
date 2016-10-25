/* global angular */
(function () {
    'use strict';

    function Controller() {
        
    }

    angular.module('sky.summary.actionbar.component', [])
        .component('bbSearchInput', {
            templateUrl: 'sky/templates/summaryactionbar/summary.actionbar.component.html',
            controller: Controller,
            transclude: true
        });
})();

