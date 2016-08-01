/* global angular */
(function () {
    'use strict';

    angular.module('sky.filter.button.component', ['sky.resources'])
        .component('bbFilterButton', {
            templateUrl: 'sky/templates/filter/filter.button.component.html',
            bindings: {
                bbFilterButtonOnClick: '&'
            }
        });
})();