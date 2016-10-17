/* global angular */
(function () {
    'use strict';

    function Controller($timeout, bbResources) {
        var ctrl = this;

        function addCard() {
            $timeout(function () {
                ctrl.listbuilderContentCtrl.highlightLastSearchText();
            });
        }

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.viewName;
        }

        function initCards() {
            ctrl.viewName = 'card';
            ctrl.listbuilderContentCtrl.addListbuilderView({ 
                viewName: ctrl.viewName, 
                viewSwitcherClass: 'fa-th-large', 
                highlightClass: 'bb-card',
                viewSwitcherLabel: bbResources.listbuilder_card_switcher
            });

        }

        function onDestroy() {
            ctrl.listbuilderContentCtrl.removeListbuilderView(ctrl.viewName);
        }

        ctrl.$postLink = initCards;
        ctrl.$onDestroy = onDestroy;
        ctrl.addCard = addCard;
        ctrl.viewIsActive = viewIsActive;
    }

    Controller.$inject = ['$timeout', 'bbResources'];

    angular.module('sky.listbuilder.cards.component', ['sky.card', 'sky.resources'])
        .component('bbListbuilderCards', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.cards.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent'
            }

        });
}());