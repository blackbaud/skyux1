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
});
