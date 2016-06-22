/* global angular */
(function () {
    'use strict';

    function BBListbuilderController($element, bbHighlight) {
        var ctrl = this;

        function highlightSearchText(searchText) {
            
            var cardEl = $element.find('.bb-card');
            bbHighlight.clear(cardEl);
            if (searchText) {
                bbHighlight(cardEl.not('.bb-listbuilder-no-search'), searchText, 'highlight');
            }
        }
            

        ctrl.highlightSearchText = highlightSearchText;
    }

    BBListbuilderController.$inject = ['$element', 'bbHighlight'];

    angular.module('sky.listbuilder.controller', ['sky.highlight'])
        .controller('BBListbuilderController', BBListbuilderController);


}());