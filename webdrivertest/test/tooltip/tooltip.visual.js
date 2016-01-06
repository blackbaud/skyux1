/*global describe, it, browser, beforeAll, expect, require */

describe('tooltip', function () {
    'use strict';

    var options = {};

    beforeAll(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });

    it('should take tooltip screenshots', function (done) {
        var screenshotName = 'tooltip',
            pageName = options.prefix + screenshotName + '_full';
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
