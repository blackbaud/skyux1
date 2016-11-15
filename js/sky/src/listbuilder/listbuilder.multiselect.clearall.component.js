/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function listbuilderMultiselectToggled(result) {
            if (angular.isArray(result)) {
                ctrl.bbListbuilderMultiselect.multiselectItemsToggled(false, result);
            }
        }

        function clearAllItems() {
            var clearAllResult = ctrl.bbListbuilderMultiselectOnClearAll();


            if (clearAllResult && angular.isFunction(clearAllResult.then)) {
                clearAllResult.then(function (result) {
                    listbuilderMultiselectToggled(result);
                });
            } else {
                listbuilderMultiselectToggled(clearAllResult);
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