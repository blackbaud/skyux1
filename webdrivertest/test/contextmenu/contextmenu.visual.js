/*global describe, it, browser, require */

describe('contextmenu', function () {
    'use strict';

    describe('context menu', function () {
        it('should match the baseline context menu screenshot when closed', function (done) {
            var common = require('../common');

            browser
                .setupTest('/contextmenu/fixtures/test.full.html')
                .compareScreenshot({
                    prefix: common.getPrefix(browser),
                    screenshotName: 'contextmenu_closed',
                    selector: '#screenshot-contextmenu'
                })
                .call(done);

        });

        it('should match the baseline context menu screenshot when open', function (done) {
            var common = require('../common');

            browser
                .setupTest('/contextmenu/fixtures/test.full.html')
                .click('#screenshot-contextmenu button.bb-context-menu-btn')
                .compareScreenshot({
                    prefix: common.getPrefix(browser),
                    screenshotName: 'contextmenu_open',
                    selector: '#screenshot-contextmenu'
                })
                .call(done);

        });

    });

    describe('submenu', function () {
        it('should match the baseline screenshot when a collapsed submenu exists', function (done) {
            var common = require('../common');

            browser
                .setupTest('/contextmenu/fixtures/test.full.html')
                .click('#screenshot-submenu button.bb-context-menu-btn')
                .compareScreenshot({
                    prefix: common.getPrefix(browser),
                    screenshotName: 'submenumenu_collapsed',
                    selector: '#screenshot-submenu'
                })
                .call(done);
        });

        it('should match the baseline screenshot when an expanded submenu exists', function (done) {
            var common = require('../common');

            browser
                .setupTest('/contextmenu/fixtures/test.full.html')
                .click('#screenshot-submenu button.bb-context-menu-btn')
                .click('#screenshot-submenu .bb-submenu .panel-title .accordion-toggle > span > div')
                .compareScreenshot({
                    prefix: common.getPrefix(browser),
                    screenshotName: 'submenumenu_expanded',
                    selector: '#screenshot-submenu'
                })
                .call(done);
        });

    });

});
