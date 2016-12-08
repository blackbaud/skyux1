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

        function getIdProperty() {
            return ctrl.bbListbuilderMultiselectItemIdProperty || 'id';
        }

        function getSelectedProperty() {
            return ctrl.bbListbuilderMultiselectItemSelectedProperty || 'selected';
        }

        function setAvailableItems(selectedIds) {
            var idProperty,
                selectedProperty,
                itemsLength,
                i;
            if (angular.isDefined(ctrl.bbListbuilderMultiselectAvailableItems)) {
                idProperty = getIdProperty();
                selectedProperty = getSelectedProperty();

                itemsLength = ctrl.bbListbuilderMultiselectAvailableItems.length;
                for (i = 0; i < itemsLength; i++) {
                    if (selectedIds.indexOf(ctrl.bbListbuilderMultiselectAvailableItems[i][idProperty]) !== -1) {
                        ctrl.bbListbuilderMultiselectAvailableItems[i][selectedProperty] = true;
                    } else {
                        ctrl.bbListbuilderMultiselectAvailableItems[i][selectedProperty] = false;
                    }
                }
            }
        }

        function toggleAllAvailableItems(isSelected) {
            var idProperty,
                selectedProperty,
                i,
                itemsLength;

            if (angular.isDefined(ctrl.bbListbuilderMultiselectAvailableItems)) {
                idProperty = getIdProperty();
                selectedProperty = getSelectedProperty();
                itemsLength = ctrl.bbListbuilderMultiselectAvailableItems.length;
                for (i = 0; i < itemsLength; i++) {
                    ctrl.bbListbuilderMultiselectAvailableItems[i][selectedProperty] = isSelected;
                    if (isSelected) {
                        addSelectedItem(ctrl.bbListbuilderMultiselectAvailableItems[i][idProperty], listbuilderSelectedIds);
                    } else {
                        removeSelectedItem(ctrl.bbListbuilderMultiselectAvailableItems[i][idProperty], listbuilderSelectedIds);
                    }
                }
            }
            ctrl.bbListbuilderMultiselectItemsChanged({selectedIds: listbuilderSelectedIds, allSelected: isSelected});
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
            setAvailableItems(listbuilderSelectedIds);
            ctrl.bbListbuilderMultiselectItemsChanged({selectedIds: listbuilderSelectedIds, allSelected: isSelected});
        }

        function updateMultiselectSelectedIds(selectedIds) {
            listbuilderSelectedIds = selectedIds;
            setAvailableItems(listbuilderSelectedIds);
            ctrl.bbListbuilderMultiselectItemsChanged({selectedIds: listbuilderSelectedIds, allSelected: false});

        }

        function setListbuilderSelectedItems() {
            if (!angular.isUndefined(ctrl.bbListbuilderMultiselectSelectedIds)) {
                listbuilderSelectedIds = ctrl.bbListbuilderMultiselectSelectedIds;
            } else {
                listbuilderSelectedIds = [];
            }

            setAvailableItems(listbuilderSelectedIds);
        }

        function onInit() {
            if (angular.isFunction(ctrl.bbListbuilderOnShowOnlySelected)) {
                ctrl.hasOnlySelected = true;
            }

            setListbuilderSelectedItems();
            ctrl.listbuilderCtrl.multiselectItemToggled = multiselectItemToggled;
            ctrl.listbuilderCtrl.getMultiselectIdProperty = getIdProperty;
            ctrl.listbuilderCtrl.getMultiselectSelectedProperty = getSelectedProperty;
            ctrl.listbuilderCtrl.updateMultiselectSelectedIds = updateMultiselectSelectedIds;
        }

        function bindingChanges(changesObj) {
            /* istanbul ignore else */
            /* sanity check */
            if (changesObj.bbListbuilderMultiselectSelectedIds || changesObj.bbListbuilderMultiselectAvailableItems) {
                setListbuilderSelectedItems();
            }
        }

        ctrl.toggleOnlySelected = toggleOnlySelected;
        ctrl.multiselectItemToggled = multiselectItemToggled;
        ctrl.multiselectItemsToggled = multiselectItemsToggled;
        ctrl.toggleAllAvailableItems = toggleAllAvailableItems;

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
                bbListbuilderMultiselectItemsChanged: '&?',
                bbListbuilderMultiselectAvailableItems: '<?',
                bbListbuilderMultiselectItemIdProperty: '@?',
                bbListbuilderMultiselectItemSelectedProperty: '@?'
            },
            require: {
                listbuilderCtrl: '^^bbListbuilder'
            },
            transclude: true,
            controller: Controller
        });
})();