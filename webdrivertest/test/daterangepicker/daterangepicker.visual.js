/*global describe, it, browser, beforeEach, require */

describe('daterangepicker', function () {
    'use strict';

    it('should match the baseline screenshot of the daterangepicker', function (done) {
        browser
            .setupTest('/daterangepicker/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'daterangepicker',
                selector: '#screenshot-daterangepicker',
            })
            .call(done);

    });

    it('should match the baseline screenshot when the daterangepicker is using specific dates', function (done) {
        browser
            .setupTest('/daterangepicker/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'daterangepicker_specific',
                selector: '#screenshot-daterangepicker-specific'
            })
            .call(done);
    });
});
