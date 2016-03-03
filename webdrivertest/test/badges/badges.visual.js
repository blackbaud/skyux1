/*global describe, it, browser, require */

describe('badges', function () {
    'use strict';

    it('should match the baseline badges screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/badges/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'badges',
            selector: '#screenshot-badges',
            done: done
        });

    });
});
