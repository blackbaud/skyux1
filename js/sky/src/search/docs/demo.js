/* global angular */

(function () {
    'use strict';

    function SearchTestController() {
        var self = this;
        
        function applySearchText(searchText) {
            self.searchText = searchText;
            console.log('applied: ', searchText);
        }

        function searchInputToggled(isVisible) {
            self.dismissableSearchShown = isVisible;
        }

        self.applySearchText = applySearchText;
        self.searchInputToggled = searchInputToggled;
        self.searchText = 'search';
    }

    angular.module('stache')
        .controller('SearchTestController', SearchTestController);

})();