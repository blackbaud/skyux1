/*global describe, it, browser, beforeEach, require */

describe('type', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline type sceenshot', function (done) {
        var result;

        result = browser.url('/type/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'type',
            selector: '#screenshot-type .bb-text-block',
            done: done
        });
    });
});
