/*global describe, it, browser,require */

describe('infinite scroll', function () {
    'use strict';

    it('match the baseline infinite scroll screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/infinitescroll/fixtures/test.full.html')
                        .click('.bb-btn-secondary');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'infinitescroll',
            selector: '#screenshot-infinitescroll',
            done: done
        });
    });
});