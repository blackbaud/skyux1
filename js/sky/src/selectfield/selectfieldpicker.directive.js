/*global angular */

(function () {
    'use strict';

    function BBSelectFieldPickerController() {

    }

    function bbSelectFieldPicker(bbModal) {
        function link(scope, el, attrs, ctrls) {
            var bbSelectField = ctrls[1],
                vm = ctrls[0];

            vm.open = function () {
                var modalInstance,
                    pickerSelectedOff;

                function onPickerSelected() {
                    modalInstance.close();
                }

                function onModalClosed() {
                    if (pickerSelectedOff) {
                        pickerSelectedOff();
                    }
                }

                modalInstance = bbModal.open({
                    scope: scope,
                    templateUrl: 'sky/templates/selectfield/selectfieldpicker.directive.html'
                });

                if (vm.bbSelectFieldPickerStyle === 'single') {
                    pickerSelectedOff = scope.$on('bbPickerSelected', onPickerSelected);
                }

                modalInstance.result.then(onModalClosed, onModalClosed);
            };

            bbSelectField.setPicker(vm);
        }

        return {
            require: ['bbSelectFieldPicker', '^bbSelectField'],
            restrict: 'E',
            bindToController: {
                bbSelectFieldPickerTemplate: '@',
                bbSelectFieldPickerStyle: '@'
            },
            controller: BBSelectFieldPickerController,
            controllerAs: 'bbSelectFieldPicker',
            link: link,
            scope: true
        };
    }

    bbSelectFieldPicker.$inject = ['bbModal'];

    angular.module('sky.selectfieldpicker.directive', [])
        .directive('bbSelectFieldPicker', bbSelectFieldPicker);
}());
