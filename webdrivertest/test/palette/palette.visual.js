/*global describe, it, browser, beforeEach, expect, require */

describe('palette', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });


    it('should take palette screenshots', function (done) {
        var screenshotName = 'palette',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/palette/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-palette'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
