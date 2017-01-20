/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function listbuilderMultiselectToggled(result) {
            if (angular.isArray(result)) {
                ctrl.bbListbuilderMultiselect.multiselectItemsToggled(true, result);
            }
        }

        function selectAllItems() {
            var selectAllResult;
            if (angular.isFunction(ctrl.bbListbuilderMultiselectOnSelectAll)) {
                selectAllResult = ctrl.bbListbuilderMultiselectOnSelectAll();

                if (selectAllResult && angular.isFunction(selectAllResult.then)) {
                    selectAllResult.then(function (result) {
                        listbuilderMultiselectToggled(result);
                    });
                } else {
                    listbuilderMultiselectToggled(selectAllResult);
                }
            } else {
                ctrl.bbListbuilderMultiselect.toggleAllAvailableItems(true);
            }  
        }

        ctrl.selectAllItems = selectAllItems;
    }

    angular.module('sky.listbuilder.multiselect.selectall.component', ['sky.resources'])
        .component('bbListbuilderMultiselectSelectAll', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.multiselect.selectall.component.html',
            bindings: {
                bbListbuilderMultiselectOnSelectAll: '&?'
            },
            require: {
                bbListbuilderMultiselect: '^^bbListbuilderMultiselect'
            },
            controller: Controller
        });
})();