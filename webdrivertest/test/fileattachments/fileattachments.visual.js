/*global describe, it, browser, beforeEach, expect, require */

describe('file attachments', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });


    it('should take fileattachment screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'fileattachments',
            pageName = screenshotName + '_full';
        browser
            .url('/fileattachments/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-fileattachments'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
