/* global angular */
(function () {
    'use strict';

    function Controller($element, $animate, $timeout, bbMediaBreakpoints) {
        var ctrl = this,
            animateEl;
        
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
                ctrl.openButtonShown = true;
                ctrl.searchInputVisible = false;
            } else {
                ctrl.openButtonShown = false;
                ctrl.searchInputVisible = true;
                
            }

            //Dismissable search input is not visible on screen change.
            toggleCallback(false);
            
            ctrl.currentBreakpoint = breakpoint;
        }

        

        function openSearchInput() {
            toggleCallback(true);
            ctrl.searchInputVisible = true;
            $timeout(function () {
                $animate.removeClass(animateEl, 'bb-search-animate').then(function () {
                    ctrl.openButtonShown = false;
                    
                });
            });
           

        }

        function dismissSearchInput() { 
            ctrl.openButtonShown = true;
            $timeout(function () {
                $animate.addClass(animateEl, 'bb-search-animate').then(function () {
                    ctrl.searchInputVisible = false;
                    
                    toggleCallback(false);
                });
            });
            
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

        function postLink() {
            animateEl = $element.find('.bb-search-open');
        }

        function destroySearch() {
            bbMediaBreakpoints.unregister(mediaBreakpointCallback);
        }

        bbMediaBreakpoints.register(mediaBreakpointCallback);

        ctrl.$onInit = initSearch;
        ctrl.$postLink = postLink;
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