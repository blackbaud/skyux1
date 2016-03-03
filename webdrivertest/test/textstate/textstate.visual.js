/*global describe, it, browser, beforeAll, require */

describe('textstate', function () {
    'use strict';

    var options = {},
        common;

    beforeAll(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline text state screenshot', function (done) {
        var result;

        result = browser.url('/textstate/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'textstate',
            selector: '#screenshot-textstate',
            done: done
        });
    });

});
