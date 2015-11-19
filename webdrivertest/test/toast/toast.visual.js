/*global describe, it, browser, beforeAll, expect, require */

describe('toast', function () {
    'use strict';

    beforeAll(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });

    it('should take toast screenshots', function (done) {
        var screenshotName = 'toast',
            pageName = screenshotName + '_full';
        browser
            .url('/toast/fixtures/test.full.html')
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
        var screenshotName = 'toast_mouseover',
            pageName = screenshotName + '_full';
        browser
            .url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container')
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
        var screenshotName = 'toast_mouseover_close',
            pageName = screenshotName + '_full';
        browser
            .url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container')
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
