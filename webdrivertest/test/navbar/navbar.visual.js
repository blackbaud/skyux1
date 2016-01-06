/*global describe, it, browser, beforeEach, expect, require */

describe('navbar', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });


    it('should take navbar screenshots', function (done) {
        var screenshotName = 'navbar',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/navbar/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-navbar'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
