/* global angular */
(function () {
    'use strict';

    function BBListbuilderToolbarController(bbHighlight, $element) {
        var ctrl = this;


        function highlightSearchText(searchText) {
            var cardEl = $element.find('.bb-card');
            bbHighlight.clear(cardEl);
            if (searchText) {
                bbHighlight(cardEl.not('.bb-grid-no-search'), searchText, 'highlight');
            }
        }

        console.log('waaaaaaaadaup');
        function applySearchText(searchText) {

            //select input
            //highlight
            highlightSearchText(searchText);
            //search callback
            
        }

        ctrl.applySearchText = applySearchText;

    }

    BBListbuilderToolbarController.$inject = ['bbHighlight', '$element'];

    angular.module('sky.listbuilder.toolbar.controller', [])
        .controller('BBListbuilderToolbarController', BBListbuilderToolbarController);
}());