/*global describe, it, browser, beforeEach, require */

describe('contextmenu', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    describe('context menu', function () {
        it('should match the baseline screenshot when closed', function (done) {
            var result;

            result = browser.url('/contextmenu/fixtures/test.full.html');

            common.compareScreenshot({
                browserResult: result,
                prefix: options.prefix,
                screenshotName: 'contextmenu_closed',
                selector: '#screenshot-contextmenu',
                done: done
            });

        });

        it('should match the baseline screenshot when open', function (done) {
            var result;

            result = browser.url('/contextmenu/fixtures/test.full.html')
                    .click('#screenshot-contextmenu button.bb-context-menu-btn');

            common.compareScreenshot({
                browserResult: result,
                prefix: options.prefix,
                screenshotName: 'contextmenu_open',
                selector: '#screenshot-contextmenu',
                done: done
            });

        });

    });

    describe('submenu', function () {
        it('should match the baseline screenshot when a collapsed submenu exists', function (done) {

            var result;

            result = browser.url('/contextmenu/fixtures/test.full.html')
                    .click('#screenshot-submenu button.bb-context-menu-btn');

            common.compareScreenshot({
                browserResult: result,
                prefix: options.prefix,
                screenshotName: 'submenumenu_collapsed',
                selector: '#screenshot-submenu',
                done: done
            });

        });

        it('should match the baseline screenshot when an expanded submenu exists', function (done) {
            var result;

            result = browser.url('/contextmenu/fixtures/test.full.html')
                    .click('#screenshot-submenu button.bb-context-menu-btn')
                    .click('#screenshot-submenu .bb-submenu .panel-title .accordion-toggle > span > div');

            common.compareScreenshot({
                browserResult: result,
                prefix: options.prefix,
                screenshotName: 'submenumenu_expanded',
                selector: '#screenshot-submenu',
                done: done
            });
        });

    });

});
