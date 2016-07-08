/*global describe, it, browser, beforeEach, require */

describe('daterangepicker', function () {
    'use strict';


    it('should match the baseline screenshot of the daterangepicker', function (done) {
        var common = require('../common');

        browser
            .setupTest('/daterangepicker/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'daterangepicker',
                selector: '#screenshot-daterangepicker',
            })
            .call(done);

    });

    it('should match the baseline screenshot when the daterangepicker is using specific dates', function (done) {
        var common = require('../common');

        browser
            .setupTest('/daterangepicker/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'daterangepicker_specific',
                selector: '#screenshot-daterangepicker-specific'
            })
            .call(done);
    });
});
