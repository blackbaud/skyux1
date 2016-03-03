/*global describe, it, browser, beforeEach, require */

describe('badges', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('should match the baseline badges screenshot', function (done) {
        var result;

        result = browser.url('/badges/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'badges',
            selector: '#screenshot-badges',
            done: done
        });

    });
});
