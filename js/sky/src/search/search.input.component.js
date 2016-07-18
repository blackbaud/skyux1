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
            
            inputEl.focus();

            ctrl.showClear = false;
            ctrl.bbOnSearch({searchText: ctrl.bbSearchText});
            
        }

        function mediaBreakpointCallback(breakpoint) {

            // Search input should be hidden if screen is xs
            if (breakpoint.xs) {
                ctrl.searchInputVisible = false;
            } else {
                ctrl.searchInputVisible = true;
            }


            if (angular.isFunction(ctrl.bbOnSearchInputToggled)) {
                //Dismissable search input is not visible on screen change.
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

        function searchTextBindingChanged() {
            ctrl.showClear = true;
            ctrl.searchInputVisible = true;
            if (angular.isFunction(ctrl.bbOnSearchInputToggled) && ctrl.currentBreakpoint && ctrl.currentBreakpoint.xs) {
                ctrl.bbOnSearchInputToggled({isVisible: true});
            }
        }

        // Trigger highlight if bbListbuilderSearchText binding changes from parent.
        function bindingChanges(changesObj) {
            var searchText;
            /* istanbul ignore else */
            /* sanity check */
            if (changesObj.bbSearchText) {
                searchText = changesObj.bbSearchText;
                /* istanbul ignore else */
                /* sanity check */
                if (searchText.currentValue !== searchText.previousValue) {
                    searchTextBindingChanged();
                }
            }
        }

        function initSearch() {
            if (ctrl.bbSearchText) {
                searchTextBindingChanged();
            }
        }

        function destroySearch() {
            bbMediaBreakpoints.unregister(mediaBreakpointCallback);
        }

        bbMediaBreakpoints.register(mediaBreakpointCallback);

        ctrl.$onInit = initSearch;
        ctrl.$onChanges = bindingChanges;
        ctrl.$onDestroy = destroySearch;

        ctrl.applySearchText = applySearchText;
        ctrl.clearSearchText = clearSearchText;
        ctrl.toggleSearchInput = toggleSearchInput;
    }

    Controller.$inject = ['$element', 'bbMediaBreakpoints'];

    angular.module('sky.search.input.component', ['sky.resources', 'sky.mediabreakpoints'])
        .component('bbSearchInput', {
            templateUrl: 'sky/templates/search/search.input.component.html',
            controller: Controller,
            bindings: {
                bbOnSearch: '&?',
                bbSearchText: '<?',
                bbOnSearchInputToggled: '&?'
            }
        });
}());