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

        function mediaBreakpointCallback(breakpoint) {

            // Search input should be hidden if screen is xs
            if (breakpoint.xs) {
                dismissSearchInput();
            } else {
                openSearchInput();
            }
            
            ctrl.currentBreakpoint = breakpoint;
        }

        function openSearchInput() {

            var openEl, 
                containerEl,
                inputContainerEl,
                offset,
                dismissBtnEl = $element.find('.bb-search-btn-dismiss'),
                buttonWidth;
                
                
            openEl = $element.find('.bb-search-open');
            containerEl = $element.find('.bb-search-and-dismiss');
            inputContainerEl = $element.find('.bb-search-input-container');
            
            offset = $element.position();
            buttonWidth = openEl.outerWidth();
            containerEl.addClass('bb-search-and-dismiss-absolute');
            inputContainerEl.width(offset.left + buttonWidth);
            inputContainerEl.css('opacity', '0');
            inputContainerEl.css('display', '');
            dismissBtnEl.css('visibility', '');
            ctrl.openButtonShown = false;
            inputContainerEl.animate(
                {
                    width: '100%',
                    opacity: 1
                }, 
                150,
                'linear'
                
            );

        }

        function dismissSearchInput() {
            var inputContainerEl = $element.find('.bb-search-input-container'),
                containerEl = $element.find('.bb-search-and-dismiss'),
                openEl = $element.find('.bb-search-open'),
                dismissBtnEl = $element.find('.bb-search-btn-dismiss'),
                buttonWidth,
                widthString,
                offset;

            offset = $element.position();
            buttonWidth = openEl.outerWidth();
            widthString = (offset.left + buttonWidth) + 'px';
            dismissBtnEl.css('visibility', 'hidden');
            ctrl.openButtonShown = true;
            inputContainerEl.animate(
                {
                    opacity: 0,
                    width: widthString
                },
                150,
                'linear',
                function () {
                    containerEl.removeClass('bb-search-and-dismiss-absolute');
                    inputContainerEl.css('display', 'none');
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