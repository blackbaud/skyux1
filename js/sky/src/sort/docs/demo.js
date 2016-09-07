(function () {
    'use strict';


    function SortTestController() {
        var self = this;

        function selectItem(item) {
            self.selectedItem = item;
        }


        self.sortItems = selectItem;

        self.items = [
            {
                id: 1,
                label: 'Last invoice amount (largest first)',
                name: 'lastInvoiceLarge'
            },
            {
                id: 2,
                label: 'Last invoice amount (smallest first)',
                name: 'lastInvoiceSmall'
            },
            {
                id: 3,
                label: 'Last invoice date (newest first)',
                name: 'lastInvoiceNew'
            },
            {
                id: 4,
                label: 'Last invoice date (oldest first)',
                name: 'lastInvoiceOld'
            },
            {
                id: 5,
                label: 'Total balance due (largest first)',
                name: 'totalBalanceLarge'
            },
            {
                id: 6,
                label: 'Total balance due (smallest first)',
                name: 'totalBalanceSmall'
            },
            {
                id: 7,
                label: 'Vendor name (A - Z)',
                name: 'vendorNameAZ'
            },
            {
                id: 8,
                label: 'Vendor name (Z - A)',
                name: 'vendorNameZA'
            }
        ];

        self.initialState = self.items[6].id;
    }

    SortTestController.$inject = ['bbModal'];

    angular.module('stache')
        .controller('SortTestController', SortTestController);
})();