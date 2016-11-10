/* global angular */
(function () {
    'use strict';

    function Controller($scope) {
        var ctrl = this;

        function listbuilderCardToggled(selectedArgs) {
            ctrl.listbuilderCtrl.itemToggled(selectedArgs.isSelected, ctrl.bbListbuilderCardId);
        }

        function onInit() {
            if (angular.isDefined(ctrl.bbListbuilderCardId)) {
                $scope.$on('bbCardInitialized', function (event, data) {
                    data.cardCtrl.bbCardSelectionToggled = listbuilderCardToggled;
                    event.stopPropagation();
                    event.preventDefault(); 
                });
            }
        }

        function postLink() {
            ctrl.cardsCtrl.addCard();
        }

        ctrl.$postLink = postLink;
        ctrl.$onInit = onInit;
    }

    Controller.$inject = ['$scope'];

    angular.module('sky.listbuilder.card.component', [])
        .component('bbListbuilderCard', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.card.component.html',
            transclude: true,
            controller: Controller,
            require: {
                cardsCtrl: '^bbListbuilderCards',
                listbuilderCtrl: '^^bbListbuilder'
            },
            bindings: {
                bbListbuilderCardId: '<?'
            }

        });
})();