/*global describe, it, browser */

describe('labels', function () {
    'use strict';

    it('match the baseline label screenshot', function () {
        return browser
            .setupTest('/labels/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'labels',
                selector: '#screenshot-labels',
                checkAccessibility: true
            });
    });
});
