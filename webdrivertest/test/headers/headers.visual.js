/*global describe, it, browser */

describe('headers', function () {
    'use strict';

    it('match the baseline header screenshot', function () {
        return browser
            .setupTest('/headers/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'header',
                selector: '#screenshot-headers',
                checkAccessibility: true
            });
    });
});
