/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;


        function initRepeater() {
            ctrl.viewName = 'repeater';
            ctrl.listbuilderContentCtrl.addListbuilderView({ viewName: ctrl.viewName, viewSwitcherClass: 'fa-th', highlightClass: 'bb-repeater-item'});
        }

        ctrl.$postLink = initRepeater;

    }

    angular.module('sky.listbuilder.repeater.component', ['sky.repeater'])
        .component('bbListbuilderRepeater', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.repeater.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent'
            }

        });
}());