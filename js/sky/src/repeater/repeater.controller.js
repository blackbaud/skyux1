/*global angular */

(function () {
    'use strict';

    function BBRepeaterController($scope) {
        var items = [],
            vm = this;

        function expandModeIsMultiple() {
            return vm.bbRepeaterExpandMode === 'multiple';
        }

        function expandModeIsSingle() {
            return vm.bbRepeaterExpandMode === 'single';
        }

        function expandModeIsNone() {
            return !expandModeIsMultiple() && !expandModeIsSingle();
        }

        function updateForExpandMode() {
            var foundExpanded,
                isCollapsible = !expandModeIsNone(),
                isSingle = expandModeIsSingle();

            items.forEach(function (item) {
                item.isCollapsible = isCollapsible;

                if (isSingle && item.bbRepeaterItemExpanded) {
                    if (foundExpanded) {
                        item.bbRepeaterItemExpanded = false;
                    }

                    foundExpanded = true;
                }
            });
        }

        vm.addItem = function (item) {
            items.push(item);
        };

        vm.removeItem = function (item) {
            var itemIndex = items.indexOf(item);

            /*istanbul ignore else */
            /* sanity check */
            if (itemIndex >= 0) {
                items.splice(itemIndex, 1);
            }
        };

        vm.itemExpanded = function (expandedItem) {
            if (vm.bbRepeaterExpandMode === 'single') {
                items.forEach(function (item) {
                    if (item !== expandedItem) {
                        item.bbRepeaterItemExpanded = false;
                    }
                });
            }
        };

        $scope.$watch(function () {
            return vm.bbRepeaterExpandMode;
        }, updateForExpandMode);

        $scope.$watchCollection(function () {
            return items;
        }, function () {
            updateForExpandMode();
        });
    }

    BBRepeaterController.$inject = ['$scope'];

    angular.module('sky.repeater.controller', [])
        .controller('BBRepeaterController', BBRepeaterController);
}());
