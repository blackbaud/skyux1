/* global angular */
(function () {
    'use strict';

    function Controller($element, bbViewKeeperBuilder) {
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

        function initToolbar() {
            if (ctrl.bbListbuilderSearchText) {
                ctrl.listbuilderCtrl.highlightSearchText(ctrl.bbListbuilderSearchText);
            }
            
            setupViewKeeper();

        }

        function destroyToolbar() {
            if (vkToolbar) {
                vkToolbar.destroy();
            }
        }

        // Lifecycle hooks
        ctrl.$postLink = initToolbar;
        ctrl.$onChanges = bindingChanges;
        ctrl.$onDestroy = destroyToolbar;

        ctrl.applySearchText = applySearchText;
        ctrl.searchTextChanged = searchTextChanged;
        ctrl.viewChanged = viewChanged;

    }

    Controller.$inject = ['$element', 'bbViewKeeperBuilder'];

    angular.module('sky.listbuilder.toolbar.component', 
        [
            'sky.resources', 
            'sky.viewkeeper', 
            'sky.listbuilder.add.component',       
            'sky.filter',
            'sky.search'
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
                bbListbuilderFilterSummary: '?bbListbuilderFilterSummary'
            },
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }
        });
}());