/* global angular */
(function () {
    'use strict';

    function Controller($timeout, bbResources) {
        var ctrl = this;
    }

    Controller.$inject = ['$timeout', 'bbResources'];

    angular.module('sky.splitpanel.cards.component', ['sky.card', 'sky.resources'])
        .component('bbsplitpanelCards', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.cards.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCustomCtrl: '^^bbSplitpanelContentCustom'
            }

        });
}());