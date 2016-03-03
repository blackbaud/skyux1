
/*global describe, it, browser, beforeEach, require */

describe('highlight', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('match the baseline highlight screenshot', function (done) {
        var result;

        result = browser.url('/highlight/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'highlight',
            selector: '#screenshot-highlight',
            done: done
        });
    });
});
