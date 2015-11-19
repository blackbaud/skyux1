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
                })
                .click('#screenshot-submenu button.bb-context-menu-btn')
                .webdrivercss('submenumenu_collapsed_full', [
                    {
                        name: 'submenumenu_collapsed',
                        elem: '#screenshot-submenu'
                    }
                ], function (err, res) {
                    expect(err).toBe(undefined);
                    expect(res.submenu_collapsed[0].isWithinMisMatchTolerance).toBe(true);
                })
                .click('#screenshot-submenu .bb-submenu .panel-title .accordion-toggle > span > div')
                .webdrivercss('submenumenu_expanded_full', [
                    {
                        name: 'submenumenu_expanded',
                        elem: '#screenshot-submenu'
                    }
                ], function (err, res) {
                    expect(err).toBe(undefined);
                    expect(res.submenumenu_expanded[0].isWithinMisMatchTolerance).toBe(true);
                }).call(done);
        });

    });

});
