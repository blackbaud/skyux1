
/*global describe, it, browser, beforeEach, expect, require */

describe('check', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });


    it('should take check screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + '_check',
            pageName = screenshotName + '_full';
        browser
            .url('/check/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-check'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
