/* global angular */
(function () {
    'use strict';

    function Controller($element, $animate, $timeout, bbMediaBreakpoints) {
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

        function toggleCallback(isVisible) {
            if (angular.isFunction(ctrl.bbOnSearchInputToggled)) {
                ctrl.bbOnSearchInputToggled({isVisible: isVisible});
            }
        }

        function mediaBreakpointCallback(breakpoint) {

            // Search input should be hidden if screen is xs
            if (breakpoint.xs) {
                dismissSearchInput();
            } else {
                openSearchInput();
            }

            //Dismissable search input is not visible on screen change.
            toggleCallback(false);
            
            ctrl.currentBreakpoint = breakpoint;
        }

        

        function openSearchInput() {
            var animateEl = $element.find('.bb-search-input-container');

            toggleCallback(true);
            $animate.removeClass(animateEl, 'bb-search-small').then(
                function () {
                    ctrl.searchInputVisible = true;
                    ctrl.openButtonShown = false;
                }   
            );
        }

        function dismissSearchInput() {
            var animateEl = $element.find('.bb-search-input-container');
            $animate.addClass(animateEl, 'bb-search-small').then(
                function () {
                    ctrl.openButtonShown = true;
                    ctrl.searchInputVisible = false;
                    
                    toggleCallback(false);
                }
            ); 
        }

        function searchTextBindingChanged() {
            ctrl.showClear = true;
            
            if (ctrl.currentBreakpoint && ctrl.currentBreakpoint.xs) {
                openSearchInput();
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
        ctrl.openSearchInput = openSearchInput;
        ctrl.dismissSearchInput = dismissSearchInput;
    }

    Controller.$inject = ['$element', '$animate', '$timeout', 'bbMediaBreakpoints'];

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