/* global describe, it, browser, beforeEach, expect */

beforeEach(function (done) {
    'use strict';
    browser.session(function (err, res) {
        this.screenshot_prefix = res.value.platform + '_' + res.value.browserName + '_';
    }).call(done);
});

describe('actionbar', function () {
    'use strict';
    it('should take an actionbar screenshot', function (done) {
        var screenshotName = this.screenshot_prefix + 'button_default';
        browser
            .url('/actionbar/fixtures/test.full.html')
            .webdrivercss('actionbar', [
                {
                    name: screenshotName,
                    elem: '#screenshot-actionbar'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
