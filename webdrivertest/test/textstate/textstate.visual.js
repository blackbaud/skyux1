/*global describe, it, browser, require */

describe('textstate', function () {
    'use strict';


    it('should match the baseline text state screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/textstate/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'textstate',
                selector: '#screenshot-textstate'
            })
            .call(done);
    });

});
