/*global describe, it, browser, beforeEach, expect, require */

describe('labels', function () {
    'use strict';

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });


    it('should take label screenshots', function (done) {
        var screenshotName = 'labels',
            pageName = screenshotName + '_full';
        browser
            .url('/labels/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-labels'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
