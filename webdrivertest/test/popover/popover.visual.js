/*global describe, it, browser, beforeEach, require */

describe('popover', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline popover screenshot when it has a title', function (done) {
        var result;

        result = browser.url('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-title a');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'popover_title',
            selector: '#screenshot-popover-title',
            done: done
        });
    });

    it('should match the baseline popover screenshot when it does not have a title', function (done) {
        var result;

        result = browser.url('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-no-title a');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'popover_no_title',
            selector: '#screenshot-popover-no-title',
            done: done
        });

    });

    it('should match the baseline popover screenshot with position top', function (done) {
        var result;

        result = browser.url('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-top button');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'popover_top',
            selector: '#screenshot-popover-top',
            done: done
        });
    });

    it('should match the baseline popover screenshot with position bottom', function (done) {
        var result;

        result = browser.url('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-bottom button');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'popover_bottom',
            selector: '#screenshot-popover-bottom',
            done: done
        });

    });

    it('should match the baseline popover screenshot with position left', function (done) {
        var result;

        result = browser.url('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-left button');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'popover_left',
            selector: '#screenshot-popover-left',
            done: done
        });

    });

    it('should match the baseline popover screenshot with position right', function (done) {
        var result;

        result = browser.url('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-right button');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'popover_right',
            selector: '#screenshot-popover-right',
            done: done
        });
    });


});
