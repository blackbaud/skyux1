/* global describe, it, browser */


describe('KeyInfo', function () {
    'use strict';

    it('should match previous default keyinfo screenshot', function () {
        return browser
            .setupTest('/keyinfo/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'keyinfo_default',
                selector: '#screenshot-key-info-default',
                checkAccessibility: true
            });
    });
    it('should match previous horizontal keyinfo screenshot', function () {
        return browser
            .setupTest('/keyinfo/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'keyinfo_horizontal',
                selector: '#screenshot-key-info-horizontal',
                checkAccessibility: true
            });
    });
});