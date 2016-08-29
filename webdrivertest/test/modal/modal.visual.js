/*global describe, it, browser */

describe('modals', function () {
    'use strict';

    it('modal', function () {
        return browser
            .setupTest('/modal/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'modal',
                selector: '#screenshot-modal',
                checkAccessibility: true
            });
    });

    it('modal_dropdown', function () {
        return browser
            .setupTest('/modal/fixtures/test.full.html')
            .click('.bb-test-dropdown')
            .pause(1000)
            .click('.bb-context-menu-btn')
            .compareScreenshot({
                screenshotName: 'modal_dropdown',
                selector: '.modal-content',
                checkAccessibility: true
            })
            .click('.bb-modal .modal-dialog .close');
    });

    /*it('should match the baseline full-page modal screenshot', function (done) {

        browser
            .setupTest('/modal/fixtures/test.full.html')
            .click('.bb-test-fullpage')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'modal_fullpage',
                checkAccessibility: true,
                selector: '.bb-modal-fullpage'
            })
            .click('.bb-modal .modal-dialog .close')
            .call(done);
    });*/
});
