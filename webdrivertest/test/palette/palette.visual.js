/*global describe, it, browser */

describe('palette', function () {
    'use strict';

    it('should match the baseline palette screenshot', function () {
        return browser
            .setupTest('/palette/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'palette',
                selector: '#screenshot-palette',
                checkAccessibility: true
            });
    });
});
