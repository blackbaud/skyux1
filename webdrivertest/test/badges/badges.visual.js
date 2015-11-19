
/*global describe, it, browser, beforeEach, expect, require */

describe('badges', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });


    it('should take badge screenshots', function (done) {
        var screenshotName = 'badges',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/badges/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-badges'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .call(done);
    });
});
