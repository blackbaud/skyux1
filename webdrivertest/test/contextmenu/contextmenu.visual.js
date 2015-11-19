/*global describe, it, browser, beforeAll, expect, require */

describe('contextmenu', function () {
    'use strict';

    beforeAll(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });

    describe('context menu', function () {
        it('should take contextmenu closed screenshot', function (done) {
            browser
                .url('/contextmenu/fixtures/test.full.html')
                .webdrivercss('contextmenu_closed_full', [
                    {
                        name: 'contextmenu_closed',
                        elem: '#screenshot-contextmenu'
                    }
                ], function (err, res) {
                    expect(err).toBe(undefined);
                    expect(res.contextmenu_closed[0].isWithinMisMatchTolerance).toBe(true);
                })
                .click('#screenshot-contextmenu button.bb-context-menu-btn')
                .webdrivercss('contextmenu_open_full', [
                    {
                        name: 'contextmenu_open',
                        elem: '#screenshot-contextmenu'
                    }
                ], function (err, res) {
                    expect(err).toBe(undefined);
                    expect(res.contextmenu_open[0].isWithinMisMatchTolerance).toBe(true);
                }).call(done);
        });

    });

    describe('submenu', function () {
        it('should take the submenu collapsed screenshot', function (done) {
            var screenshotName = 'submenumenu_collapsed',
                pageName = screenshotName + '_full';
            browser
                .url('/contextmenu/fixtures/test.full.html')
                .click('#screenshot-submenu button.bb-context-menu-btn')
                .webdrivercss(pageName, [
                    {
                        name: screenshotName,
                        elem: '#screenshot-submenu'
                    }
                ], function (err, res) {
                    expect(err).toBe(undefined);
                    expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
                }).call(done);
        });

        it('should take the submenu expanded screenshot', function (done) {
            var screenshotName = 'submenumenu_expanded',
                pageName = screenshotName + '_full';
            browser
                .url('/contextmenu/fixtures/test.full.html')
                .click('#screenshot-submenu button.bb-context-menu-btn')
                .click('#screenshot-submenu .bb-submenu .panel-title .accordion-toggle > span > div')
                .webdrivercss(pageName, [
                    {
                        name: screenshotName,
                        elem: '#screenshot-submenu'
                    }
                ], function (err, res) {
                    expect(err).toBe(undefined);
                    expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
                }).call(done);
        });
    });

});
