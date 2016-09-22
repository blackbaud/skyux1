/* global angular */
(function () {
    'use strict';

    function Controller($element, bbHighlight, $timeout) {
        var ctrl = this,
            lastSearchText;

        function highlightSearchText(searchText) {
            lastSearchText = searchText;
            $timeout(function () {
                var cardEl = $element.find('.bb-card');
                if (cardEl.length > 0) {
                    bbHighlight.clear(cardEl);
                    if (searchText) {
                        bbHighlight(cardEl.not('.bb-listbuilder-no-search'), searchText, 'highlight');
                    }
                }
                
            });
        }

        function highlightLastSearchText() {
            highlightSearchText(lastSearchText);
        }

        function getContentContainer() {
            return $element.find('.bb-listbuilder-content');
        }

        ctrl.highlightSearchText = highlightSearchText;
        ctrl.highlightLastSearchText = highlightLastSearchText;
        ctrl.getContentContainer = getContentContainer;

    }

    Controller.$inject = ['$element', 'bbHighlight', '$timeout'];

    angular.module('sky.listbuilder.component', ['sky.card', 'sky.highlight'])
        .component('bbListbuilder', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.component.html',
            transclude: {
                bbListbuilderToolbar: '?bbListbuilderToolbar',
                bbListbuilderContent: '?bbListbuilderContent',
                bbListbuilderFooter: '?bbListbuilderFooter'
            },
            controller: Controller
        });
}());