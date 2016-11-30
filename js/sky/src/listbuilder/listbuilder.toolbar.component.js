/* global angular */
(function () {
    'use strict';

    function Controller($element, bbViewKeeperBuilder, $scope) {
        var ctrl = this,
            vkToolbar;

        function applySearchText(searchText) {
            var highlightPromise;

            highlightPromise = ctrl.bbListbuilderOnSearch({searchText: searchText});

            if (highlightPromise && angular.isFunction(highlightPromise.then)) {
                // Allow user to call highlight promise after applying search callback
                highlightPromise.then(function () {
                    ctrl.listbuilderCtrl.highlightSearchText(searchText);
                });
            } else {
                ctrl.listbuilderCtrl.highlightSearchText(searchText);
            }
            
        }

        function searchTextChanged(searchText) {
            if (angular.isFunction(ctrl.bbListbuilderOnSearchTextChanged)) {
                ctrl.bbListbuilderOnSearchTextChanged({searchText: searchText});
            }  
        }

        // Floating headers
        function setupViewKeeper() {
            if (ctrl.bbListbuilderToolbarFixed !== 'true') {

                /* istanbul ignore next */
                /* sanity check */
                if (vkToolbar) {
                    vkToolbar.destroy();
                }

                vkToolbar = new bbViewKeeperBuilder.create({
                    el: $element.find('.bb-listbuilder-toolbar-summary-container'),
                    boundaryEl: ctrl.listbuilderCtrl.getContentContainer(),
                    setWidth: true,
                    verticalOffSetElId: ctrl.bbListbuilderVerticalOffsetElId
                });
            }
        }

        function destroyViewKeeper() {
            if (vkToolbar) {
                vkToolbar.destroy();
            }
        }

        function viewChanged(newView) {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.listbuilderCtrl.setCurrentView)) {
                ctrl.listbuilderCtrl.setCurrentView(newView);
            }
        }

        // Trigger highlight if bbListbuilderSearchText binding changes from parent.
        function bindingChanges(changesObj) {
            var searchText;
            if (changesObj.bbListbuilderSearchText) {
                searchText = changesObj.bbListbuilderSearchText;
                /* istanbul ignore else */
                /* sanity check */
                if (searchText.currentValue !== searchText.previousValue) {
                    ctrl.listbuilderCtrl.highlightSearchText(searchText.currentValue);
                }
            }
        }

        function getToolbarId() {
            return ctrl.listbuilderToolbarId;
        }

        function getTopScrollbar() {
            return $element.find('.bb-listbuilder-toolbar-top-scrollbar');
        }

        function setupTopScrollbar() {
            var topScrollbarEl = getTopScrollbar();

            if (topScrollbarEl.length > 0) {
                topScrollbarEl.on('scroll', function () {
                    if (angular.isFunction(ctrl.listbuilderCtrl.topScrollbarScrollAction)) {
                        ctrl.listbuilderCtrl.topScrollbarScrollAction();
                    }
                });
            }
        }

        function destroyTopScrollbar() {
            var topScrollbarEl = getTopScrollbar();

            if (topScrollbarEl.length > 0) {
                topScrollbarEl.off('scroll');
            }
        }

        function initToolbar() {
            if (ctrl.bbListbuilderSearchText) {
                ctrl.listbuilderCtrl.highlightSearchText(ctrl.bbListbuilderSearchText);
            }

            ctrl.listbuilderCtrl.getToolbarId = getToolbarId;

            ctrl.listbuilderCtrl.getTopScrollbar = getTopScrollbar;

            ctrl.listbuilderToolbarId = 'bb-listbuilder-toolbar-' + $scope.$id;
            
            setupTopScrollbar();
            
            setupViewKeeper();

        }

        function destroyToolbar() {
            destroyViewKeeper();
            destroyTopScrollbar();

        }

        // Lifecycle hooks
        ctrl.$postLink = initToolbar;
        ctrl.$onChanges = bindingChanges;
        ctrl.$onDestroy = destroyToolbar;

        ctrl.applySearchText = applySearchText;

        ctrl.searchTextChanged = searchTextChanged;
        ctrl.viewChanged = viewChanged;

    }

    Controller.$inject = ['$element', 'bbViewKeeperBuilder', '$scope'];

    angular.module('sky.listbuilder.toolbar.component', 
        [
            'sky.resources', 
            'sky.viewkeeper', 
            'sky.listbuilder.add.component',       
            'sky.filter',
            'sky.search',
            'sky.sort',
            'sky.listbuilder.multiselect.component',
            'sky.listbuilder.secondary.actions.component'
        ])
        .component('bbListbuilderToolbar', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.toolbar.component.html',
            bindings: {
                bbListbuilderOnSearch: '&?',
                bbListbuilderOnSearchTextChanged: '&?',
                bbListbuilderSearchText: '<?',
                bbListbuilderSearchPlaceholder: '<?',
                bbListbuilderVerticalOffsetElId: '<?',
                bbListbuilderToolbarFixed: '@?'
            },
            transclude: {
                bbListbuilderAdd: '?bbListbuilderAdd',
                bbListbuilderFilter: '?bbListbuilderFilter',
                bbListbuilderSort: '?bbListbuilderSort',
                bbListbuilderFilterSummary: '?bbListbuilderFilterSummary',
                bbListbuilderToolbarMultiselect: '?bbListbuilderToolbarMultiselect',
                bbListbuilderToolbarSecondaryActions: '?bbListbuilderToolbarSecondaryActions'
            },
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }
        });
}());