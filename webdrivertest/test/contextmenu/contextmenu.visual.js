/*global describe, it, browser, require */

describe('contextmenu', function () {
    'use strict';

    describe('context menu', function () {
        it('should match the baseline context menu screenshot when closed', function (done) {
            var result,
                common = require('../common');

            result = browser.url('/contextmenu/fixtures/test.full.html');

            common.compareScreenshot({
                browserResult: result,
                prefix: common.getPrefix(browser),
                screenshotName: 'contextmenu_closed',
                selector: '#screenshot-contextmenu',
                done: done
            });

        });

        it('should match the baseline context menu sscreenshot when open', function (done) {
            var result,
                common = require('../common');

            result = browser.url('/contextmenu/fixtures/test.full.html')
                    .click('#screenshot-contextmenu button.bb-context-menu-btn');

            common.compareScreenshot({
                browserResult: result,
                prefix: common.getPrefix(browser),
                screenshotName: 'contextmenu_open',
                selector: '#screenshot-contextmenu',
                done: done
            });

        });

    });

    describe('submenu', function () {
        it('should match the baseline screenshot when a collapsed submenu exists', function (done) {

            var result,
                common = require('../common');

            result = browser.url('/contextmenu/fixtures/test.full.html')
                    .click('#screenshot-submenu button.bb-context-menu-btn');

            common.compareScreenshot({
                browserResult: result,
                prefix: common.getPrefix(browser),
                screenshotName: 'submenumenu_collapsed',
                selector: '#screenshot-submenu',
                done: done
            });

        });

        it('should match the baseline screenshot when an expanded submenu exists', function (done) {
            var result,
                common = require('../common');

            result = browser.url('/contextmenu/fixtures/test.full.html')
                    .click('#screenshot-submenu button.bb-context-menu-btn')
                    .click('#screenshot-submenu .bb-submenu .panel-title .accordion-toggle > span > div');

            common.compareScreenshot({
                browserResult: result,
                prefix: common.getPrefix(browser),
                screenshotName: 'submenumenu_expanded',
                selector: '#screenshot-submenu',
                done: done
            });
        });

    });

});
