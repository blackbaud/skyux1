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
            return $element.find('.bb-listbuilder-content');
        }

        function onInit() {
            ctrl.contentViews = [];
        }

        ctrl.$onInit = onInit;
        ctrl.highlightSearchText = highlightSearchText;
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