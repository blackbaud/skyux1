
/*global describe, it, browser, beforeEach, expect, require */

describe('headers', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });


    it('should take header screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + '_header',
            pageName = screenshotName + '_full';
        browser
            .url('/headers/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-headers'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
