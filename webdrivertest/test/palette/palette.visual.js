/*global describe, it, browser, beforeEach, expect, require */

describe('palette', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });


    it('should take palette screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + '_palette',
            pageName = screenshotName + '_full';
        browser
            .url('/navbar/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-palette'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
