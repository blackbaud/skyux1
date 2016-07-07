/*global describe, it, browser, require */

describe('tabs', function () {
    'use strict';

    it('should match the baseline tab screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/tabs/fixtures/test.full.html')
            .moveToObject('#screenshot-tab-2')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'tabs',
                selector: '#screenshot-tabs'
            })
            .call(done);
    });
});
