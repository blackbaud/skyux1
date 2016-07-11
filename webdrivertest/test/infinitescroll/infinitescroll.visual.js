/*global describe, it, browser,require */

describe('infinite scroll', function () {
    'use strict';

    it('match the baseline infinite scroll screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/infinitescroll/fixtures/test.full.html')
            .click('.bb-btn-secondary')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'infinitescroll',
                selector: '#screenshot-infinitescroll'
            })
            .call(done);
    });
});