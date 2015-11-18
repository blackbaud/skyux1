/*global describe, it, browser, beforeEach, expect, require */

describe('tooltip', function () {
    'use strict';

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });

    it('should take tooltip screenshots', function (done) {
        var screenshotName = 'tooltip',
            pageName = screenshotName + '_full';
        browser
            .url('/tooltip/fixtures/test.full.html')
            .click('#screenshots-tooltip-link')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '.tooltip'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
