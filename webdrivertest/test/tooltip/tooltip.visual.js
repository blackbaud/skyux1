/*global describe, it, browser, beforeEach, expect, require */

describe('tooltip', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });

    it('should take tooltip screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'tooltip',
            pageName = screenshotName + '_full';
        browser
            .url('/tooltip/fixtures/test.full.html')
            .click('#screenshots-tooltip-link')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '.tooltip'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
