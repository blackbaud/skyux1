
/*global describe, it, browser, beforeEach, expect, require */

describe('check', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });

    it('should take check screenshots', function (done) {
        var screenshotName = 'check',
            pageName = screenshotName + '_full';
        browser
            .url('/check/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-check'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
