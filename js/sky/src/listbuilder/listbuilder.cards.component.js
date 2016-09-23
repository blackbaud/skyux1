/* global angular */
(function () {
    'use strict';

    function Controller($element, bbHighlight, $timeout) {
        var ctrl = this;

        function highlightCards(searchText) {
            var cardEl = $element.find('.bb-card');
            /*istanbul ignore else */
            /* sanity check */
            if (cardEl.length > 0) {
                bbHighlight.clear(cardEl);
                if (searchText) {
                    bbHighlight(cardEl.not('.bb-listbuilder-no-search'), searchText, 'highlight');
                }
            }
        }

        function addCard() {
            $timeout(function () {
                ctrl.listbuilderCtrl.highlightLastSearchText();
            });
        }

        function initCards() {
            ctrl.listbuilderCtrl.highlightCards = highlightCards;
        }

        ctrl.$postLink = initCards;
        ctrl.addCard = addCard;
    }

    Controller.$inject = ['$element', 'bbHighlight', '$timeout'];

    angular.module('sky.listbuilder.cards.component', ['sky.highlight', 'sky.card'])
        .component('bbListbuilderCards', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.cards.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            }

        });
}());