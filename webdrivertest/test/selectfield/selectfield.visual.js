/*global describe, it, browser */

describe('selectfield', function () {
    'use strict';

    it('should match the baseline screenshot of the multiple select field', function () {
        return browser
            .setupTest('/selectfield/fixtures/test.full.html')
            .moveCursorOffScreen()
            .compareScreenshot({
                screenshotName: 'selectfield_multiple',
                selector: '#screenshot-selectfield-multiple',
                checkAccessibility: true
            });
    });

    it('should match the baseline screenshot of the single select field', function () {
        return browser
            .setupTest('/selectfield/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'selectfield_single',
                selector: '#screenshot-selectfield-single',
                checkAccessibility: true
            });
    });

    it('should match the baseline screenshot of the single select field with search icon', function () {
        return browser
            .setupTest('/selectfield/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'selectfield_single_search',
                selector: '#screenshot-selectfield-single-search',
                checkAccessibility: true
            });
    });

});
