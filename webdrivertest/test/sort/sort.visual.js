/*global describe, it, browser */

describe('sort', function () {
    'use strict';

    it('should match the baseline screenshot of the sort button', function () {
        return browser
            .setupTest('/sort/fixtures/test.full.html')
            .moveCursorOffScreen()
            .compareScreenshot({
                screenshotName: 'sort_button',
                selector: '#screenshot-sort .bb-btn-secondary',
                checkAccessibility: true
            });
    });

    it('should match the baseline screenshot of the sort menu', function () {
        return browser
            .setupTest('/sort/fixtures/test.full.html')
            .click('#screenshot-sort .bb-btn-secondary')
            .compareScreenshot({
                screenshotName: 'sort_open',
                selector: '#screenshot-sort',
                checkAccessibility: true
            });
    });

    it('should match the baseline screenshot of the sort menu appended to the body', function () {
        return browser
            .setupTest('/sort/fixtures/test.full.html')
            .click('#screenshot-sort-append .bb-btn-secondary')
            .compareScreenshot({
                screenshotName: 'sort_open_append',
                selector: '#screenshot-sort-append',
                checkAccessibility: true
            });
    });

});
