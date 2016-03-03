/*global describe, it, browser, beforeAll, expect, require */

describe('textstate', function () {
    'use strict';

    var options = {};

    beforeAll(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });

    it('should take textstate screenshots', function (done) {
        var screenshotName = 'textstate',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/textstate/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-textstate'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

});
