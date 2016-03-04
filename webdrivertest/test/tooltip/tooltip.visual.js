/*global describe, it, browser, require */

describe('tooltip', function () {
    'use strict';

    it('should take tooltip screenshots', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/tooltip/fixtures/test.full.html')
            .click('#screenshots-tooltip-link');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'tooltip',
            selector: '.tooltip',
            done: done
        });
    });
});
