/*global describe, it, browser, require */

describe('type', function () {
    'use strict';


    it('should match the baseline type sceenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/type/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'type',
                selector: '#screenshot-type .bb-text-block'
            })
            .call(done);
    });
});
