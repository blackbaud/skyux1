
/*global describe, it, browser, beforeEach, expect, require */

describe('wizard', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });

    it('should take the wizard screenshot', function (done) {
        var screenshotName = 'wizard',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/wizard/fixtures/test.full.html')
            .click('#screenshots-wizard-open')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '.modal-content'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
