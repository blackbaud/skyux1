/*global describe, it, browser, require */

describe('toast', function () {
    'use strict';

    it('should match the baseline toast default screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'toast',
            selector: '#toast-container',
            done: done
        });
    });

    it('should match the baseline toast info screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open-info')
            .waitForVisible('#toast-container');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'toast_info',
            selector: '#toast-container',
            done: done
        });
    });

    it('should match the baseline toast success screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open-success')
            .waitForVisible('#toast-container');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'toast_success',
            selector: '#toast-container',
            done: done
        });
    });

    it('should match the baseline toast warning screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open-warning')
            .waitForVisible('#toast-container');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'toast_warning',
            selector: '#toast-container',
            done: done
        });
    });

    it('should match the baseline toast danger screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open-danger')
            .waitForVisible('#toast-container');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'toast_danger',
            selector: '#toast-container',
            done: done
        });
    });
});
