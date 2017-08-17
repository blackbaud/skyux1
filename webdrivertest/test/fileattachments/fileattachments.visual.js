/*global describe, it, browser */

describe('file attachments', function () {
    'use strict';

    it('should match the baseline fileattachment screenshot', function () {
        return browser
            .setupTest('/fileattachments/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'fileattachments',
                selector: '#screenshot-fileattachments',
                checkAccessibility: true
            });

    });

    it('should match the single fileattachment screenshot', function () {
        return browser
            .setupTest('/fileattachments/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'fileattachments_single',
                selector: '#screenshot-file-single',
                checkAccessibility: true
            });

    });

    it('should match the single fileattachment screenshot with no item', function () {
        return browser
            .setupTest('/fileattachments/fixtures/test.full.html')
            .click('#screenshot-file-single .bb-file-single-remove')
            .compareScreenshot({
                screenshotName: 'fileattachments_single_noitem',
                selector: '#screenshot-file-single',
                checkAccessibility: true
            });

    });

    it('should match the single fileattachment screenshot with long name', function () {
        return browser
            .setupTest('/fileattachments/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'fileattachments_single_longname',
                selector: '#screenshot-file-single-long-name',
                checkAccessibility: true
            });

    });
});
