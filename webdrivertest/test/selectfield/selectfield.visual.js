/*global describe, it, browser, beforeEach, require */

describe('selectfield', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline screenshot of the multiple select field', function (done) {
        var browserResult;

        browserResult = browser
            .url('/selectfield/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: options.prefix,
            screenshotName: 'selectfield_multiple',
            selector: '#screenshot-selectfield-multiple',
            done: done
        });
    });

    it('should match the baseline screenshot of the single select field', function (done) {
        var browserResult;

        browserResult = browser
            .url('/selectfield/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: options.prefix,
            screenshotName: 'selectfield_single',
            selector: '#screenshot-selectfield-single',
            done: done
        });
    });

});
