
/*global describe, it, browser, beforeEach, expect, require */

describe('modals', function () {
    'use strict';

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });


    it('should take modal screenshots', function (done) {
        var screenshotName = 'modal',
            pageName = screenshotName + '_full';
        browser
            .url('/modal/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-modal'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
