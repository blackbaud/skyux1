
/*global describe, it, browser, beforeEach, expect, require */

describe('wait', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline wait screenshot', function (done) {
        var result;

        result = browser.url('/wait/fixtures/test.full.html')
            .pause(1000);

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'wait',
            selector: '#screenshot-wait',
            done: done
        });
    });
});
