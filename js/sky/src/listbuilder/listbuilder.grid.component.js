/* global angular */
(function () {
    'use strict';

    function Controller(bbResources, $scope) {
        var ctrl = this;

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView() && ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.viewName;
        }

        function setUpGridMultiselectEvent() {
            $scope.$on('bbGridMultiselectSelectedIdsChanged', function (event, data) {
                ctrl.listbuilderCtrl.updateSelectedIds(data);
                
                event.stopPropagation();
                event.preventDefault(); 
            });
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

            setUpGridMultiselectEvent();

        }

        function onDestroy() {
            ctrl.listbuilderContentCtrl.removeListbuilderView(ctrl.viewName);
        }

        ctrl.$postLink = initGrid;
        ctrl.$onDestroy = onDestroy;
        ctrl.viewIsActive = viewIsActive;
    }

    Controller.$inject = ['bbResources', '$scope'];

    angular.module('sky.listbuilder.grid.component', ['sky.resources'])
        .component('bbListbuilderGrid', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.grid.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent',
                listbuilderCtrl: '^^bbListbuilder'
            }
        });
})();