/* global describe, it, browser, beforeEach,  expect, console, require */


describe('actionbar', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });

    it('should take an actionbar screenshot', function (done) {
        var screenshotName = screenshot_prefix.value + '_actionbar';
        console('starting: ' + screenshotName);
        browser
            .url('/actionbar/fixtures/test.full.html')
            .webdrivercss('actionbar', [
                {
                    name: screenshotName,
                    elem: '#screenshot-actionbar'
                }
            ], function (err, res) {
                console('finishing: ' + screenshotName);
                console.log(err);
                expect(err).toBe(undefined);

                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);

                console('finished: ' + screenshotName);
            }).call(done);
    });
});
