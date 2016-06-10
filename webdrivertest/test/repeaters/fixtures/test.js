/*global angular */
(function () {
    'use strict';

    function RepeaterTestController() {
        var vm = this;

        vm.switchToComponent = function () {
            vm.showComponent = true;
        };

        vm.hideTitle = function () {
            vm.showTitle = false;
        };

        vm.hideContextMenu = function () {
            vm.showContextMenu = false;
        };

        vm.hideCheckbox = function () {
            vm.showCheckbox = false;
        };

        vm.setExpandMode = function (expandMode) {
            vm.expandMode = expandMode;
        };

        vm.showTitle = true;
        vm.showContextMenu = true;
        vm.showCheckbox = true;
        vm.expandMode = 'multiple';

        vm.items = [
            {
                title: 'Title 1',
                description: 'Description 1'
            },
            {
                title: 'Title 2',
                description: 'Description 2'
            },
            {
                title: 'Title 3',
                description: 'Description 3'
            },
            {
                title: 'Title 4',
                description: 'Description 4'
            }
        ];
    }

    angular.module('screenshots', ['sky'])
        .controller('RepeaterTestController', RepeaterTestController);
}());
