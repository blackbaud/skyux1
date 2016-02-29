/*global describe, it, browser, beforeEach, require */

describe('repeaters', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('should match the baseline repeater screenshot', function (done) {
        var result;

        result = browser.url('/repeaters/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'repeaters',
            selector: '#screenshot-repeaters-full',
            done: done
        });
    });
});
