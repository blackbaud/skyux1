/*global describe, it, browser,require */

describe('tabset', function () {
    'use strict';

    it('should match the baseline tabset screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/tabset/fixtures/test.full.html')
            .moveToObject('#screenshot-tabset-open-add li:nth-child(2) a');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'tabset',
            selector: '#screenshot-tabset-all',
            done: done,
            screenWidth: [480, 1280]
        });
    });
});
