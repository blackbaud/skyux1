/* global describe, it, browser, require */


describe('Alert', function () {
    'use strict';

    it('should match previous alert screenshot', function (done) { 
        var common = require('../common');

        browser
            .setupTest('/alert/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'alert',
                selector: '#screenshot-alert',
                checkAccessibility: true
            })
            .call(done);
    });
});
