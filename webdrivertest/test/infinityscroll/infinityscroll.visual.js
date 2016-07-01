/*global describe, it, browser,require */

describe('infinity scroll', function () {
    'use strict';

    it('match the baseline infinity scroll screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/infinityscroll/fixtures/test.full.html')
                        .click('.bb-btn-secondary');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'infinityscroll',
            selector: '#screenshot-infinityscroll',
            done: done
        });
    });
});