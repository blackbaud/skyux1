/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;


        function initRepeater() {
            ctrl.viewName = 'repeater';
            ctrl.listbuilderContentCtrl.addListbuilderView({ viewName: ctrl.viewName, viewSwitcherClass: 'fa-list', highlightClass: 'bb-repeater-item'});
        }

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.viewName;
        }

        ctrl.$postLink = initRepeater;
        ctrl.viewIsActive = viewIsActive;

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