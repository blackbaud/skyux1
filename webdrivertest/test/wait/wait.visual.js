
/*global describe, it, browser, require */

describe('wait', function () {
    'use strict';

    it('should match the baseline wait screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/wait/fixtures/test.full.html')
            .pause(1000)
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'wait',
                selector: '#screenshot-wait'
            })
            .call(done);
    });
});
