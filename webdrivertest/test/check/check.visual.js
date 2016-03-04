/*global describe, it, browser, require */

describe('check', function () {
    'use strict';

    it('should match the baseline check screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/check/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'check',
            selector: '#screenshot-check',
            done: done
        });
    });
});
