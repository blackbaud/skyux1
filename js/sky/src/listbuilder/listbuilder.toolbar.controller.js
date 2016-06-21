/* global angular */
(function () {
    'use strict';

    function BBListbuilderToolbarController(bbHighlight, $element) {
        var ctrl = this;

        function applySearchText(searchText) {

            //select input
            //highlight text
            bbHighlight.clear(tableEl);
            if (searchText) {
                bbHighlight(tableEl.find("td").not('.bb-grid-no-search'), options.searchText, 'highlight');
            }
        }

        ctrl.applySearchText = applySearchText;

    }

    BBListbuilderToolbarController.$inject = ['bbHighlight', '$element'];

    angular.module('sky.listbuilder.toolbar.controller', [])
        .controller('BBListbuilderToolbarController', BBListbuilderToolbarController);
}());