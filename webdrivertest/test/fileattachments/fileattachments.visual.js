/*global describe, it, browser, beforeEach, require */

describe('file attachments', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('should match the baseline screenshot', function (done) {
        var result;

        result = browser.url('/fileattachments/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'fileattachments',
            selector: '#screenshot-fileattachments',
            done: done
        });

    });
});
