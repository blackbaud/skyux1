/*global describe, it, browser, beforeEach, require */

describe('headers', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('should take header screenshots', function (done) {
        var result;

        result = browser.url('/headers/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'header',
            selector: '#screenshot-headers',
            done: done
        });
    });
});
