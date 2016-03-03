/*global describe, it, browser, require */

describe('textstate', function () {
    'use strict';


    it('should match the baseline text state screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/textstate/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'textstate',
            selector: '#screenshot-textstate',
            done: done
        });
    });

});
