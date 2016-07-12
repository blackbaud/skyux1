/* global angular */
(function () {
    'use strict';

    function Controller($element) {
        var ctrl = this;
        function applySearchText(searchText) {

            //select input
            var searchEl = $element.find('.bb-search-input');
            
            /*istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(searchEl.select) && searchEl.length > 0 && searchText) {
                searchEl.eq(0).select();
            }

            //search callback
            ctrl.bbOnSearch({searchText: searchText});
            
        }

        ctrl.applySearchText = applySearchText;
    }

    Controller.$inject = ['$element'];

    angular.module('sky.search.component', ['sky.resources'])
        .component('bbSearchInput', {
            templateUrl: 'sky/templates/search/search.component.html',
            controller: Controller,
            bindings: {
                bbOnSearch: '&?',
                bbSearchText: '<?'
            }
        });
}());