/*global describe, it, browser */

describe('textexpand', function () {
    'use strict';

    it('should match the baseline screenshot when text expand is collapsed', function () {
        return browser
            .setupTest('/textexpand/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'textexpand_collapsed',
                selector: '#screenshot-text-expand-all'
            });
    });

    it('should match the baseline screenshot when text expand is expanded', function () {
        return browser
            .setupTest('/textexpand/fixtures/test.full.html')
            .click('#screenshot-text-expand .bb-text-expand-see-more')
            .click('#screenshot-text-expand-line-break .bb-text-expand-see-more')
            .click('#screenshot-text-expand-repeater .bb-text-expand-see-more')
            .click('#screenshot-text-expand-no-word-break .bb-text-expand-see-more')
            .compareScreenshot({
                screenshotName: 'textexpand_expanded',
                selector: '#screenshot-text-expand-all'
            });
    });
});
