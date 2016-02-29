/*global describe, it, browser, beforeAll, require */

describe('tooltip', function () {
    'use strict';

    var options = {},
        common;

    beforeAll(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should take tooltip screenshots', function (done) {
        var result;

        result = browser.url('/tooltip/fixtures/test.full.html')
            .click('#screenshots-tooltip-link');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'tooltip',
            selector: '.tooltip',
            done: done
        });
    });
});
