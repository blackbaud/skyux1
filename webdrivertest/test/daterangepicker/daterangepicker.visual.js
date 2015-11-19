/*global describe, it, browser, beforeEach, expect, require */

describe('daterangepicker', function () {
    'use strict';

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });


    it('should take daterangepickers screenshots', function (done) {
        var screenshotName = 'daterangepicker',
            pageName = screenshotName + '_full';
        browser
            .url('/daterangepicker/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-daterangepicker'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
