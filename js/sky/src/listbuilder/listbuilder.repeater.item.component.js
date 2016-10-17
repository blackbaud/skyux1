/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function postLink() {
            ctrl.repeaterCtrl.addRepeaterItem();
        }

        ctrl.$postLink = postLink;
    }

    angular.module('sky.listbuilder.repeater.item.component', [])
        .component('bbListbuilderRepeaterItem', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.repeater.item.component.html',
            transclude: true,
            controller: Controller,
            require: {
                repeaterCtrl: '^bbListbuilderRepeater'
            }

        });
}());