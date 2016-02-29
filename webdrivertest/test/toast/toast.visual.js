/*global describe, it, browser, beforeEach, require */

describe('toast', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('should match the baseline toast screenshot', function (done) {
        var result;

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'toast',
            selector: '#screenshot-toast',
            done: done
        });
    });

    it('should match the baseline screenshot when the mouse is over the toast', function (done) {
        var result;

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container')
            .moveToObject('#toast-container');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'toast_mouseover',
            selector: '#screenshot-toast',
            done: done
        });
    });

    it('should match the baseline screenshot when the mouse is over the toast close button', function (done) {
        var result;

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container')
            .moveToObject('#toast-container .toast-close-button');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'toast_mouseover_close',
            selector: '#screenshot-toast',
            done: done
        });
    });

});
