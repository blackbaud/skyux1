/*global describe, it, browser, beforeEach, expect, require */

describe('checklist', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });


    it('should take checklist screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'checklist',
            pageName = screenshotName + '_full';
        browser
            .url('/checklist/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-checklist'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
