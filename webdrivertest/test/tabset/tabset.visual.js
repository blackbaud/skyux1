/*global describe, it, browser, beforeEach, require */

describe('tabset', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline tabset screenshot', function (done) {
        var result;

        result = browser.url('/tabset/fixtures/test.full.html')
            .moveToObject('#screenshot-tabset-open-add li:nth-child(2) a');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'tabset',
            selector: '#screenshot-tabset-all',
            done: done,
            screenWidth: [480, 1280]
        });
    });
});
