/*global describe, it, browser, require */

describe('check', function () {
    'use strict';

    it('should match the baseline check screenshot', function (done) {
        browser
            .setupTest('/check/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'check',
                selector: '#screenshot-check',
                checkAccessibility: true
            })
            .call(done);
    });
});
