/*global describe, it, browser */

describe('pagination', function () {
    'use strict';

    it('match the baseline pagination screenshot', function () {
        return browser
            .setupTest('/pagination/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'pagination',
                selector: '#screenshot-pagination'
            });

    });

    it('should match the baseline pagination screenshot when clicked', function () {
        return browser
            .setupTest('/pagination/fixtures/test.full.html')
            .click('#screenshot-pagination li:nth-child(3) a')
            .compareScreenshot({
                screenshotName: 'pagination_click',
                selector: '#screenshot-pagination'
            });

    });
});
