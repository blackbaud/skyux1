/*global angular */

(function () {
    'use strict';

    var content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    function RepeaterTestController() {
        var vm = this;

        vm.expandMode = 'single';
        vm.showContextMenu = true;
        vm.showTitle = true;

        vm.items = [
            {
                title: 'Title 1',
                content: content
            },
            {
                title: 'Title 2',
                content: content
            }
        ];

        vm.addItem = function () {
            var next = vm.items.length + 1;
            vm.items.push({
                title: 'Title ' + next,
                content: content,
                expanded: true
            });
        }
    }

    angular.module('stache')
        .controller('RepeaterTestController', RepeaterTestController);
}());
