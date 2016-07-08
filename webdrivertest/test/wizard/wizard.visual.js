
/*global describe, it, browser, require */

describe('wizard', function () {
    'use strict';

    it('should match the baseline wizard screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/wizard/fixtures/test.full.html')
            .click('#screenshots-wizard-open')
            .pause(1000)
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'wizard',
                selector: '.modal-content'
            })
            .call(done);
    });
});
