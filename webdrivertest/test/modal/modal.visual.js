
/*global describe, it, browser, beforeEach, require */

describe('modals', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('match the baseline modal screenshot', function (done) {
        var result;

        result = browser.url('/modal/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'modal',
            selector: '#screenshot-modal',
            done: done
        });
    });
});
