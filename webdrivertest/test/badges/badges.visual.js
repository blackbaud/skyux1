
/*global describe, it, browser, beforeEach, expect */

describe('badges', function () {
    'use strict';

    var screenshot_prefix;

    beforeEach(function (done) {

        browser.session().then(function (res) {
            screenshot_prefix =  res.value.platform + '_' + res.value.browserName + '_';
        }).call(done);
    });


    it('should take badge screenshots', function (done) {
        var screenshotName = screenshot_prefix + 'button_default';
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
