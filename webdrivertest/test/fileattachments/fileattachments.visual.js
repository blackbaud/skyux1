/*global describe, it, browser, beforeEach, expect, require */

describe('file attachments', function () {
    'use strict';

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });


    it('should take fileattachment screenshots', function (done) {
        var screenshotName = 'fileattachments',
            pageName = screenshotName + '_full';
        browser
            .url('/fileattachments/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-fileattachments'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
