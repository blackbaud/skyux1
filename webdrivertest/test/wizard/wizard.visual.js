
/*global describe, it, browser, beforeEach, require */

describe('wizard', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline wizard screenshot', function (done) {
        var result;

        result = browser.url('/wizard/fixtures/test.full.html')
            .click('#screenshots-wizard-open');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'wizard',
            selector: '.modal-content',
            done: done
        });
    });
});
