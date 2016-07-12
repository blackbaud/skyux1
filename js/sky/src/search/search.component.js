/* global angular */
(function () {
    'use strict';

    function Controller($element, bbMediaBreakpoints) {
        var ctrl = this,
            previousBreakpoint;
        
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

        function mediaBreakpointCallback(breakpoint) {
            // Search input should be hidden if screen is xs and previous breakpoint was not xs
            if (breakpoint.xs && (!previousBreakpoint || previousBreakpoint !== breakpoint.xs)) {
                ctrl.searchInputVisible = false;
            } else {
                ctrl.searchInputVisible = true;
            }
            
            previousBreakpoint = breakpoint;
        }

        function toggleSearchInput() {
            ctrl.searchInputVisible = !ctrl.searchInputVisible;
        }

        function destroySearch() {
            bbMediaBreakpoints.unregister(mediaBreakpointCallback);
        }

        bbMediaBreakpoints.register(mediaBreakpointCallback);

        ctrl.$onDestroy = destroySearch;

        ctrl.applySearchText = applySearchText;
        ctrl.toggleSearchInput = toggleSearchInput;
    }

    Controller.$inject = ['$element', 'bbMediaBreakpoints'];

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