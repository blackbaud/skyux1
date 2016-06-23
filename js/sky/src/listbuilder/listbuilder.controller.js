/* global angular */
(function () {
    'use strict';

    function BBListbuilderController($element, bbHighlight, $timeout) {
        var ctrl = this;

        function highlightSearchText(searchText) {
            $timeout(function () {
                var cardEl = $element.find('.bb-card');
                bbHighlight.clear(cardEl);
                if (searchText) {
                    bbHighlight(cardEl.not('.bb-listbuilder-no-search'), searchText, 'highlight');
                }
            });
           
        }

        function getContentContainer() {
            return $element.find('.bb-listbuilder-content');
        }     

        ctrl.highlightSearchText = highlightSearchText;
        ctrl.getContentContainer = getContentContainer;
    }

    BBListbuilderController.$inject = ['$element', 'bbHighlight', '$timeout'];

    angular.module('sky.listbuilder.controller', ['sky.highlight'])
        .controller('BBListbuilderController', BBListbuilderController);


}());