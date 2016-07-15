/*global describe, it, browser, require */

describe('textstate', function () {
    'use strict';

    it('should match the baseline text state screenshot', function (done) {
        browser
            .setupTest('/textstate/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'textstate',
                selector: '#screenshot-textstate',
                checkAccessibility: true
            })
            .call(done);
    });

});
