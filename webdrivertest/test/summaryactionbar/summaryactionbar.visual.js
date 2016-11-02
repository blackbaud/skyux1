/*global describe, it, browser */

describe('summary actionbar', function () {
    'use strict';

    it('should match the baseline screenshot of the summary actionbar', function () {
        return browser
            .setupTest('/summaryactionbar/fixtures/test.full.html')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'summaryactionbar',
                selector: 'body',
                checkAccessibility: true
            });
    });

    it('should match the baseline screenshot of the summary actionbar with 3 buttons', function () {
        return browser
            .setupTest('/summaryactionbar/fixtures/test.full.html')
            .click('.bb-test-show-third')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'summaryactionbar_threebutton',
                selector: 'body',
                checkAccessibility: true
            });
    });

    it('should match the baseline screenshot of the summary actionbar with 3 buttons expanded', function () {
        return browser
            .setupTest('/summaryactionbar/fixtures/test.full.html')
            .click('.bb-test-show-third')
            .click('.bb-btn-secondary.dropdown-toggle')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'summaryactionbar_threebutton_expanded',
                selector: 'body',
                checkAccessibility: true
            });
    });

    it('should match the baseline screenshot of the summary actionbar on small screens when expanded', function () {
        return browser
            .setupTest('summaryactionbar/fixtures/test.full.html', 480)
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'summaryactionbar_small_expanded',
                selector: 'body',
                checkAccessibility: true
            });
    });

    it('should match the baseline screenshot of the summary actionbar on small screens when collapsed', function () {
        return browser
            .setupTest('/summaryactionbar/fixtures/test.full.html', 480)
            .click('.bb-summary-actionbar-details-collapse button')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'summaryactionbar_small_collapsed',
                selector: 'body',
                checkAccessibility: true
            });
    });

    it('should match the baseline screenshot of the summary actionbar in a modal footer', function () {
        return browser
            .setupTest('/summaryactionbar/fixtures/test.full.html')
            .click('.bb-test-open-modal')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'summaryactionbar_modal',
                selector: '.modal-content',
                checkAccessibility: true
            })
            .click('.bb-modal .modal-dialog .close');
    });

    it('should match the baseline screenshot of the summary actionbar in a full page modal footer', function () {
        return browser
            .setupTest('/summaryactionbar/fixtures/test.full.html')
            .click('.bb-test-open-modal-fullpage')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'summaryactionbar_modal_fullpage',
                selector: 'body',
                checkAccessibility: true
            })
            .click('.bb-modal .modal-dialog .close');
    });

});
