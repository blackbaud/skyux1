(function () {
    'use strict';


    function SortTestController() {
        var self = this,
            repeaterItems;

        function selectItem(item) {
            var result = repeaterItems.sort(function (a, b) {
                switch (item.name) {
                    case 'assigneeNameAZ': 
                        return a.assignee > b.assignee;
                    case 'assigneeNameZA': 
                        return a.assignee < b.assignee;
                    case 'dateCreatedNew':
                        return a.date < b.date;
                    case 'dateCreatedOld': 
                        return a.date > b.date;
                    case 'noteTitleAZ':
                        return a.title > b.title;
                    case 'notTitleZA':
                        return a.title < b.title;   
                }
                return true;
            });

            self.sortedItems = repeaterItems;
        }

        function initSort() {
            self.initialState = self.sortOptions[4].id;
            selectItem(self.sortOptions[4]);
        }
        
        repeaterItems = [
            {
                title: 'Call Robert Hernandez',
                note: 'Robert recently gave a very generous gift. We should call to thank him.',
                assignee: 'Debby Fowler',
                date: new Date('12/22/2015')
            },
            {
                title: 'Send invitation to ball',
                note: 'The Spring Ball is coming up soon. Let\'s get those invitations out!',
                assignee: 'Debby Fowler',
                date: new Date('1/1/2016')
            },
            {
                title: 'Clean up desk',
                note: 'File and organize papers.',
                assignee: 'Tim Howard',
                date: new Date('2/2/2016')
            },
            {
                title: 'Investigate leads',
                note: 'Check out leads for important charity event funding.',
                assignee: 'Larry Williams',
                date: new Date('4/5/2016')
            },
            {
                title: 'Send thank you note',
                note: 'Send a thank you note to Timothy for his donation.',
                assignee: 'Catherine Hooper',
                date: new Date('11/11/2015')
            }
        ];
        
        self.sortItems = selectItem;

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

    SortTestController.$inject = ['bbModal'];

    angular.module('stache')
        .controller('SortTestController', SortTestController);
})();