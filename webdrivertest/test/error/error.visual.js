/*global describe, it, browser, beforeEach, expect, require */

describe('error', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });


    it('should take error screenshots', function (done) {
        var screenshotName = 'error',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/error/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-error'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

});
