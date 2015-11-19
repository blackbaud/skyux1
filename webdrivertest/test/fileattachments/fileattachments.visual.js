/*global describe, it, browser, beforeEach, expect, require */

describe('file attachments', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });


    it('should take fileattachment screenshots', function (done) {
        var screenshotName = 'fileattachments',
            pageName = options.prefix + screenshotName + '_full';
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
