/*global describe, it, browser, require */

describe('type', function () {
    'use strict';

    it('should match the baseline type sceenshot', function (done) {
        browser
            .setupTest('/type/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'type',
                selector: '#screenshot-type .bb-text-block'
            })
            .call(done);
    });
});
