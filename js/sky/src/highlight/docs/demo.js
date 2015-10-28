/*global angular */

(function () {
    'use strict';

    function HighlightTestController() {
        var self = this;
        self.highlightText = '';
    }

    angular.module('stache').controller('HighlightTestController', HighlightTestController);
}());
