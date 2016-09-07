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

    it('should match the baseline tabset screenshot', function () {
        return tabsetTest(1280);
    });

    it('should match the baseline tabset screenshot on small screens', function () {
        return tabsetTest(480);
    });
});
