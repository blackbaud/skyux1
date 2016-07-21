/* global angular */

(function () {
    'use strict';

    function SearchTestController() {
        var self = this,
            items;
        
        function applySearchText(searchText) {
            var filteredItems = items;
            self.searchText = searchText;
            if (searchText) {
                filteredItems = items.filter(function (item) {
                    var property;
                    for (property in item) {
                        if (item.hasOwnProperty(property) && (property === 'title' || property === 'notes')) {
                            if (item[property].indexOf(searchText) > -1) {
                                return true;
                            }
                        }
                    }
                    return false;
                });
            }
            self.items = filteredItems;
        }

        function searchInputToggled(isVisible) {
            self.dismissableSearchShown = isVisible;
        }


        items = [
            {
                title: 'Call Robert Hernandez',
                note: 'Robert recently gave a very generous gift.  We should call him to thank him.'
            },
            {
                title: 'Send invitation to ball',
                note: 'The Spring Ball is coming up soon.  Let\'s get those invitations out!'
            },
            {
                title: 'Do several things',
                note: 'File stuff, staple papers'
            },
            {
                title: 'Investigate leads',
                note: 'Check out leads for important charity event funding'
            },
            {
                title: 'Send thank you note',
                note: 'Send a thank you note to Jimithy for his donation'
            }
        ];

        self.applySearchText = applySearchText;
        self.searchInputToggled = searchInputToggled;
        self.items = items;
    }

    angular.module('stache')
        .controller('SearchTestController', SearchTestController);

})();