/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function postLink() {
            ctrl.cardsCtrl.addCard();

            if (angular.isDefined(ctrl.bbListbuilderCardId)) {
                ctrl.listbuilderCardToggled = listbuilderCardToggled;
            }
        }

        function listbuilderCardToggled(isSelected) {
            ctrl.contentCtrl.itemToggled(isSelected, ctrl.bbListbuilderCardId);
        }

        ctrl.$postLink = postLink;
    }

    angular.module('sky.listbuilder.card.component', [])
        .component('bbListbuilderCard', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.card.component.html',
            transclude: true,
            controller: Controller,
            require: {
                cardsCtrl: '^bbListbuilderCards',
                contentCtrl: '^^bbListbuilderContent'
            },
            bindings: {
                bbListbuilderCardId: '<?'
            }

        });
})();