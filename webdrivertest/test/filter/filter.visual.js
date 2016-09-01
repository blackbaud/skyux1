/*global describe, it, browser */

describe('filter components', function () {
    'use strict';

    it('should match the baseline screenshot of the filter button', function (done) {
        browser
            .setupTest('/filter/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'filter_button',
                selector: '#screenshot-filter-button',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline screenshot of the filter button when active', function (done) {
        browser
            .setupTest('/filter/fixtures/test.full.html')
            .click('.bb-filter-set-active')
            .compareScreenshot({
                screenshotName: 'filter_button_active',
                selector: '#screenshot-filter-button',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline screenshot of the filter button when active and focused', function (done) {
        browser
            .setupTest('/filter/fixtures/test.full.html')
            .click('.bb-filter-set-active')
            .focusElement('#screenshot-filter-button .bb-btn-secondary')
            .compareScreenshot({
                screenshotName: 'filter_button_active_focus',
                selector: '#screenshot-filter-button',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline screenshot of the filter modal footer', function (done) {
        browser
            .setupTest('/filter/fixtures/test.full.html')
            .click('#screenshot-filter-button button')
            .waitForVisible('.modal-footer')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'filter_modal_footer',
                selector: '.modal-footer',
                checkAccessibility: true
            })
            .click('.bb-modal .modal-dialog .close')            
            .call(done);
    });

    it('should match the baseline screenshot of the filter summary', function (done) {
        browser
            .setupTest('/filter/fixtures/test.full.html')
            .click('#screenshot-filter-button button')
            .waitForVisible('.modal-content')
            .click('#bb-hide-vege')
            .click('.btn-primary')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'filter_summary',
                selector: '#screenshot-filter-summary',
                checkAccessibility: true
            })
            .call(done);
    });
});