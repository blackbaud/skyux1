/* global describe, it, browser, require */


describe('Alert', function () {
    'use strict';

    it('should match previous alert screenshot', function () { 
        return browser
            .setupTest('/alert/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'alert',
                selector: '#screenshot-alert',
                checkAccessibility: true
            });
    });
});
