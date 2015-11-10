/* global describe, it, browser, beforeEach, expect */

describe('actionbar', function () {
    'use strict';

    var screenshot_prefix;

    beforeEach(function (done) {

        browser.status().then(function (res) {
            var osName = res.value.os.name.replace(/\s+/g, '');
            screenshot_prefix =  osName + '_' + res.value.os.version + '_';

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
