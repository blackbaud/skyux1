/*global describe, it, browser, require */

describe('labels', function () {
    'use strict';

    it('match the baseline label screenshot', function (done) {
        browser
            .setupTest('/labels/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'labels',
                selector: '#screenshot-labels'
            })
            .call(done);
    });
});
