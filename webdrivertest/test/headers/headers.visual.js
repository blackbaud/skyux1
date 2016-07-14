/*global describe, it, browser, require */

describe('headers', function () {
    'use strict';

    it('match the baseline header screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/headers/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'header',
                selector: '#screenshot-headers',
                checkAccessibility: true
            })
            .call(done);
    });
});
