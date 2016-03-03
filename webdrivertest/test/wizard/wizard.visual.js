
/*global describe, it, browser, require */

describe('wizard', function () {
    'use strict';

    it('should match the baseline wizard screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/wizard/fixtures/test.full.html')
            .click('#screenshots-wizard-open');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'wizard',
            selector: '.modal-content',
            done: done
        });
    });
});
