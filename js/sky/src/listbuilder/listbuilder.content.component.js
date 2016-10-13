/* global angular */
(function () {
    'use strict';

    function Controller($element, bbHighlight) {

        var ctrl = this,
            lastSearchText;

        function addListbuilderView(newView) {
            ctrl.listbuilderCtrl.contentViews.push(newView);

            if (!ctrl.listbuilderCtrl.currentView) {
                ctrl.listbuilderCtrl.currentView = newView;
            }
        }

        function highlightSearchContent(searchText) {
            var contentEl = $element.find('.' + ctrl.listbuilderCtrl.currentView.highlightClass);
            lastSearchText = searchText;
            /*istanbul ignore else */
            /* sanity check */
            if (contentEl.length > 0) {
                bbHighlight.clear(contentEl);
                if (searchText) {
                    bbHighlight(contentEl.not('.bb-listbuilder-no-search'), searchText, 'highlight');
                }
            }
        }

        function highlightLastSearchText() {
            highlightSearchContent(lastSearchText);
        }

        function getCurrentView() {
            return ctrl.listbuilderCtrl.currentView;
        }

        ctrl.listbuilderCtrl.highlightSearchContent = highlightSearchContent;
        ctrl.highlightLastSearchText = highlightLastSearchText;
        ctrl.addListbuilderView = addListbuilderView;
        ctrl.getCurrentView = getCurrentView;

    }

    Controller.$inject = ['$element', 'bbHighlight'];

    angular.module('sky.listbuilder.content.component', ['sky.highlight'])
        .component('bbListbuilderContent', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.content.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }
        });

})();