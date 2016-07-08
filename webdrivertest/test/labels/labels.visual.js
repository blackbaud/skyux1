/*global describe, it, browser, require */

describe('labels', function () {
    'use strict';

    it('match the baseline label screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/labels/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'labels',
                selector: '#screenshot-labels'
            })
            .call(done);
    });
});
