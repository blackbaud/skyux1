
/*global describe, it, browser, beforeEach, expect, require */

describe('highlight', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });


    it('should take highlight screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'highlight',
            pageName = screenshotName + '_full';
        browser
            .url('/highlight/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-highlight'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
