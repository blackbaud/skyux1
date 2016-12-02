/* global angular */
(function () {
    'use strict';

    function Controller(bbColumnPicker) {

        var ctrl = this;

        function openColumnPicker() {
            bbColumnPicker.openColumnPicker({
                        columns: ctrl.bbListbuilderColumnPickerColumns,
                        selectedColumnIds: ctrl.bbListbuilderColumnPickerSelectedColumnIds,
                        helpKey: ctrl.bbListbuilderColumnPickerHelpKey,
                        subsetLabel: ctrl.bbListbuilderColumnPickerSubsetLabel,
                        subsetProperty: ctrl.bbListbuilderColumnPickerSubsetProperty,
                        subsetExclude: ctrl.bbListbuilderColumnPickerSubsetExclude,
                        onlySelected: ctrl.bbListbuilderColumnPickerOnlySelected,
                        selectedColumnIdsChangedCallback: function (selectedColumnIds) {
                            ctrl.bbListbuilderColumnPickerSelectedColumnIdsChanged({selectedColumnIds: selectedColumnIds});
                        }
                    });
        }

        ctrl.openColumnPicker = openColumnPicker;
        
    }

    Controller.$inject = ['bbColumnPicker'];

    angular.module('sky.listbuilder.column.picker.component', ['sky.grids.columnpicker.factory', 'sky.resources'])
        .component('bbListbuilderColumnPicker', {
            controller: Controller,
            require: {
                dropdownCtrl: '^^bbListbuilderSecondaryActionsDropdown'
            },
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