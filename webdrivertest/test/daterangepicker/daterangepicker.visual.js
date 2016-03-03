/*global describe, it, browser, beforeEach, expect, require */

describe('daterangepicker', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });


    it('should take daterangepickers screenshots', function (done) {
        var screenshotName = 'daterangepicker',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/daterangepicker/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-daterangepicker'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take daterangepicker specific date screenshots', function (done) {
        var screenshotName = 'daterangepicker_specific',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/daterangepicker/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-daterangepicker-specific'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
