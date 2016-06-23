/* global angular */
(function () {
    'use strict';

    function BBListbuilderToolbarController($element, $q, bbViewKeeperBuilder) {
        var ctrl = this;

        function applySearchText(searchText) {

            //select input
            var searchEl = $element.find('bb-listbuilder-search-input'),
                deferred = $q.defer(),
                highlightPromise;
            highlightPromise = deferred.promise;
            
            /*istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(searchEl.select) && searchEl.length > 0 && searchText) {
                searchEl.eq(0).select();
            }
            // Allow user to call highlight promise after applying search callback
            highlightPromise.then(function () {
                ctrl.listbuilderCtrl.highlightSearchText(searchText);
            });

            //search callback
            ctrl.bbListbuilderOnSearch({searchText: searchText, highlightResults: deferred.resolve});
            
        }

        // Floating headers
        function setupViewKeeper() {
            if (!ctrl.bbListbuilderToolbarFixed || ctrl.bbListbuilderToolbarFixed === 'false') {
                if (ctrl.vkToolbar) {
                    ctrl.vkToolbar.destroy();
                }

                ctrl.vkToolbar = new bbViewKeeperBuilder.create({
                    el: $element.find('.bb-listbuilder-toolbar'),
                    boundaryEl: ctrl.listbuilderCtrl.getContentContainer(),
                    setWidth: true,
                    verticalOffSetElId: ctrl.bbListbuilderToolbarOffsetElId
                });
            }
           
        }

        // Trigger highlight if bbListbuilderSearchText binding changes from parent.
        function bindingChanges(changesObj) {
            var searchText;
            if (changesObj.bbListbuilderSearchText) {
                searchText = changesObj.bbListbuilderSearchText;
                if (searchText.currentValue && searchText.currentValue !== searchText.previousValue) {
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
            if (ctrl.vkToolbar) {
                ctrl.vkToolbar.destroy();
            }
        }

        // Lifecycle hooks
        ctrl.$onInit = initToolbar;
        ctrl.$onChanges = bindingChanges;
        ctrl.$onDestroy = destroyToolbar;

        ctrl.applySearchText = applySearchText;

    }

    BBListbuilderToolbarController.$inject = ['$element', '$q', 'bbViewKeeperBuilder'];

    angular.module('sky.listbuilder.toolbar.controller', ['sky.resources', 'sky.viewkeeper'])
        .controller('BBListbuilderToolbarController', BBListbuilderToolbarController);
}());