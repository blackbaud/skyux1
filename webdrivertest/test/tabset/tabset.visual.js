/*global describe, it, browser, beforeEach, expect, require */

describe('tabset', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });

    it('should take tabset screenshots', function (done) {
        var screenshotName = 'tabset',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/tabset/fixtures/test.full.html')
            .moveToObject('#screenshot-tabset-open-add li:nth-child(2) a')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-tabset-all',
                    screenWidth: [480, 1280]
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
