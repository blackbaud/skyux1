/*global describe, it, browser, beforeEach, expect, require */

describe('repeaters', function () {
    'use strict';

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });


    it('should take repeaters screenshots', function (done) {
        var screenshotName = 'repeaters',
            pageName = screenshotName + '_full';
        browser
            .url('/repeaters/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-repeaters-full'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
