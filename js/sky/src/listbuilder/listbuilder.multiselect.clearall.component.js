/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function clearAllItems() {
            var clearAllResult = ctrl.bbListbuilderMultiselectOnClearAll();


            if (clearAllResult && angular.isFunction(clearAllResult.then)) {
                clearAllResult.then(function (result) {
                    ctrl.bbListbuilderMultiselect.multiselectItemsToggled(false, result);
                });
            } else if (clearAllResult) {
                ctrl.bbListbuilderMultiselect.multiselectItemsToggled(false, clearAllResult);
            }
        }

        ctrl.clearAllItems = clearAllItems;
    }

    angular.module('sky.listbuilder.multiselect.clearall.component', ['sky.resources'])
        .component('bbListbuilderMultiselectClearAll', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.multiselect.clearall.component.html',
            bindings: {
                bbListbuilderMultiselectOnClearAll: '&?'
            },
            require: {
                bbListbuilderMultiselect: '^^bbListbuilderMultiselect'
            },
            controller: Controller
        });
})();