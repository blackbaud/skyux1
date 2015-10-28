/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Filter', function () {
    'use strict';

    var bbFormat;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.format'));

    beforeEach(inject(function (_bbFormat_) {
        bbFormat = _bbFormat_;
    }));

    describe('formatText() method', function () {
        it('should format the string', function () {
            var encoded = bbFormat.formatText('{0}{1}{0}', 'a', 'b');

            expect(encoded).toBe('aba');
        });

        it('should return empty string for null or undefined', function () {
            expect(bbFormat.formatText(null)).toBe('');
            expect(bbFormat.formatText()).toBe('');
        });
    });

    describe('escape() method', function () {
        it('should escape HTML tags', function () {
            var escaped = bbFormat.escape('<script>alert("hello&world");</script>');

            expect(escaped).toBe('&lt;script&gt;alert("hello&amp;world");&lt;/script&gt;');
        });

        it('should return empty string for null or undefined', function () {
            expect(bbFormat.escape(null)).toBe('');
            expect(bbFormat.escape()).toBe('');
        });
    });
});