/*global describe, it, browser, require */

describe('headers', function () {
    'use strict';

    it('match the baseline header screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/headers/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'header',
            selector: '#screenshot-headers',
            done: done
        });
    });
});
