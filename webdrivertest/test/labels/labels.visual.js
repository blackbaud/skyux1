/*global describe, it, browser, beforeEach, require */

describe('labels', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('match the baseline label screenshot', function (done) {
        var result;

        result = browser.url('/labels/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'labels',
            selector: '#screenshot-labels',
            done: done
        });
    });
});
