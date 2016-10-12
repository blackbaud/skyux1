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

    it(
        'should match the baseline check screenshot when a checkbox is in an inline form', 
        function () {
            return browser
                .setupTest('/check/fixtures/test.full.html')
                .compareScreenshot({
                    screenshotName: 'check_inline',
                    selector: '#screenshot-check-inline',
                    checkAccessibility: true
                });
        }
    );

    it(
        'should match the baseline check screenshot when a checkbox is in an inline form ' +
        'at a small screen size', 
        function () {
            return browser
                .setupTest('/check/fixtures/test.full.html', 480)
                .compareScreenshot({
                    screenshotName: 'check_inline_small',
                    selector: '#screenshot-check-inline',
                    checkAccessibility: true
                });
        }
    );
});
