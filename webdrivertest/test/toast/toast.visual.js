/*global describe, it, browser, require */

describe('toast', function () {
    'use strict';

    it('should match the baseline toast default screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open')
            .waitForVisible('#toast-container')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'toast',
                selector: '#toast-container'
            })
            .call(done);
    });

    it('should match the baseline toast info screenshot', function (done) {
        var common = require('../common');

        
        browser
            .setupTest('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open-info')
            .waitForVisible('#toast-container')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'toast_info',
                selector: '#toast-container'
            })
            .call(done);
    });

    it('should match the baseline toast success screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open-success')
            .waitForVisible('#toast-container')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'toast_success',
                selector: '#toast-container'
            })
            .call(done);
    });

    it('should match the baseline toast warning screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open-warning')
            .waitForVisible('#toast-container')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'toast_warning',
                selector: '#toast-container'
            })
            .call(done);
    });

    it('should match the baseline toast danger screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/toast/fixtures/test.full.html')
            .click('#screenshot-toast-open-danger')
            .waitForVisible('#toast-container')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'toast_danger',
                selector: '#toast-container'
            })
            .call(done);
    });
});
