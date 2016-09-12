/* global angular */
(function () {
    'use strict';


    function SortTestController() {
        var self = this;


        function initSort() {
            self.initialState = self.sortOptions[4].id;
        }
        

        self.sortOptions = [
            {
                id: 1,
                label: 'Assignee name (A - Z)',
                name: 'assigneeNameAZ'
            },
            {
                id: 2,
                label: 'Assignee name (Z - A)',
                name: 'assigneeNameZA'
            },
            {
                id: 3,
                label: 'Date created (newest first)',
                name: 'dateCreatedNew'
            },
            {
                id: 4,
                label: 'Date created (oldest first)',
                name: 'dateCreatedOld'
            },
            {
                id: 5,
                label: 'Note title (A - Z)',
                name: 'noteTitleAZ'
            },
            {
                id: 6,
                label: 'Note title (Z - A)',
                name: 'noteTitleZA'
            }
        ];

        initSort();
        
    }

    angular.module('screenshots', ['sky'])
        .controller('SortTestController', SortTestController);
})();