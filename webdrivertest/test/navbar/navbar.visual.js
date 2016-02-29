/*global describe, it, browser, beforeEach, require */

describe('navbar', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('should match the baseline navbar screenshot', function (done) {
        var result;

        result = browser.url('/navbar/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'navbar',
            selector: '#screenshot-navbar',
            done: done
        });
    });
});
