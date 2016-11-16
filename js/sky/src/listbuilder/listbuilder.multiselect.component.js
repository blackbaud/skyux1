/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this,
            listbuilderSelectedIds;

        function toggleOnlySelected(isSelected) {
            ctrl.bbListbuilderOnShowOnlySelected({showOnlySelected: isSelected});
        }

        function addSelectedItem(id, selectedIds) {
            if (selectedIds.indexOf(id) === -1) {
                selectedIds.push(id);
            }
        }

        function removeSelectedItem(id, selectedIds) {
            var itemIndex = selectedIds.indexOf(id);
            if (itemIndex !== -1) {
                selectedIds.splice(itemIndex, 1);
            }
        }

        function multiselectItemToggled(isSelected, id) {
            if (isSelected) {
                addSelectedItem(id, listbuilderSelectedIds);
            } else {
                removeSelectedItem(id, listbuilderSelectedIds);
            }
            ctrl.bbListbuilderMultiselectItemsChanged({selectedIds: listbuilderSelectedIds, allSelected: false});
        }

        function multiselectItemsToggled(isSelected, selectedIds) {
            var length = selectedIds.length,
                i;

            for (i = 0; i < length; i++) {
                if (isSelected) {
                    addSelectedItem(selectedIds[i], listbuilderSelectedIds);
                } else {
                    removeSelectedItem(selectedIds[i], listbuilderSelectedIds);
                }
            }
            ctrl.bbListbuilderMultiselectItemsChanged({selectedIds: listbuilderSelectedIds, allSelected: isSelected});
        }

        function setListbuilderSelectedItems() {
            if (angular.isUndefined(ctrl.bbListbuilderMultiselectSelectedIds)) {
                listbuilderSelectedIds = [];
            } else {
                listbuilderSelectedIds = ctrl.bbListbuilderMultiselectSelectedIds;
            }
        }

        function onInit() {
            if (angular.isFunction(ctrl.bbListbuilderOnShowOnlySelected)) {
                ctrl.hasOnlySelected = true;
            }

            setListbuilderSelectedItems();

            ctrl.listbuilderCtrl.multiselectItemToggled = multiselectItemToggled;
        }

        function bindingChanges(changesObj) {
            /* istanbul ignore else */
            /* sanity check */
            if (changesObj.bbListbuilderMultiselectSelectedIds) {
                setListbuilderSelectedItems();
            }
        }

        ctrl.toggleOnlySelected = toggleOnlySelected;
        ctrl.multiselectItemToggled = multiselectItemToggled;
        ctrl.multiselectItemsToggled = multiselectItemsToggled;

        ctrl.$onInit = onInit;
        ctrl.$onChanges = bindingChanges;
    }

    angular.module('sky.listbuilder.multiselect.component', 
      [
          'sky.resources',
          'sky.listbuilder.multiselect.selectall.component',
          'sky.listbuilder.multiselect.clearall.component'
      ])
        .component('bbListbuilderMultiselect', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.multiselect.component.html',
            bindings: {
                bbListbuilderOnShowOnlySelected: '&?',
                bbListbuilderShowOnlySelected: '<?',
                bbListbuilderMultiselectSelectedIds: '<?',
                bbListbuilderMultiselectItemsChanged: '&?'
            },
            require: {
                listbuilderCtrl: '^^bbListbuilder'
            },
            transclude: true,
            controller: Controller
        });
})();