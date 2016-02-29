/*global describe, it, browser, beforeEach, require */

describe('check', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline check screenshot', function (done) {
        var result;

        result = browser.url('/check/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'check',
            selector: '#screenshot-check',
            done: done
        });
    });
});
