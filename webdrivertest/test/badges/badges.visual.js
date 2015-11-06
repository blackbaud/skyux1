
/*global describe, it, browser, expect */

describe('badges', function () {
    'use strict';
    it('should take badge screenshots', function (done) {
        var screenshotName = this.screenshot_prefix + 'button_default';
        browser
            .url('/badges/fixtures/test.full.html')
            .webdrivercss('badges', [
                {
                    name: screenshotName,
                    elem: '#screenshot-badges'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
