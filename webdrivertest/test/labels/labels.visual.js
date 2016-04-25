/*global describe, it, browser, require */

describe('labels', function () {
    'use strict';

    it('match the baseline label screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/labels/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'labels',
            selector: '#screenshot-labels',
            screenWidth: [1280, 480],
            done: done
        });
    });
});
