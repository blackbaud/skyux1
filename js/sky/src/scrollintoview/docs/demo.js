/*global angular */
(function () {
    'use strict';

    function ScrollIntoViewTestController() {
        var self = this;

        self.resources = {
            tile_header: 'Tile header'
        };

        self.is_collapsed = false;

        self.scrollIntoView = function () {
            self.scrollIntoViewCount = (self.scrollIntoViewCount || 0) + 1;
        };

        self.scrollParentIntoView = function () {
            self.scrollParentIntoViewCount = (self.scrollParentIntoViewCount || 0) + 1;
        };
    }

    angular.module('stache').controller('ScrollIntoViewTestController', ScrollIntoViewTestController);

}());
