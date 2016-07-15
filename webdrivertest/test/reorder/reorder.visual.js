
/*global describe, it, browser,require, expect */

describe('Reorder', function () {
    'use strict';

    it('should match previous reorder screenshot in the default state', function (done) {
        browser
            .setupTest('/reorder/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'reorder_default',
                selector: '#screenshot-reorder',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match previous reorder screenshot when user is sorting', function (done) {
        browser
            .setupTest('/reorder/fixtures/test.full.html')
            .moveToObject('#screenshot-reorder .bb-reorder-list-row:first-child .bb-reorder-list-col-icon')
            .buttonDown()
            .moveToObject('#screenshot-reorder .bb-reorder-list-row:nth-child(2)', 0, -35)
            .compareScreenshot({
                screenshotName: 'reorder_sorting',
                selector: '#screenshot-reorder',
                checkAccessibility: true
            })
            .buttonUp()
            .call(done);
    });
});
