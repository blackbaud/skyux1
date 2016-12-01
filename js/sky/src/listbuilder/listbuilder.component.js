/* global angular */
(function () {
    'use strict';

    function Controller($element) {
        var ctrl = this,
            lastSearchText;

        function highlightLastSearchText() {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.highlightSearchContent)) {
                ctrl.highlightSearchContent(lastSearchText);
            }
        }

        function getListbuilderToolbarId() {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.getToolbarId)) {
                return ctrl.getToolbarId();
            }
        }

        function getListbuilderToolbarTopScrollbarEl() {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.getTopScrollbar)) {
                return ctrl.getTopScrollbar();
            }   
        }

        function sortComponentPresent() {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.toolbarSortComponentPresent)) {
                return ctrl.toolbarSortComponentPresent();
            }   
        }

        function getListbuilderMultiselectIdProperty() {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.getMultiselectIdProperty)) {
                return ctrl.getMultiselectIdProperty();
            }
        }

        function updateSelectedIds(selectedIds) {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.updateMultiselectSelectedIds)) {
                return ctrl.updateMultiselectSelectedIds(selectedIds);
            }
        }

        function highlightSearchText(searchText) {
            lastSearchText = searchText;
            if (angular.isFunction(ctrl.highlightSearchContent)) {
                ctrl.highlightSearchContent(searchText);
            }
        }

        function itemToggled(isSelected, itemId) {
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.multiselectItemToggled)) {
                ctrl.multiselectItemToggled(isSelected, itemId);
            }
        }

        function getContentContainer() {
            return $element.find('.bb-listbuilder-content-container');
        }

        function onInit() {
            ctrl.contentViews = [];
        }

        ctrl.$onInit = onInit;
        ctrl.highlightSearchText = highlightSearchText;
        ctrl.getListbuilderToolbarId = getListbuilderToolbarId;
        ctrl.getListbuilderToolbarTopScrollbarEl = getListbuilderToolbarTopScrollbarEl;
        ctrl.getListbuilderMultiselectIdProperty = getListbuilderMultiselectIdProperty;
        ctrl.sortComponentPresent = sortComponentPresent;
        ctrl.updateSelectedIds = updateSelectedIds;
        ctrl.getContentContainer = getContentContainer;
        ctrl.highlightLastSearchText = highlightLastSearchText;
        ctrl.itemToggled = itemToggled;
    }

    Controller.$inject = ['$element'];

    angular.module('sky.listbuilder.component', [])
        .component('bbListbuilder', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.component.html',
            transclude: {
                bbListbuilderToolbar: '?bbListbuilderToolbar',
                bbListbuilderContent: '?bbListbuilderContent',
                bbListbuilderFooter: '?bbListbuilderFooter'
            },
            controller: Controller
        });
})();