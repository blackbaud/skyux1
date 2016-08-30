/*global describe, it, browser */

describe('tabs', function () {
    'use strict';

    it('should match the baseline tab screenshot', function () {
        return browser
            .setupTest('/tabs/fixtures/test.full.html')
            .moveToObject('#screenshot-tab-2')
            .compareScreenshot({
                screenshotName: 'tabs',
                selector: '#screenshot-tabs',
                checkAccessibility: true
            });
    });
});
