/*global describe, it, browser, beforeEach, require */

describe('daterangepicker', function () {
    'use strict';


    it('should match the baseline screenshot of the daterangepicker', function (done) {

        var result,
            common = require('../common');

        result = browser.url('/daterangepicker/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'daterangepicker',
            selector: '#screenshot-daterangepicker',
            done: done
        });

    });

    it('should match the baseline screenshot when the daterangepicker is using specific dates', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/daterangepicker/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'daterangepicker_specific',
            selector: '#screenshot-daterangepicker-specific',
            done: done
        });
    });
});
