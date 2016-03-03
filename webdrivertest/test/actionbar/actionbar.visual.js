/* global describe, it, browser, beforeEach,  expect, require */


describe('actionbar', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });

    it('should take an actionbar screenshot', function (done) {
        var screenshotName = 'actionbar',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/actionbar/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-actionbar',
                    screenWidth: [480, 1280]
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .call(done);
    });
});
