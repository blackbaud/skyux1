/* global describe, it, browser, require */


describe('Alert', function () {
    'use strict';

    it('should match previous alert screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/alert/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'alert',
            selector: '#screenshot-alert',
            done: done
        });
    });
});
