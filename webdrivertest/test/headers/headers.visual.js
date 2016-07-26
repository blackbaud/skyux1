/*global describe, it, browser, require */

describe('headers', function () {
    'use strict';

    it('match the baseline header screenshot', function (done) {
        browser
            .setupTest('/headers/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'header',
                selector: '#screenshot-headers',
                checkAccessibility: true
            })
            .call(done);
    });
});
