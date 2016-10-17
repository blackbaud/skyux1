/* global angular */
(function () {
    'use strict';

    function Controller(bbResources) {
        var ctrl = this;

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.viewName;
        }

        function initRepeater() {
            ctrl.viewName = 'repeater';
            ctrl.listbuilderContentCtrl.addListbuilderView({ 
                viewName: ctrl.viewName, 
                viewSwitcherClass: 'fa-list',
                highlightClass: 'bb-repeater-item',
                viewSwitcherLabel: bbResources.listbuilder_repeater_switcher
            });
        }

        function onDestroy() {
            ctrl.listbuilderContentCtrl.removeListbuilderView(ctrl.viewName);
        }

        ctrl.$postLink = initRepeater;
        ctrl.$onDestroy = onDestroy;
        ctrl.viewIsActive = viewIsActive;

    }

    Controller.$inject = ['bbResources'];

    angular.module('sky.listbuilder.repeater.component', ['sky.repeater', 'sky.resources'])
        .component('bbListbuilderRepeater', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.repeater.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent'
            }

        });
}());