/*global describe, it, browser, require */

describe('palette', function () {
    'use strict';

    it('should match the baseline palette screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/palette/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'palette',
                selector: '#screenshot-palette',
                checkAccessibility: true
            })
            .call(done);
    });
});
