/* global describe, it, browser, require */


describe('KeyInfo', function () {
    'use strict';

    it('should match previous default keyinfo screenshot', function (done) {
        browser
            .setupTest('/keyinfo/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'keyinfo_default',
                selector: '#screenshot-key-info-default',
                checkAccessibility: true
            })
            .call(done);
    });
    it('should match previous horizontal keyinfo screenshot', function (done) {
        browser
            .setupTest('/keyinfo/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'keyinfo_horizontal',
                selector: '#screenshot-key-info-horizontal',
                checkAccessibility: true
            })
            .call(done);
    });
});