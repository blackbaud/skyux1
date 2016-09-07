/* global angular */
(function () {
    'use strict';

    function Controller() {
        var self = this;

        function selectItem(sortItem) {
            var i,
                item;
            for (i = 0; i < self.sortItems.length; i++) {
                item = self.sortItems[i];
                if (sortItem === item) {
                    item.isSelected = true;
                } else {
                    item.isSelected = false;
                }
            }
        }

        function addItem(sortItem) {
            self.sortItems.push(sortItem);
        }

        function initSort() {
            self.sortItems = [];
        }

        self.$onInit = initSort;
        self.selectItem = selectItem;
        self.addItem = addItem;
    }

    angular.module('sky.sort.component', ['ui.bootstrap.dropdown', 'sky.resources'])
        .component('bbSort', {
            controller: Controller,
            templateUrl: 'sky/templates/sort/sort.component.html',
            transclude: true
        });
})();