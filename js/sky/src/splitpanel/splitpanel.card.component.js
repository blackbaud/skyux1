/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function postLink() {
            ctrl.cardsCtrl.addCard();
        }

        ctrl.$postLink = postLink;
    }

    angular.module('sky.splitpanel.card.component', [])
        .component('bbsplitpanelCard', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.card.component.html',
            transclude: true,
            controller: Controller,
            require: {
                cardsCtrl: '^bbListbuilderCards'
            }

        });
})();