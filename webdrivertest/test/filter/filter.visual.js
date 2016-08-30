/*global describe, it, browser */

describe('filter components', function () {
    'use strict';

    it('should match the baseline screenshot of the filter button', function () {
        return browser
            .setupTest('/filter/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'filter_button',
                selector: '#screenshot-filter-button',
                checkAccessibility: true
            });
    });

    it('should match the baseline screenshot of the filter modal footer', function () {
        return browser
            .setupTest('/filter/fixtures/test.full.html')
            .click('#screenshot-filter-button button')
            .waitForVisible('.modal-footer')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'filter_modal_footer',
                selector: '.modal-footer',
                checkAccessibility: true
            })
            .click('.bb-modal .modal-dialog .close');
    });

    it('should match the baseline screenshot of the filter summary', function () {
        return browser
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
            });
    });
});