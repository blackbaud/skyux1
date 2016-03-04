/*global describe, it, browser, require */

describe('modals', function () {
    'use strict';

    it('match the baseline modal screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/modal/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'modal',
            selector: '#screenshot-modal',
            done: done
        });
    });
});
