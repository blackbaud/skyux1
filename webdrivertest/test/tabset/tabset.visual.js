/*global describe, it, browser */

describe('tabset', function () {
    'use strict';

    function tabsetTest(screenWidth) {
        return browser
            .setupTest('/tabset/fixtures/test.full.html', screenWidth)
            .moveToObject('#screenshot-tabset-open-add li:nth-child(2) a')
            .compareScreenshot({
                screenshotName: 'tabset',
                selector: '#screenshot-tabset-all',
                checkAccessibility: true
            });
    }

    function verticalTabsetTest(screenWidth, groups) {
        var selector = groups ? '#screenshot-vertical-tabset-groups' : '#screenshot-vertical-tabset-no-groups';
        return browser
            .setupTest('/tabset/fixtures/test.full.html', screenWidth)
            .moveToObject(selector + ' li:nth-child(2) a')
            .compareScreenshot({
                screenshotName: 'vertical_tabset',
                selector: '#screenshot-tabset-vertical-all',
                checkAccessibility: true
            });
    }

    it('should match the baseline tabset screenshot', function () {
        return tabsetTest(1280);
    });

    it('should match the baseline tabset screenshot when close button is focused', function () {
        return browser.setupTest('/tabset/fixtures/test.full.html')
            .focusElement('.bb-test-close-focus')
            .compareScreenshot({
                screenshotName: 'tabset_close_focus',
                selector: '#screenshot-tabset-all',
                checkAccessibility: true
            });
    });

    it('should match the baseline tabset screenshot when open button is focused', function () {
        return browser.setupTest('/tabset/fixtures/test.full.html')
            .focusElement('.bb-tab-button-open')
            .compareScreenshot({
                screenshotName: 'tabset_open_focus',
                selector: '#screenshot-tabset-all',
                checkAccessibility: true
            });
    });

    it('should match the baseline tabset screenshot when add button is focused', function () {
        return browser.setupTest('/tabset/fixtures/test.full.html')
            .focusElement('.bb-tab-button-add')
            .compareScreenshot({
                screenshotName: 'tabset_add_focus',
                selector: '#screenshot-tabset-all',
                checkAccessibility: true
            });
    });

    it('should match the baseline tabset screenshot on small screens', function () {
        return tabsetTest(480);
    });

    it('should match the baseline vertical tabset screenshot', function () {
        return verticalTabsetTest(1280, true);
    });

    it('should match the baseline vertical screenshot on small screens', function () {
        return verticalTabsetTest(480, true);
    });

    it('should match the baseline vertical tabset without groups screenshot', function () {
        return verticalTabsetTest(1280, true);
    });

    it('should match the baseline vertical tabset without groups screenshot on small screens', function () {
        return verticalTabsetTest(480, true);
    });
});
