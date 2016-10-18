/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function postLink() {
            ctrl.customCtrl.addItem();
        }

        ctrl.$postLink = postLink;
    }

    angular.module('sky.listbuilder.content.custom.item.component', [])
        .component('bbListbuilderContentCustomItem', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.content.custom.item.component.html',
            transclude: true,
            controller: Controller,
            require: {
                customCtrl: '^bbListbuilderContentCustom'
            }

        });
})();