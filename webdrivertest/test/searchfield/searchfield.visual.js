/*global describe, it, browser, beforeEach, require */

describe('searchfield', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('match the baseline searchfield screenshot', function (done) {

        var result;

        result = browser.url('/searchfield/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'searchfields',
            selector: '#screenshot-searchfield-full',
            done: done
        });
    });

    it('should match the baseline of a single select searchfield when active', function (done) {
        var result;

        result = browser.url('/searchfield/fixtures/test.full.html')
            .click('#screenshot-searchfield-single .ui-select-toggle')
            .waitForVisible('#screenshot-searchfield-single');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'searchfield_single_active',
            selector: '#screenshot-searchfield-single',
            done: done
        });
    });

    it('should match the baseline of a single select searchfield dropdown', function (done) {

        var result;

        result = browser.url('/searchfield/fixtures/test.full.html')
            .click('#screenshot-searchfield-single .ui-select-toggle')
            .moveToObject('#screenshot-searchfield-single-choices .ui-select-choices-row-inner');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'searchfield_single_dropdown',
            selector: '#screenshot-searchfield-single-choices',
            done: done
        });

    });

    it('should match the baseline of a multi select searchfield when active', function (done) {
        var result;

        result = browser.url('/searchfield/fixtures/test.full.html')
            .click('#screenshot-searchfield-multiple .ui-select-search');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'searchfield_multiple_active',
            selector: '#screenshot-searchfield-multiple',
            done: done
        });
    });

    it('should match the baseline of a multi select searchfield dropdown', function (done) {
        var result;

        result = browser.url('/searchfield/fixtures/test.full.html')
            .click('#screenshot-searchfield-multiple .ui-select-search')
            .moveToObject('#screenshot-searchfield-multiple-choices .ui-select-choices-row-inner');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'searchfield_multiple_dropdown',
            selector: '#screenshot-searchfield-multiple-choices',
            done: done
        });
    });

    it('should match the baseline of the multi select searchfield when hovering over the close button', function (done) {
        var result;

        result = browser.url('/searchfield/fixtures/test.full.html')
            .moveToObject('.ui-select-match-item .ui-select-match-close');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'searchfield_multiple_close_hover',
            selector: '.ui-select-match-item',
            done: done
        });

    });

});
