/*global describe, it, browser, require */

describe('tabs', function () {
    'use strict';

    it('should match the baseline tab screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/tabs/fixtures/test.full.html')
            .moveToObject('#screenshot-tab-2');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'tabs',
            selector: '#screenshot-tabs',
            done: done
        });
    });
});
