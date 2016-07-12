/*global describe, it, browser, require */

describe('palette', function () {
    'use strict';

    it('should match the baseline palette screenshot', function (done) {
        browser
            .setupTest('/palette/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'palette',
                selector: '#screenshot-palette'
            })
            .call(done);
    });
});
