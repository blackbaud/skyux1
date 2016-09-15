/*global describe, it, browser */

describe('type', function () {
    'use strict';

    it('should match the baseline type sceenshot', function () {
        return browser
            .setupTest('/type/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'type',
                selector: '#screenshot-type .bb-text-block',
                checkAccessibility: true
            });
    });
});
