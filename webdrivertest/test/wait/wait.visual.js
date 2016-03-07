
/*global describe, it, browser, require */

describe('wait', function () {
    'use strict';

    it('should match the baseline wait screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/wait/fixtures/test.full.html')
            .pause(1000);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'wait',
            selector: '#screenshot-wait',
            done: done
        });
    });
});
