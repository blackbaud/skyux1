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
            .click('.bb-context-menu-btn')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'modal_dropdown',
                selector: '.modal-content'
            })
            .click('.modal-dialog .close')
            .call(done);
    });
});
