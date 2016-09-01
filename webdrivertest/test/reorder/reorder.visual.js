
/*global describe, it, browser */

describe('Reorder', function () {
    'use strict';

    it('should match previous reorder screenshot in the default state', function () {
        return browser
            .setupTest('/reorder/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'reorder_default',
                selector: '#screenshot-reorder',
                checkAccessibility: true
            });
    });

    it('should match previous reorder screenshot when user is sorting', function () {
        return browser
            .setupTest('/reorder/fixtures/test.full.html')
            .moveToObject('#screenshot-reorder .bb-reorder-list-row:first-child .bb-reorder-list-col-icon')
            .buttonDown()
            .moveToObject('#screenshot-reorder .bb-reorder-list-row:nth-child(2)', 0, 0)
            .compareScreenshot({
                screenshotName: 'reorder_sorting',
                selector: '#screenshot-reorder',
                checkAccessibility: true
            })
            .buttonUp();
    });
});
