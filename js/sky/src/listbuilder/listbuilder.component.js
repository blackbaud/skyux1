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

        function scrollToTop() {
            /*
                ctrl.toolbarScrollToTop() set in listbuilder.toolbar.component
            */
            if (angular.isFunction(ctrl.toolbarScrollToTop)) {
                ctrl.toolbarScrollToTop();
            }
        }

        function isScrolledChanged(isScrolled) {
            ctrl.isScrolled = isScrolled;
        }

        ctrl.highlightSearchText = highlightSearchText;
        ctrl.highlightLastSearchText = highlightLastSearchText;
        ctrl.getContentContainer = getContentContainer;
        ctrl.scrollToTop = scrollToTop;
        ctrl.isScrolledChanged = isScrolledChanged;

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