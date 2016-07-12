/*global describe, it, browser, require */

describe('file attachments', function () {
    'use strict';

    it('should match the baseline fileattachment screenshot', function (done) {
        browser
            .setupTest('/fileattachments/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'fileattachments',
                selector: '#screenshot-fileattachments'
            })
            .call(done);

    });
});
