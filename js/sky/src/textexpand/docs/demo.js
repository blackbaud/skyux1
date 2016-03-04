/*jslint browser: true, plusplus: true */
/*global angular */
(function () {
    'use strict';

    function ReadMoreTestController() {
        var self = this;
        self.longText = 'Lorem ipsum dolor sit amet, \ndsfdsfdsfgdsfgsdfgssdfgdsfg dfgds fgdsfg dsfg dfgdsfg sdfgdfg\n';
        self.reallyLongText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, \nsed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\n\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n';
        self.repeaterData = [{ text: 'Repeater item 1' }, { text: 'Repeater item 2' }, { text: 'Repeater item 3' }, { text: 'Repeater item 4' }, { text: 'Repeater item 5' }];
        self.modalTitle = 'The expanded view title';

    }

    angular.module('stache').controller('ReadMoreTestController', ReadMoreTestController);

}());
