
/*global describe, it, browser, beforeEach, expect, require */

describe('textexpand', function () {
    'use strict';

    var screenshot_prefix = {};

    browser.url('/textexpand/fixtures/test.full.html');

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });

    it('should take textexpand collapsed screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'textexpand_collapsed',
            pageName = screenshotName + '_full';
        browser
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-text-expand-all'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take textexpand expanded screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'textexpand_expanded',
            pageName = screenshotName + '_full';
        browser
            .click('#screenshot-text-expand .bb-text-expand-see-more')
            .click('#screenshot-text-expand-line-break .bb-text-expand-see-more')
            .click('#screenshot-text-expand-repeater .bb-text-expand-see-more')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-text-expand-all'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
