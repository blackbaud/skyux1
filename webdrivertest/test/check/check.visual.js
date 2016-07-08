/*global describe, it, browser, require */

describe('check', function () {
    'use strict';

    it('should match the baseline check screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/check/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'check',
                selector: '#screenshot-check',
                checkAccessibility: true
            })
            .call(done);
    });
});
