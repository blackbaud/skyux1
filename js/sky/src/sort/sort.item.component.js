/* global angular */
(function () {
    'use strict';

    function Controller() {
        var self = this;

        function itemSelected() {
            self.sortCtrl.selectItem(self);
            self.bbSortItemSelect();
        }

        function onInit() {
            self.sortCtrl.addItem(self);
            if (self.bbSortItemActive) {
                self.sortCtrl.selectItem(self);
            }
        }

        function onChanges(changesObj) {
            if (changesObj.bbSortItemActive && 
                changesObj.bbSortItemActive.currentValue && 
                changesObj.bbSortItemActive.currentValue !== changesObj.bbSortItemActive.previousValue) {
                
                self.sortCtrl.selectItem(self);
            }
        }

        self.$onInit = onInit;
        self.$onChanges = onChanges;

        self.itemSelected = itemSelected;
    }

    angular.module('sky.sort.item.component', [])
        .component('bbSortItem', {
            require: {
                sortCtrl: '^bbSort'
            },
            templateUrl: 'sky/templates/sort/sort.item.component.html',
            transclude: true,
            controller: Controller,
            bindings: {
                bbSortItemSelect: '&?',
                bbSortItemActive: '<?'
            }
        });
})();