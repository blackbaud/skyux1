/*global describe, it, browser, beforeEach, expect, require */

describe('toast', function () {
    'use strict';

    var screenshot_prefix = {};

    browser.url('/toast/fixtures/test.full.html');

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });

    it('should take toast screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'toast',
            pageName = screenshotName + '_full';
        browser
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-toast'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take toast mouseover screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'toast_mouseover',
            pageName = screenshotName + '_full';
        browser
            .moveToObject('#toast-container')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-toast'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take toast close mouseover screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'toast_mouseover_close',
            pageName = screenshotName + '_full';
        browser
            .moveToObject('#toast-container .toast-close-button')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-toast'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

});
