/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function selectAllItems() {
            var selectAllResult = ctrl.bbListbuilderMultiselectOnSelectAll();


            if (selectAllResult && angular.isFunction(selectAllResult.then)) {
                selectAllResult.then(function (result) {
                    ctrl.bbListbuilderMultiselect.multiselectItemsToggled(true, result);
                });
            } else if (selectAllResult) {
                ctrl.bbListbuilderMultiselect.multiselectItemsToggled(true, selectAllResult);
            }
        }

        ctrl.selectAllItems = selectAllItems;
    }

    angular.module('sky.listbuilder.multiselect.selectall.component', ['sky.resources'])
        .component('bbListbuilderMultiselectSelectAll', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.multiselect.selectall.component.html',
            bindings: {
                bbListbuilderMultiselectOnSelectAll: '&?',
                bbListbuilderMultiselectSelectAllCount: '<?'
            },
            require: {
                bbListbuilderMultiselect: '^^bbListbuilderMultiselect'
            },
            controller: Controller
        });
})();