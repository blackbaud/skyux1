/*global describe, it, browser, require */

describe('palette', function () {
    'use strict';

    it('should match the baseline palette screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/palette/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'palette',
            selector: '#screenshot-palette',
            done: done
        });
    });
});
