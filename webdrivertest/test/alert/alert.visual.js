/* global describe, it, browser, beforeEach,  expect, require */


describe('Alert', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });

    it('should match previous screenshot', function (done) {
        var screenshotName = 'alert',
            pageName = options.prefix + screenshotName + '_full';

        browser
            .url('/alert/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-alert'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .call(done);
    });
});
