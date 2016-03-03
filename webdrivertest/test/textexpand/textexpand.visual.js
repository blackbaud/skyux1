
/*global describe, it, browser, beforeEach, require */

describe('textexpand', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline screenshot when text expand is collapsed', function (done) {
        var result;

        result = browser.url('/textexpand/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'textexpand_collapsed',
            selector: '#screenshot-text-expand-all',
            done: done
        });
    });

    it('should match the baseline screenshot when text expand is expanded', function (done) {
        var result;

        result = browser.url('/textexpand/fixtures/test.full.html')
            .click('#screenshot-text-expand .bb-text-expand-see-more')
            .click('#screenshot-text-expand-line-break .bb-text-expand-see-more')
            .click('#screenshot-text-expand-repeater .bb-text-expand-see-more');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'textexpand_expanded',
            selector: '#screenshot-text-expand-all',
            done: done
        });
    });
});
