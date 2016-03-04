/*global describe, it, browser, require */

describe('navbar', function () {
    'use strict';

    it('should match the baseline navbar screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/navbar/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'navbar',
            selector: '#screenshot-navbar',
            done: done
        });
    });
});
