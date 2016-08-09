/* global angular */

(function () {
    'use strict';

    function linkFn($scope, el) {
        el.addClass('bb-search-input-component-container');
    }

    angular.module('sky.search.container.directive', [])
        .directive('bbSearchContainer', function () {
            return {
                restrict: 'A',
                link: linkFn
            };
        });
})();

