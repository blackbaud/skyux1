/*global describe, it, browser, require */

describe('file attachments', function () {
    'use strict';

    it('should match the baseline fileattachment screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/fileattachments/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'fileattachments',
                selector: '#screenshot-fileattachments'
            })
            .call(done);

    });
});
