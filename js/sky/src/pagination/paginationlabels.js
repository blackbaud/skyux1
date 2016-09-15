/* global angular */
(function () {
    'use strict';

    function getPaginationLabelDirective(labelText) {
        function link($scope, el) {
            el.find('a').attr('aria-label', labelText);
        }
        return {
            restrict: 'C',
            link: link
        };
    }

    function paginationPrev(bbResources) {
        return getPaginationLabelDirective(bbResources.pagination_previous);
    }

    paginationPrev.$inject = ['bbResources'];

    function paginationNext(bbResources) {
        return getPaginationLabelDirective(bbResources.pagination_next);
    }

    paginationNext.$inject = ['bbResources'];

    angular.module('sky.pagination.label', ['ui.bootstrap.pagination', 'sky.resources'])
        .directive('paginationPrev', paginationPrev)
        .directive('paginationNext', paginationNext);
})();