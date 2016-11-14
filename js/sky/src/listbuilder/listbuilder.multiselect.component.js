/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function toggleOnlySelected(isSelected) {
            ctrl.bbListbuilderOnShowOnlySelected({showOnlySelected: isSelected});
        }

        function addSelectedItem(id, selectedItems) {
            if (selectedItems.indexOf(id) === -1) {
                selectedItems.push(id);
            }
        }

        function removeSelectedItem(id, selectedItems) {
            var itemIndex = selectedItems.indexOf(id);
            if (itemIndex !== -1) {
                selectedItems.splice(itemIndex, 1);
            }
        }

        function multiselectItemToggled(isSelected, id) {
            if (isSelected) {
                addSelectedItem(id, ctrl.bbListbuilderMultiselectSelectedItems);
            } else {
                removeSelectedItem(id, ctrl.bbListbuilderMultiselectSelectedItems);
            }
            ctrl.bbListbuilderMultiselectItemsChanged({selectedItems: ctrl.bbListbuilderMultiselectSelectedItems, allSelected: false});
        }

        function multiselectItemsToggled(isSelected, selectedItems) {
            var length = selectedItems.length,
                i;

            for (i = 0; i < length; i++) {
                if (isSelected) {
                    addSelectedItem(selectedItems[i], ctrl.bbListbuilderMultiselectSelectedItems);
                } else {
                    removeSelectedItem(selectedItems[i], ctrl.bbListbuilderMultiselectSelectedItems);
                }
            }
            ctrl.bbListbuilderMultiselectItemsChanged({selectedItems: ctrl.bbListbuilderMultiselectSelectedItems, allSelected: isSelected});
        }

        function onInit() {
            if (angular.isFunction(ctrl.bbListbuilderOnShowOnlySelected)) {
                ctrl.hasOnlySelected = true;
            }

            if (angular.isUndefined(ctrl.bbListbuilderMultiselectSelectedItems)) {
                ctrl.bbListbuilderMultiselectSelectedItems = [];
            }

            ctrl.listbuilderCtrl.multiselectItemToggled = multiselectItemToggled;
        }

        ctrl.toggleOnlySelected = toggleOnlySelected;
        ctrl.multiselectItemToggled = multiselectItemToggled;
        ctrl.multiselectItemsToggled = multiselectItemsToggled;

        ctrl.$onInit = onInit;
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
                bbListbuilderMultiselectSelectedItems: '<?',
                bbListbuilderMultiselectItemsChanged: '&?'
            },
            require: {
                listbuilderCtrl: '^^bbListbuilder'
            },
            transclude: true,
            controller: Controller
        });
})();