/* global angular */

(function () {
    'use strict';

    function SearchTestController() {
        var self = this;
        
        function applySearchText(searchText) {
            self.searchText = searchText;
        }

        function searchInputToggled(isVisible) {
            self.dismissableSearchShown = isVisible;
        }

        self.applySearchText = applySearchText;
        self.searchInputToggled = searchInputToggled;
    }

    angular.module('screenshots', ['sky'])
        .controller('SearchTestController', SearchTestController);

})();