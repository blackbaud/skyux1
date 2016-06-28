/* global angular */
(function () {
    'use strict';

    function Controller($element, $q, $timeout, bbViewKeeperBuilder) {
        var ctrl = this,
            vkToolbar;

        function applySearchText(searchText) {

            //select input
            var searchEl = $element.find('.bb-listbuilder-search-input'),
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
            if (ctrl.bbListbuilderToolbarFixed !== 'true') {

                /* istanbul ignore next */
                /* sanity check */
                if (vkToolbar) {
                    vkToolbar.destroy();
                }

                vkToolbar = new bbViewKeeperBuilder.create({
                    el: $element.find('.bb-listbuilder-toolbar'),
                    boundaryEl: ctrl.listbuilderCtrl.getContentContainer(),
                    setWidth: true,
                    verticalOffSetElId: ctrl.listbuilderCtrl.bbListbuilderVerticalOffsetElId,
                    onStateChanged: function () {
                        $timeout(function () {
                            ctrl.listbuilderCtrl.isScrolledChanged(vkToolbar.isFixed);
                        });
                    }
                });
            }
           
        }

        function toolbarScrollToTop() {
            vkToolbar.scrollToTop();
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

            /*
                Allow other listbuilder components to scroll to original
                toolbar location.
            */
            ctrl.listbuilderCtrl.toolbarScrollToTop = toolbarScrollToTop;

        }

        function destroyToolbar() {
            if (vkToolbar) {
                vkToolbar.destroy();
            }
        }

        // Lifecycle hooks
        ctrl.$onInit = initToolbar;
        ctrl.$onChanges = bindingChanges;
        ctrl.$onDestroy = destroyToolbar;

        ctrl.applySearchText = applySearchText;

    }

    Controller.$inject = ['$element', '$q', '$timeout', 'bbViewKeeperBuilder'];

    angular.module('sky.listbuilder.toolbar.component', ['sky.resources', 'sky.viewkeeper'])
        .component('bbListbuilderToolbar', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.toolbar.component.html',
            bindings: {
                bbListbuilderOnSearch: '&?',
                bbListbuilderSearchText: '<?',
                bbListbuilderToolbarFixed: '@?'
            },
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }
        });
}());