/*global describe, it, browser, beforeEach, require */

describe('tabs', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('should match the baseline tab screenshot', function (done) {
        var result;

        result = browser.url('/tabs/fixtures/test.full.html')
            .moveToObject('#screenshot-tab-2');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'tabs',
            selector: '#screenshot-tabs',
            done: done
        });
    });
});
