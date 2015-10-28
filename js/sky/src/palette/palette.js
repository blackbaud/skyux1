/*global angular */

/** @module Palette
@icon paint-brush
@summary The palette service provides methods for consistently producing a sequence of colors for Sky.
@description The palette service gives you the following functions:

  - `getColorByIndex(index, paletteType)` Get a specific color by it's index in the palette.
    - 'index' A required integer for the index of the color.
    - 'paletteType' An optional string representing either `mono` or the default `multi`.
  - `getColorSequence(requestedLength, paletteType)` Returns an array of colors for the requested length.  When using with `ng-repeat`, be sure to use the `track by` syntax since we return duplicates.
    - 'requestedLength' A required integer for the size of the array of colors you want returned.
    - 'paletteType' An optional string representing either `mono` or the default `multi`.

*/

(function () {
    'use strict';

    angular.module('sky.palette', ['sky.palette.config'])
        .factory('bbPalette', ['bbPaletteConfig', function (bbPaletteConfig) {

            function getPaletteByType(paletteType) {
                return bbPaletteConfig[paletteType || 'multi'];
            }

            return {
                getColorByIndex: function (index, paletteType) {
                    var palette = getPaletteByType(paletteType);
                    return palette[index % palette.length];
                },
                getColorSequence: function (requestedLength, paletteType) {

                    var i,
                        palette = getPaletteByType(paletteType),
                        paletteLength,
                        r = [];

                    paletteLength = palette.length;
                    requestedLength = requestedLength || paletteLength;

                    for (i = 0; i < requestedLength; i++) {
                        r.push(palette[i % paletteLength]);
                    }

                    return r;
                }
            };
        }]);
}());
