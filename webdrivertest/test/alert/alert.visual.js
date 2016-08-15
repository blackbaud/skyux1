/* global describe, it, browser, require */


describe('Alert', function () {
    'use strict';

    it('should match previous alert screenshot', function (done) { 
        browser
            .setupTest('/alert/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'alert',
                selector: '#screenshot-alert',
                checkAccessibility: true
            })
            .call(done);
    });
});
