/*global describe, it, browser, require */

describe('repeaters', function () {
    'use strict';

    it('should match the baseline repeater screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/repeaters/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'repeaters',
            selector: '#screenshot-repeaters-full',
            done: done
        });
    });
});
