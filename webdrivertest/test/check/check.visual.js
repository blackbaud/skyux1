/*global describe, it, browser */

describe('check', function () {
    'use strict';

    it('should match the baseline check screenshot', function () {
        return browser
            .setupTest('/check/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'check',
                selector: '#screenshot-check',
                checkAccessibility: true
            });
    });
});
