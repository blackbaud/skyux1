/*global describe, it, browser, require, expect */

describe('modals', function () {
    'use strict';

    it('match the baseline modal screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/modal/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'modal',
                selector: '#screenshot-modal'
            })
            .call(done);
    });

    it('match the baseline modal with context menu screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/modal/fixtures/test.full.html')
            .click('.bb-test-dropdown')
            .pause(1000)
            .click('.bb-context-menu-btn')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'modal_dropdown',
                selector: '.modal-content'
            })
            .click('.bb-modal .modal-dialog .close')
            .call(done);
    });

    it('should match the baseline full-page modal screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/modal/fixtures/test.full.html')
            .click('.bb-test-fullpage')
            .pause(1000)
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'modal_fullpage',
                selector: 'html'
            })
            .click('.bb-modal .modal-dialog .close')
            .call(done);
    });
});
