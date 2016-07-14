/* global angular */
(function () {
    'use strict';

    function Controller($element, bbMediaBreakpoints) {
        var ctrl = this;
        
        function applySearchText(searchText) {

            //select input
            var searchEl = $element.find('.bb-search-input');

            ctrl.showClear = searchText && searchText !== '';
            
            /*istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(searchEl.select) && searchEl.length > 0 && searchText) {
                searchEl.eq(0).select();
            }

            //search callback
            ctrl.bbOnSearch({searchText: searchText});
            
        }

        function clearSearchText() {
            var inputEl = $element.find('input');

            ctrl.bbSearchText = '';
            if (!ctrl.currentBreakpoint.xs || inputEl.is(':focus')) {
                inputEl.focus();
            }
            
            ctrl.showClear = false;
            ctrl.bbOnSearch({searchText: ctrl.bbSearchText});
            
        }

        function inputChanged() {
            if (!ctrl.bbSearchText || ctrl.bbSearchText === '') {
                ctrl.showClear = false;
            }
        }

        function mediaBreakpointCallback(breakpoint) {

            // Search input should be hidden if screen is xs and previous breakpoint was not xs
            if (breakpoint.xs && (!ctrl.currentBreakpoint || ctrl.currentBreakpoint !== breakpoint.xs)) {
                ctrl.searchInputVisible = false;
            } else {
                ctrl.searchInputVisible = true;
            }


            if (angular.isFunction(ctrl.bbOnSearchInputToggled)) {
                ctrl.bbOnSearchInputToggled({isVisible: false});
            }
            
            ctrl.currentBreakpoint = breakpoint;
        }

        function toggleSearchInput() {
            ctrl.searchInputVisible = !ctrl.searchInputVisible;
            if (angular.isFunction(ctrl.bbOnSearchInputToggled)) {
                ctrl.bbOnSearchInputToggled({isVisible: ctrl.searchInputVisible});
            }
        }

        // Trigger highlight if bbListbuilderSearchText binding changes from parent.
        function bindingChanges(changesObj) {
            var searchText;
            if (changesObj.bbSearchText) {
                searchText = changesObj.bbSearchText;
                /* istanbul ignore else */
                /* sanity check */
                if (searchText.currentValue !== searchText.previousValue) {
                    ctrl.showClear = true;
                }
            }
        }

        function destroySearch() {
            bbMediaBreakpoints.unregister(mediaBreakpointCallback);
        }

        function initSearch() {
            if (ctrl.bbSearchText) {
                ctrl.showClear = true;
            }
        }

        bbMediaBreakpoints.register(mediaBreakpointCallback);

        ctrl.$onInit = initSearch;
        ctrl.$onChanges = bindingChanges;
        ctrl.$onDestroy = destroySearch;

        ctrl.applySearchText = applySearchText;
        ctrl.clearSearchText = clearSearchText;
        ctrl.inputChanged = inputChanged;
        ctrl.toggleSearchInput = toggleSearchInput;
    }

    Controller.$inject = ['$element', 'bbMediaBreakpoints'];

    angular.module('sky.search.component', ['sky.resources'])
        .component('bbSearchInput', {
            templateUrl: 'sky/templates/search/search.component.html',
            controller: Controller,
            bindings: {
                bbOnSearch: '&?',
                bbSearchText: '<?',
                bbOnSearchInputToggled: '&?'
            }
        });
}());