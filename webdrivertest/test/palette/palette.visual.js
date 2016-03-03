/*global describe, it, browser, beforeEach, require */

describe('palette', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('should match the baseline palette screenshot', function (done) {
        var result;

        result = browser.url('/palette/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'palette',
            selector: '#screenshot-palette',
            done: done
        });
    });
});
