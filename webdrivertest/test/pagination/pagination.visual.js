/*global describe, it, browser, beforeEach, require */

describe('pagination', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('match the baseline screenshot', function (done) {
        var result;

        result = browser.url('/pagination/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'pagination',
            selector: '#screenshot-pagination',
            done: done
        });

    });

    it('should match the baseline screenshot when clicked', function (done) {
        var result;

        result = browser.url('/pagination/fixtures/test.full.html')
            .click('#screenshot-pagination li:nth-child(3) a');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'pagination_click',
            selector: '#screenshot-pagination',
            done: done
        });

    });
});
