/*global describe, it, browser */

describe('daterangepicker', function () {
    'use strict';

    it('should match the baseline screenshot of the daterangepicker', function () {
        return browser
            .setupTest('/daterangepicker/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'daterangepicker',
                selector: '#screenshot-daterangepicker',
            });

    });

    it('should match the baseline screenshot when the daterangepicker is using specific dates', function () {
        return browser
            .setupTest('/daterangepicker/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'daterangepicker_specific',
                selector: '#screenshot-daterangepicker-specific'
            });
    });
});
