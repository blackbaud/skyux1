/* global angular */
(function () {
    'use strict';


    function Controller($element, $animate, $timeout, bbMediaBreakpoints) {
        var ctrl = this,
            animationSpeed = 150;
        
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
            ctrl.currentBreakpoint = breakpoint;
            // Search input should be hidden if screen is xs
            if (breakpoint.xs) {
                dismissSearchInput();
            } else {
                openSearchInput();
            }
            
            ctrl.currentBreakpoint = breakpoint;
        }

        function openSearchInput(focusInput) {

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
            if (ctrl.currentBreakpoint && ctrl.currentBreakpoint.xs) {
                containerEl.addClass('bb-search-and-dismiss-absolute');
            } else {
                containerEl.removeClass('bb-search-and-dismiss-absolute');
            }
            
            inputContainerEl.width(offset.left + buttonWidth);
            inputContainerEl.css('display', '');
            inputContainerEl.css('opacity', '0');
            dismissBtnEl.css('display', '');
            dismissBtnEl.css('visibility', '');
            ctrl.openButtonShown = false;
            inputContainerEl.animate(
                {
                    width: '100%',
                    opacity: 1
                }, 
                animationSpeed,
                'linear', 
                function () {
                    
                }
                
            );
            
            if (focusInput) {
                $element.find('input').focus();
            }
            
            

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
                animationSpeed,
                'linear',
                function () {
                    
                    containerEl.removeClass('bb-search-and-dismiss-absolute');
                    inputContainerEl.css('display', 'none');
                    dismissBtnEl.css('display', 'none');
                }
            );


        }

        function inputFocused(isFocused) {
            var inputContainerEl = $element.find('.bb-search-input-container');
            if (isFocused) {
                inputContainerEl.addClass('bb-search-input-focused');
            } else {
                inputContainerEl.removeClass('bb-search-input-focused');
            }
        }

        function searchTextBindingChanged() {
            ctrl.showClear = true;
            
            if (ctrl.currentBreakpoint && ctrl.currentBreakpoint.xs) {
                openSearchInput(true);
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
        ctrl.inputFocused = inputFocused;
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