/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function onInit() {
            ctrl.cardsCtrl.addCard();
        }

        ctrl.$onInit = onInit;
    }

    angular.module('sky.listbuilder.card.component', [])
        .component('bbListbuilderCard', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.card.component.html',
            transclude: true,
            controller: Controller,
            require: {
                cardsCtrl: '^bbListbuilderCards'
            }

        });
}());