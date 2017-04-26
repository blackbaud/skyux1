/* global angular */ 
(function () {
    'use strict';

    function bbColumnPicker(bbModal) {
        function openColumnPicker(columnPickerOptions) {
            bbModal.open({
                templateUrl: 'sky/templates/grids/columnpicker.html',
                controller: 'BBGridColumnPickerController',
                resolve: {
                    columns: function () {
                        return columnPickerOptions.columns;
                    },
                    selectedColumnIds: function () {
                        return columnPickerOptions.selectedColumnIds;
                    },
                    columnPickerHelpKey: function () {
                        return columnPickerOptions.helpKey;
                    },
                    subsetLabel: function () {
                        return columnPickerOptions.subsetLabel;
                    },
                    subsetProperty: function () {
                        return columnPickerOptions.subsetProperty;
                    },
                    subsetExclude: function () {
                        return columnPickerOptions.subsetExclude;
                    },
                    onlySelected: function () {
                        return columnPickerOptions.onlySelected;
                    }
                }
            }).result.then(function (selectedColumnIds) {
                columnPickerOptions.selectedColumnIdsChangedCallback(selectedColumnIds);
            }, 
                angular.noop
            );
        }
        return {
            openColumnPicker: openColumnPicker
        };
    }

    bbColumnPicker.$inject = ['bbModal'];

    angular.module('sky.grids.columnpicker.factory', ['sky.modal', 'sky.grids.columnpicker'])
        .factory('bbColumnPicker', bbColumnPicker);
    
})();