/*global describe, it, browser */

describe('definition list', function () {
    'use strict';

    it('should match the default definition list', function (done) {
        browser
            .setupTest('/definitionlist/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'definitionlist_default',
                selector: '#screenshot-def-default',
                checkAccessibility: true
            })
            .call(done);

    });

    it('should match the default definition list', function (done) {
        browser
            .setupTest('/definitionlist/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'definitionlist_custom',
                selector: '#screenshot-def-custom',
                checkAccessibility: true
            })
            .call(done);

    });
});