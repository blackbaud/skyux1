
/*global describe, it, browser, beforeEach, expect, console, require */

describe('badges', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {

        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });


    it('should take badge screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'badges';
        console.log('starting: ' + screenshotName);
        browser
            .url('/badges/fixtures/test.full.html')
            .webdrivercss('badges', [
                {
                    name: screenshotName,
                    elem: '#screenshot-badges'
                }
            ], function (err, res) {
                console.log('finishing: ' + screenshotName);
                console.log('err: ');
                console.log(err);
                console.log('res: ');
                console.log(res);
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
                console.log('finished: ' + screenshotName);
            }).call(done);
    });
});
