/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Palette service', function () {
    'use strict';

    var bbPalette,
        bbPaletteConfig,
        multiColors,
        monoColors;

    beforeEach(module('sky.palette'));

    beforeEach(inject(function (_bbPalette_, _bbPaletteConfig_) {
        bbPalette = _bbPalette_;
        bbPaletteConfig = _bbPaletteConfig_;
        multiColors = bbPalette.getColorSequence();
        monoColors = bbPalette.getColorSequence('', 'mono');
    }));

    function testGetColorSequenceEqual(colors, paletteType) {
        var equal = bbPalette.getColorSequence('', paletteType);
        expect(equal).toEqual(colors);
    }

    function testGetColorSequenceUnder(colors, paletteType) {
        var under = bbPalette.getColorSequence(colors.length - 3, paletteType);
        under.forEach(function (el, idx) {
            expect(el).toBe(colors[idx]);
        });
    }

    function testGetColorSequenceOver(colors, paletteType) {
        var over = bbPalette.getColorSequence(colors.length + 1, paletteType);
        expect(over[over.length - 1]).toBe(over[0]);
    }

    function testGetColorByIndexUnder(colors, paletteType) {
        var index = colors.length - 2,
            under = bbPalette.getColorByIndex(index, paletteType);
        expect(under).toBe(colors[index]);
    }

    function testGetColorByIndexOver(colors, paletteType) {
        var over = bbPalette.getColorByIndex(colors.length, paletteType);
        expect(over).toBe(colors[0]);
    }

    describe('getColorSequence() method', function () {
        it('should return the default colors when requestedLength is equal to the total defined colors, when using the default paletteType', function () {
            testGetColorSequenceEqual(multiColors);
        });

        it('should return a subset of colors if the requestedLength is less than the total defined colors, when using the default paletteType', function () {
            testGetColorSequenceUnder(multiColors);
        });

        it('should repeat colors if the requestedLength is more than the total defined colors, when using the default paletteType', function () {
            testGetColorSequenceOver(multiColors);
        });

        it('should return the default colors when requestedLength is equal to the total defined colors, when using the multi paletteType', function () {
            testGetColorSequenceEqual(multiColors, 'multi');
        });

        it('should return a subset of colors if the requestedLength is less than the total defined colors, when using the multi paletteType', function () {
            testGetColorSequenceUnder(multiColors, 'multi');
        });

        it('should repeat colors if the requestedLength is more than the total defined colors, when using the multi paletteType', function () {
            testGetColorSequenceOver(multiColors, 'multi');
        });

        it('should return the default colors when requestedLength is equal to the total defined colors, when using the mono paletteType', function () {
            testGetColorSequenceEqual(monoColors, 'mono');
        });

        it('should return a subset of colors if the requestedLength is less than the total defined colors, when using the mono paletteType', function () {
            testGetColorSequenceUnder(monoColors, 'mono');
        });

        it('should repeat colors if the requestedLength is more than the total defined colors, when using the mono paletteType', function () {
            testGetColorSequenceOver(monoColors, 'mono');
        });
    });


    describe('getColorByIndex() method', function () {
        it('should return a known color within the total available colors, when using the default paletteType', function () {
            testGetColorByIndexUnder(multiColors);
        });

        it('should return a repeated color outside the total available colors, when using the default paletteType', function () {
            testGetColorByIndexOver(multiColors);
        });

        it('should return a known color within the total available colors, when using the multi paletteType', function () {
            testGetColorByIndexUnder(multiColors, 'multi');
        });

        it('should return a repeated color outside the total available colors, when using the multi paletteType', function () {
            testGetColorByIndexOver(multiColors, 'multi');
        });

        it('should return a known color within the total available colors, when using the mono paletteType', function () {
            testGetColorByIndexUnder(monoColors, 'mono');
        });

        it('should return a repeated color outside the total available colors, when using the mono paletteType', function () {
            testGetColorByIndexOver(monoColors, 'mono');
        });
    });

});
