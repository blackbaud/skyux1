/*global describe, it, browser */

describe('textstate', function () {
    'use strict';

    it('should match the baseline text state screenshot', function () {
        return browser
            .setupTest('/textstate/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'textstate',
                selector: '#screenshot-textstate',
                checkAccessibility: true
            });
    });

});
