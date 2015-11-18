
/*global describe, it, browser, beforeEach, expect, require */

describe('tabs', function () {
    'use strict';

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });


    it('should take tab screenshots', function (done) {
        var screenshotName = 'tabs',
            pageName = screenshotName + '_full';
        browser
            .url('/tabs/fixtures/test.full.html')
            .moveToObject('#screenshot-tab-2')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-tabs'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
