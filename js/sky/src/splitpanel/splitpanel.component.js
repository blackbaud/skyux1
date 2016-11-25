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
    }

    Controller.$inject = ['$element'];

    angular.module('sky.splitpanel.component', [])
        .component('bbSplitpanel', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.component.html',
            transclude: {
                bbListbuilderToolbar: '?bbSplitpanelToolbar',
                bbListbuilderContent: '?bbSplitpanelContent',
                bbListbuilderFooter: '?bbSplitpanelFooter'
            },
            controller: Controller
        });
})();