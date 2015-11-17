/*global describe, it, browser, beforeEach, expect, require */

describe('tabset', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });

    it('should take tabset screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'tabset',
            pageName = screenshotName + '_full';
        browser
            .url('/tabset/fixtures/test.full.html')
            .moveToObject('#screenshot-tabset-open-add li:nth-child(2) a')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-tabset-all'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
