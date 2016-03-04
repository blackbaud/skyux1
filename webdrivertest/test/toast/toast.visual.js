/*global describe, it, browser, require */

describe('toast', function () {
    'use strict';

    it('should match the baseline toast screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'toast',
            selector: '#screenshot-toast',
            done: done
        });
    });

    it('should match the baseline screenshot when the mouse is over the toast', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container')
            .moveToObject('#toast-container');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'toast_mouseover',
            selector: '#screenshot-toast',
            done: done
        });
    });

    it('should match the baseline screenshot when the mouse is over the toast close button', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container')
            .moveToObject('#toast-container .toast-close-button');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'toast_mouseover_close',
            selector: '#screenshot-toast',
            done: done
        });
    });

});
