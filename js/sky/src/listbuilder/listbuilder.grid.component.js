/* global angular */
(function () {
    'use strict';

    function Controller(bbResources) {
        var ctrl = this;

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView() && ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.viewName;
        }

        function initGrid() {
            ctrl.viewName = 'grid';
            ctrl.listbuilderContentCtrl.addListbuilderView({ 
                viewName: ctrl.viewName, 
                viewSwitcherClass: 'fa-table', 
                highlightSelector: 'td:not(.bb-grid-no-search)',
                viewSwitcherLabel: bbResources.listbuilder_grid_switcher,
                viewContentClass: 'bb-listbuilder-content-grid-view'
            });

        }

        function onDestroy() {
            ctrl.listbuilderContentCtrl.removeListbuilderView(ctrl.viewName);
        }

        ctrl.$postLink = initGrid;
        ctrl.$onDestroy = onDestroy;
        ctrl.viewIsActive = viewIsActive;
    }

    angular.module('sky.listbuilder.grid.component', ['sky.resources'])
        .component('bbListbuilderGrid', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.grid.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent'
            }
        });
})();