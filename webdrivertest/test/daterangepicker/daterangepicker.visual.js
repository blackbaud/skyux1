/*global describe, it, browser, beforeEach, require */

describe('daterangepicker', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('should match the baseline screenshot of the daterangepicker', function (done) {

        var result;

        result = browser.url('/daterangepicker/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'daterangepicker',
            selector: '#screenshot-daterangepicker',
            done: done
        });

    });

    it('should match the baseline screenshot when the daterangepicker is using specific dates', function (done) {
        var result;

        result = browser.url('/datepicker/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'daterangepicker_specific',
            selector: '#screenshot-daterangepicker-specific',
            done: done
        });
    });
});
