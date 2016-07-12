/*global describe, it, browser, require */

describe('selectfield', function () {
    'use strict';

    it('should match the baseline screenshot of the multiple select field', function (done) {
        browser
            .setupTest('/selectfield/fixtures/test.full.html')
            .moveCursorOffScreen()
            .compareScreenshot({
                screenshotName: 'selectfield_multiple',
                selector: '#screenshot-selectfield-multiple'
            })
            .call(done);
    });

    it('should match the baseline screenshot of the single select field', function (done) {
        browser
            .setupTest('/selectfield/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'selectfield_single',
                selector: '#screenshot-selectfield-single'
            })
            .call(done);
    });

});
