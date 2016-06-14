/* global describe, it, browser, require */


describe('KeyInfo', function () {
    'use strict';

    it('should match previous default keyinfo screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/keyinfo/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'keyinfo_default',
            selector: '#screenshot-key-info-default',
            checkAccessibility: true,
            done: done
        });
    });
    it('should match previous horizontal keyinfo screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/keyinfo/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'keyinfo_horizontal',
            selector: '#screenshot-key-info-horizontal',
            checkAccessibility: true,
            done: done
        });
    });
});