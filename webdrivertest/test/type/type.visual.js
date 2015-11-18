/*global describe, it, browser, beforeEach, expect, require */

describe('type', function () {
    'use strict';

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });

    it('should take type screenshots', function (done) {
        var screenshotName = 'type',
            pageName = screenshotName + '_full';
        browser
            .url('/type/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-type .bb-text-block'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
