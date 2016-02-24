/*global angular */

(function () {
    'use strict';

    function BBSelectFieldPickerController() {

    }

    function bbSelectFieldPicker(bbModal, bbResources) {
        function link(scope, el, attrs, ctrls) {
            var bbSelectField = ctrls[1],
                modalInstance,
                selectedItems,
                vm = ctrls[0];

            vm.isSingleStyle = function () {
                return bbSelectField.bbSelectFieldStyle === 'single';
            };

            vm.getDialogHeaderText = function () {
                var header = vm.bbSelectFieldPickerHeader;

                if (!header) {
                    header = vm.isSingleStyle() ? bbResources.selectfieldpicker_select_value : bbResources.selectfieldpicker_select_values;
                }

                return header;
            };

            vm.open = function () {
                var pickerSelectedOff;

                function cleanup() {
                    if (pickerSelectedOff) {
                        pickerSelectedOff();
                    }

                    modalInstance = null;
                }

                function onPickerSelected(e, args) {
                    selectedItems = args.selectedItems;
                    bbSelectField.setSelectedItems(selectedItems);

                    modalInstance.close();
                }

                function onModalClosed(reason) {
                    if (reason === 'save') {
                        bbSelectField.setSelectedItems(selectedItems);
                    }

                    cleanup();
                }

                function onModalDismissed() {
                    cleanup();
                }

                if (angular.isFunction(bbSelectField.bbSelectFieldClick)) {
                    bbSelectField.bbSelectFieldClick();
                }

                modalInstance = bbModal.open({
                    scope: scope,
                    templateUrl: 'sky/templates/selectfield/selectfieldpicker.directive.html'
                });

                if (vm.isSingleStyle()) {
                    pickerSelectedOff = scope.$on('bbPickerSelected', onPickerSelected);
                }

                modalInstance.result.then(onModalClosed, onModalDismissed);
            };

            vm.okClick = function () {
                /*istanbul ignore else sanity check */
                if (modalInstance) {
                    modalInstance.close('save');
                }
            };

            scope.$on('bbPickerReady', function (e, args) {
                selectedItems = bbSelectField.getSelectedItems();

                args.setSelectedItems(selectedItems);
            });

            bbSelectField.setPicker(vm);
        }

        return {
            require: ['bbSelectFieldPicker', '^bbSelectField'],
            restrict: 'E',
            bindToController: {
                bbSelectFieldPickerTemplate: '@',
                bbSelectFieldPickerHeader: '@'
            },
            controller: BBSelectFieldPickerController,
            controllerAs: 'bbSelectFieldPicker',
            link: link,
            scope: true
        };
    }

    bbSelectFieldPicker.$inject = ['bbModal', 'bbResources'];

    angular.module('sky.selectfieldpicker.directive', ['sky.modal', 'sky.resources'])
        .directive('bbSelectFieldPicker', bbSelectFieldPicker);
}());
