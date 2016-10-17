/* global angular */
(function () {
    'use strict';

    function Controller(bbResources, $timeout) {
        var ctrl = this;

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.viewName;
        }

        function addRepeaterItem() {
            $timeout(function () {
                ctrl.listbuilderContentCtrl.highlightLastSearchText();
            });
        }

        function initRepeater() {
            ctrl.viewName = 'repeater';
            ctrl.listbuilderContentCtrl.addListbuilderView({ 
                viewName: ctrl.viewName, 
                viewSwitcherClass: 'fa-list',
                highlightClass: 'bb-repeater-item',
                viewSwitcherLabel: bbResources.listbuilder_repeater_switcher
            });
            $timeout(function () {
                ctrl.listbuilderContentCtrl.highlightLastSearchText();
            });
        }

        function onDestroy() {
            ctrl.listbuilderContentCtrl.removeListbuilderView(ctrl.viewName);
        }

        ctrl.$postLink = initRepeater;
        ctrl.$onDestroy = onDestroy;
        ctrl.viewIsActive = viewIsActive;
        ctrl.addRepeaterItem = addRepeaterItem;

    }

    Controller.$inject = ['bbResources', '$timeout'];

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