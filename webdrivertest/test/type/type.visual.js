/*global describe, it, browser, require */

describe('type', function () {
    'use strict';


    it('should match the baseline type sceenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/type/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'type',
            selector: '#screenshot-type .bb-text-block',
            done: done
        });
    });
});
