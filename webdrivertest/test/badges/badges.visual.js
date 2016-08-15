/*global describe, it, browser, require */

describe('badges', function () {
    'use strict';

    it('should match the baseline badges screenshot', function (done) {
        browser
            .setupTest('/badges/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'badges',
                selector: '#screenshot-badges',
                checkAccessibility: true
            })
            .call(done);
    });
});
