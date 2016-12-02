/* global angular */
(function () {
    'use strict';

    function Controller(bbModal) {

        var ctrl = this;

        function isInGridView() {
            var currentView = ctrl.listbuilderContentCtrl.getCurrentView();
            return currentView && currentView === 'grid';
        }

        function openColumnPicker() {
            bbModal.open({
                templateUrl: 'sky/templates/grids/columnpicker.html',
                controller: 'BBGridColumnPickerController',
                resolve: {
                    columns: function () {
                        return ctrl.bbListbuilderColumnPickerColumns;
                    },
                    selectedColumnIds: function () {
                        return ctrl.bbListbuilderColumnPickerSelectedColumnIds;
                    },
                    columnPickerHelpKey: function () {
                        return ctrl.bbListbuilderColumnPickerHelpKey;
                    },
                    subsetLabel: function () {
                        return ctrl.bbListbuilderColumnPickerSubsetLabel;
                    },
                    subsetProperty: function () {
                        return ctrl.bbListbuilderColumnPickerSubsetProperty;
                    },
                    subsetExclude: function () {
                        return ctrl.bbListbuilderColumnPickerSubsetExclude;
                    },
                    onlySelected: function () {
                        return ctrl.bbListbuilderColumnPickerOnlySelected;
                    }
                }
            }).result.then(function (selectedColumnIds) {
                ctrl.bbListbuilderColumnPickerSelectedColumnIdsChanged({selectedColumnIds: selectedColumnIds});
            });
        }

        ctrl.openColumnPicker = openColumnPicker;
        ctrl.isInGridView = isInGridView;
        
    }

    Controller.$inject = ['bbModal'];

    angular.module('sky.listbuilder.column.picker.component', ['sky.modal', 'sky.grids.columnpicker', 'sky.resources'])
        .component('bbListbuilderColumnPicker', {
            controller: Controller,
            bindings: {
                bbListbuilderColumnPickerSelectedColumnIds: '<',
                bbListbuilderColumnPickerColumns: '<',
                bbListbuilderColumnPickerHelpKey: '<?',
                bbListbuilderColumnPickerSubsetLabel: '<?',
                bbListbuilderColumnPickerSubsetProperty: '<?',
                bbListbuilderColumnPickerSubsetExclude: '<?',
                bbListbuilderColumnPickerOnlySelected: '<?',
                bbListbuilderColumnPickerSelectedColumnIdsChanged: '&'
            },
            templateUrl: 'sky/templates/listbuilder/listbuilder.column.picker.component.html'
        });
})();