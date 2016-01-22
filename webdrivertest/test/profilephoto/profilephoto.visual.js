/* global describe, it, browser, beforeEach,  expect, require */


describe('Profile photo', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });

    function takeScreenshot(type, done) {
        var screenshotName = 'profilephoto_' + type,
            pageName = options.prefix + screenshotName + '_full';

        browser
            .url('/profilephoto/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-profilephoto-' + type
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .call(done);
    }

    it('should match previous screenshot where image is available', function (done) {
        takeScreenshot('image', done);
    });

    it('should match previous screenshot where image is not available', function (done) {
        takeScreenshot('placeholder', done);
    });
});
