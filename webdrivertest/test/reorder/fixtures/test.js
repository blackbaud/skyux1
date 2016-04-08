
/* global angular*/

(function () {
    'use strict';

    function ReorderTestController() {
        var vm = this;

        vm.itemsToSort = [
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
        .controller('ReorderTestController', ReorderTestController);
}());
