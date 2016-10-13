/* global angular */
(function () {
    'use strict';

    function Controller($timeout) {
        var ctrl = this;

        function addCard() {
            $timeout(function () {
                ctrl.listbuilderContentCtrl.highlightLastSearchText();
            });
        }

        function initCards() {
            ctrl.viewName = 'card';
            ctrl.listbuilderContentCtrl.addListbuilderView({ viewName: ctrl.viewName, viewSwitcherClass: 'fa-th', highlightClass: 'bb-card'});
        }

        ctrl.$postLink = initCards;
        ctrl.addCard = addCard;
    }

    Controller.$inject = ['$timeout'];

    angular.module('sky.listbuilder.cards.component', ['sky.card'])
        .component('bbListbuilderCards', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.cards.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent'
            }

        });
}());