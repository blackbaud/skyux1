
/*global describe, it, browser, beforeEach, expect, console, require */

describe('badges', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {

        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });


    it('should take badge screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'button_default';
        browser
            .url('/badges/fixtures/test.full.html')
            .webdrivercss('badges', [
                {
                    name: screenshotName,
                    elem: '#screenshot-badges'
                }
            ], function (err, res) {
                console.log(err);
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
