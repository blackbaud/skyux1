/* global describe, it, browser, require */


describe('actionbar', function () {
    'use strict';

    it('should match the baseline actionbar screenshot', function (done) {
        var browserResult,
            common = require('../common');

        browserResult = browser
            .url('/actionbar/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'actionbar',
            selector: '#screenshot-actionbar',
            done: done,
            screenWidth: [480, 1280]
        });
    });
});
