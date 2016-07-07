/*global describe, it, browser, require */

describe('badges', function () {
    'use strict';

    it('should match the baseline badges screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/badges/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'badges',
                selector: '#screenshot-badges',
                checkAccessibility: true
            })
            .call(done);

    });
});
