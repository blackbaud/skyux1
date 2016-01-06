
/*global describe, it, browser, beforeEach, expect, require */

describe('headers', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });


    it('should take header screenshots', function (done) {
        var screenshotName = 'header',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/headers/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-headers'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
