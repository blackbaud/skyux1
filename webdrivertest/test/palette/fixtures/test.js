/*global angular */
(function () {
    'use strict';
    angular.module('screenshots', ['sky'])
        .controller('PaletteTestController', [
            'bbPaletteConfig', 'bbPalette', function (bbPaletteConfig, bbPalette) {
                var self = this;
                self.paletteService = bbPalette;
            }
        ]);
}());
