/*global describe, it, browser */

describe('infinite scroll', function () {
    'use strict';

    it('match the baseline infinite scroll screenshot', function (done) {

        browser
            .setupTest('/infinitescroll/fixtures/test.full.html')
            .click('.bb-btn-secondary')
            .compareScreenshot({
                screenshotName: 'infinitescroll',
                selector: '#screenshot-infinitescroll'
            })
            .call(done);
    });
});