/* global describe, it, browser, beforeEach, expect */

describe('actionbar', function () {
    'use strict';

    var screenshot_prefix;

    beforeEach(function (done) {

        browser.session(function (err, res) {
            screenshot_prefix = res.value.platform + '_' + res.value.browserName + '_';
        }).call(done);
    });

    it('should take an actionbar screenshot', function (done) {
        var screenshotName = screenshot_prefix + 'button_default';
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
