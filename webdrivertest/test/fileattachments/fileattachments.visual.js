/*global describe, it, browser, require */

describe('file attachments', function () {
    'use strict';

    it('should match the baseline fileattachment screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/fileattachments/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'fileattachments',
            selector: '#screenshot-fileattachments',
            done: done
        });

    });
});
