/* global describe, it, browser, beforeEach, require */


describe('Alert', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match previous screenshot', function (done) {
        var result;

        result = browser.url('/alert/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'alert',
            selector: '#screenshot-alert',
            done: done
        });
    });
});
