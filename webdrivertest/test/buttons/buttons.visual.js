
/*global describe, it, browser, beforeAll, expect, require */

describe('buttons', function () {
    'use strict';

    beforeAll(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });

    function getSelector(type, prefix) {
        var selector = (prefix !== undefined ? ('.' + prefix + '-') : '.') + 'btn-' + type;
        return selector;
    }

    it('should take the button screenshots', function (done) {
        browser
            .url('/buttons/fixtures/test.full.html')
            .webdrivercss('buttons_full', [
                {
                    name: 'buttons',
                    elem: '#screenshot-buttons'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.buttons[0].isWithinMisMatchTolerance).toBe(true);
            })
            .moveToObject(getSelector('default'))
            .webdrivercss('button_default_hover_full', [
                {
                    name: 'button_default_hover',
                    elem: ('#screenshots-buttons-default')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_default_hover[0].isWithinMisMatchTolerance).toBe(true);
            })
            .click(getSelector('default'))
            .webdrivercss('button_default_click_full', [
                {
                    name: 'button_default_click',
                    elem: ('#screenshots-buttons-default')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_default_click[0].isWithinMisMatchTolerance).toBe(true);
            })
            .moveToObject(getSelector('primary'))
            .webdrivercss('button_primary_hover_full', [
                {
                    name: 'button_primary_hover',
                    elem: ('#screenshots-buttons-primary')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_primary_hover[0].isWithinMisMatchTolerance).toBe(true);
            })
            .click(getSelector('primary'))
            .webdrivercss('button_primary_click_full', [
                {
                    name: 'button_primary_click',
                    elem: ('#screenshots-buttons-primary')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_primary_click[0].isWithinMisMatchTolerance).toBe(true);
            })
            .moveToObject(getSelector('secondary', 'bb'))
            .webdrivercss('button_secondary_hover_full', [
                {
                    name: 'button_secondary_hover',
                    elem: ('#screenshots-buttons-secondary')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_secondary_hover[0].isWithinMisMatchTolerance).toBe(true);
            })
            .click(getSelector('secondary', 'bb'))
            .webdrivercss('button_secondary_click_full', [
                {
                    name: 'button_secondary_click',
                    elem: ('#screenshots-buttons-secondary')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_secondary_click[0].isWithinMisMatchTolerance).toBe(true);
            })
            .moveToObject(getSelector('success'))
            .webdrivercss('button_success_hover_full', [
                {
                    name: 'button_success_hover',
                    elem: ('#screenshots-buttons-success')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_success_hover[0].isWithinMisMatchTolerance).toBe(true);
            })
            .click(getSelector('success'))
            .webdrivercss('button_success_click_full', [
                {
                    name: 'button_success_click',
                    elem: ('#screenshots-buttons-success')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_success_click[0].isWithinMisMatchTolerance).toBe(true);
            })
            .moveToObject(getSelector('info'))
            .webdrivercss('button_info_hover_full', [
                {
                    name: 'button_info_hover',
                    elem: ('#screenshots-buttons-info')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_info_hover[0].isWithinMisMatchTolerance).toBe(true);
            })
            .click(getSelector('info'))
            .webdrivercss('button_info_click_full', [
                {
                    name: 'button_info_click',
                    elem: ('#screenshots-buttons-info')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_info_click[0].isWithinMisMatchTolerance).toBe(true);
            })

            .moveToObject(getSelector('warning'))
            .webdrivercss('button_warning_hover_full', [
                {
                    name: 'button_warning_hover',
                    elem: ('#screenshots-buttons-warning')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_warning_hover[0].isWithinMisMatchTolerance).toBe(true);
            })
            .click(getSelector('warning'))
            .webdrivercss('button_warning_click_full', [
                {
                    name: 'button_warning_click',
                    elem: ('#screenshots-buttons-warning')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_warning_click[0].isWithinMisMatchTolerance).toBe(true);
            })

            .moveToObject(getSelector('danger'))
            .webdrivercss('button_danger_hover_full', [
                {
                    name: 'button_danger_hover',
                    elem: ('#screenshots-buttons-danger')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_danger_hover[0].isWithinMisMatchTolerance).toBe(true);
            })
            .click(getSelector('danger'))
            .webdrivercss('button_danger_click_full', [
                {
                    name: 'button_danger_click',
                    elem: ('#screenshots-buttons-danger')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_danger_click[0].isWithinMisMatchTolerance).toBe(true);
            })
            .moveToObject(getSelector('link'))
            .webdrivercss('button_link_hover_full', [
                {
                    name: 'button_link_hover',
                    elem: ('#screenshots-buttons-link')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_link_hover[0].isWithinMisMatchTolerance).toBe(true);
            })
            .click(getSelector('link'))
            .webdrivercss('button_link_click_full', [
                {
                    name: 'button_link_click',
                    elem: ('#screenshots-buttons-link')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.button_link_click[0].isWithinMisMatchTolerance).toBe(true);
            })
            .call(done);
    });

});
