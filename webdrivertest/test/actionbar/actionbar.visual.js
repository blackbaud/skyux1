/* global describe, it, browser, beforeEach, require */


describe('actionbar', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline actionbar screenshot', function (done) {
        var browserResult;

        browserResult = browser
            .url('/actionbar/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: options.prefix,
            screenshotName: 'actionbar',
            selector: '#screenshot-actionbar',
            done: done,
            screenWidth: [480, 1280]
        });
    });
});
