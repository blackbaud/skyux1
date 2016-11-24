/* global angular */
(function () {
    'use strict';

    function Controller($timeout, bbResources) {
        var ctrl = this;
    }

    Controller.$inject = ['$timeout', 'bbResources'];

    angular.module('sky.listbuilder.cards.component', ['sky.card', 'sky.resources'])
        .component('bbListbuilderCards', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.cards.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCustomCtrl: '^^bbListbuilderContentCustom'
            }

        });
}());