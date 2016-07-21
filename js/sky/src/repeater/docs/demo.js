/*global angular */

(function () {
    'use strict';

    function RepeaterTestController() {
        var vm = this;

        vm.expandMode = 'none';
        vm.showContextMenu = true;
        vm.showTitle = true;
        vm.showCheck = false;

        vm.items = [
            {
                title: 'Call Robert Hernandez',
                note: 'Robert recently gave a very generous gift.  We should call him to thank him.',
                status: 'Completed',
                statusType: 'success'
            },
            {
                title: 'Send invitation to ball',
                note: 'The Spring Ball is coming up soon.  Let\'s get those invitations out!',
                status: 'Past due',
                statusType: 'warning'
            }
        ];

        vm.addItem = function () {
            var next = vm.items.length + 1;
            vm.items.push({
                title: 'New reminder ' + next,
                note: 'This is a new reminder',
                expanded: true,
                status: 'Active',
                statusType: 'info'
            });
        }

        vm.getStatusCls = function (item) {
            return 'label-' + item.statusType;
        }
    }

    angular.module('stache')
        .controller('RepeaterTestController', RepeaterTestController);
}());
