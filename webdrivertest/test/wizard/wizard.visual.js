
/*global describe, it, browser, require */

describe('wizard', function () {
    'use strict';

    it('should match the baseline wizard screenshot', function (done) {
        browser
            .setupTest('/wizard/fixtures/test.full.html')
            .click('#screenshots-wizard-open')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'wizard',
                selector: '.modal-content'
            })
            .call(done);
    });
});
