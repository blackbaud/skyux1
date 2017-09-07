/* global angular */
(function () {
    'use strict';


    function Controller($element, bbMediaBreakpoints, bbResources, $scope) {
        var ctrl = this,
            animationSpeed = 150,
            animationEase = 'linear';
            
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

        function searchTextChanged(searchText) {
            if (angular.isFunction(ctrl.bbOnSearchTextChanged)) {
                ctrl.bbOnSearchTextChanged({searchText: searchText});
            }
        }

        function setInputFocus() {
            $element.find('input').focus();
        }

        function clearSearchText() {
            ctrl.bbSearchText = '';

            setInputFocus();

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
        }

        function findDismissEl() {
            return $element.find('.bb-search-btn-dismiss');
        }

        function findOpenEl() {
            return $element.find('.bb-search-open');
        }

        function findSearchAndDismissEl() {
            return $element.find('.bb-search-and-dismiss');
        }

        function findInputContainerEl() {
            return $element.find('.bb-search-input-container');
        }

        function findComponentContainerEl() {
            return $element.parents('.bb-search-input-component-container');
        }

        function getExpectedInputWidth() {
            var openEl,
                offset,
                buttonWidth;

            openEl = findOpenEl();
            offset = $element.position();
            buttonWidth = openEl.outerWidth();

            return offset.left + buttonWidth;
        }

        function toggleMobileInputVisible(isVisible) {
            var searchAndDismissEl = findSearchAndDismissEl(),
                absolutePositionClass = 'bb-search-and-dismiss-absolute',
                containerHiddenClass = 'bb-search-input-component-container-hidden',
                containerEl = findComponentContainerEl();

            if (isVisible) {
                searchAndDismissEl.addClass(absolutePositionClass);
                if (containerEl.length > 0) {
                    containerEl.addClass(containerHiddenClass);
                }
            } else {
                searchAndDismissEl.removeClass(absolutePositionClass);
                if (containerEl.length > 0) {
                    containerEl.removeClass(containerHiddenClass);
                }
            }
        }

        function toggleInputShown(isVisible) {
            var inputContainerEl = findInputContainerEl(),
                inputHiddenClass = 'bb-search-input-container-hidden';

            if (isVisible) {
                inputContainerEl.removeClass(inputHiddenClass);
            } else {
                inputContainerEl.addClass(inputHiddenClass);
            }
        }


        function setupInputAnimation(inputContainerEl, expectedWidth) {
            inputContainerEl.width(expectedWidth);
            toggleInputShown(true);

            // Set opacity to 0 to fade in input initially
            inputContainerEl.css('opacity', '0');
        }

        function toggleDismissShown(isVisible) {
            var dismissBtnEl = findDismissEl(),
                dismissHiddenClass = 'bb-search-btn-dismiss-hidden';
            if (isVisible) {
                dismissBtnEl.removeClass(dismissHiddenClass);
            } else {
                dismissBtnEl.addClass(dismissHiddenClass);
            }
        }

        function openSearchInput(focusInput) {

            var inputContainerEl,
                expectedWidth = getExpectedInputWidth();

            inputContainerEl = findInputContainerEl();

            toggleMobileInputVisible(ctrl.currentBreakpoint && ctrl.currentBreakpoint.xs);

            setupInputAnimation(inputContainerEl, expectedWidth);
            toggleDismissShown(true);
            ctrl.openButtonShown = false;

            inputContainerEl.animate(
                {
                    width: '100%',
                    opacity: 1
                },
                animationSpeed,
                animationEase
            );

            //Do not focus input on mediabreakpoint change, only on actual interaction
            if (focusInput) {
                setInputFocus();
            }

        }

        function dismissSearchInput() {
            var inputContainerEl = findInputContainerEl(),
                expectedWidth = getExpectedInputWidth(),
                widthString;

            widthString = expectedWidth + 'px';
            toggleDismissShown(false);
            ctrl.openButtonShown = true;
            inputContainerEl.animate(
                {
                    opacity: 0,
                    width: widthString
                },
                animationSpeed,
                animationEase,
                function () {
                    toggleMobileInputVisible(false);
                    toggleInputShown(false);
                }
            );


        }

        function inputFocused(isFocused) {
            var inputContainerEl = findInputContainerEl(),
                focusedClass = 'bb-search-input-focused';

            if (isFocused) {
                inputContainerEl.addClass(focusedClass);
            } else {
                inputContainerEl.removeClass(focusedClass);
            }
        }

        function searchTextBindingChanged() {
            ctrl.showClear = angular.isDefined(ctrl.bbSearchText) && ctrl.bbSearchText !== '';
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

            if (changesObj.bbSearchPlaceholder) {
                /* istanbul ignore else */
                /* sanity check */
                if (angular.isDefined(changesObj.bbSearchPlaceholder.currentValue)) {
                    ctrl.placeholderText = changesObj.bbSearchPlaceholder.currentValue;
                }
            }
        }

        function listenForApplyEvent() {
            $scope.$on('bbSearchInputApply', function (event, searchText) {
                if (angular.isDefined(searchText)) {
                    ctrl.bbSearchText = searchText;
                }
                applySearchText(ctrl.bbSearchText);
            });
        }

        function initSearch() {
            if (angular.isUndefined(ctrl.bbSearchMobileResponseEnabled) || ctrl.bbSearchMobileResponseEnabled) {
                bbMediaBreakpoints.register(mediaBreakpointCallback);
                ctrl.$onDestroy = destroySearch;
            }
            
            if (ctrl.bbSearchText) {
                searchTextBindingChanged();
            }

            if (angular.isUndefined(ctrl.bbSearchPlaceholder) && angular.isDefined($element.attr('bb-search-placeholder'))) {
                ctrl.placeholderText = bbResources.search_placeholder;
            } else {
                ctrl.placeholderText = ctrl.bbSearchPlaceholder;
            }

            listenForApplyEvent();
        }


        function destroySearch() {
            bbMediaBreakpoints.unregister(mediaBreakpointCallback);
        }

        ctrl.$onInit = initSearch;
        ctrl.$onChanges = bindingChanges;

        ctrl.applySearchText = applySearchText;
        ctrl.searchTextChanged = searchTextChanged;
        ctrl.clearSearchText = clearSearchText;
        ctrl.openSearchInput = openSearchInput;
        ctrl.dismissSearchInput = dismissSearchInput;
        ctrl.inputFocused = inputFocused;
    }

    Controller.$inject = ['$element', 'bbMediaBreakpoints', 'bbResources', '$scope'];

    angular.module('sky.search.input.component', ['sky.resources', 'sky.mediabreakpoints'])
        .component('bbSearchInput', {
            templateUrl: 'sky/templates/search/search.input.component.html',
            controller: Controller,
            bindings: {
                bbOnSearch: '&?',
                bbOnSearchTextChanged: '&?',
                bbSearchText: '<?',
                bbSearchPlaceholder: '<?',
                bbSearchMobileResponseEnabled: '<?',
                bbSearchInputId: '<?',
                bbSearchFullWidth: '<?',
                bbSearchSkipButtonWhileTabbing: '<?'
            }
        });
})();
