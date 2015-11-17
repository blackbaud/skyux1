

/*global describe, it, browser, beforeEach, expect, require */

describe('grids', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });

    it('should take screenshot of all grids', function (done) {
        var screenshotName = screenshot_prefix.value + 'grids_all',
            pageName = screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForExist('#screenshot-grid .bb-filter-btn', 20000)
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-grids-all'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .call(done);
    });

    it('should takes screenshot of all filters', function (done) {
        var screenshotName = screenshot_prefix.value + 'grids_filters',
            pageName = screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForExist('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid .bb-filter-btn')
            .waitForVisible('#screenshot-grid .bb-visual-filter')
            .click('#screenshot-grid .bb-visual-filter')
            .click('#screenshot-grid .bb-grid-filters-footer .btn-primary')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-grid'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should scroll the screen with the filter open', function (done) {
        var screenshotName = screenshot_prefix.value + 'grids_filter_viewkeeper',
            pageName = screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForExist('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid .bb-filter-btn')
            .waitForVisible('#screenshot-grid .bb-visual-filter')
            .scroll(0, 49)
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-grid'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should have active inline filters', function (done) {
        var screenshotName = screenshot_prefix.value + 'grids_filter_inline',
            pageName = screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForExist('#screenshot-grid-pagination .bb-filter-btn', 20000)
            .click('#screenshot-grid-pagination .bb-filter-btn')
            .waitForExist('#screenshot-grid-pagination .bb-filters-inline', 20000)
            .click('#screenshot-grid-pagination .bb-filters-inline input[type="checkbox"]')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-grid-pagination'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should have multiselect', function (done) {
        var screenshotName = screenshot_prefix.value + 'grids_multiselect',
            pageName = screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForExist('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid td label.bb-check-wrapper')
            .moveToObject('#screenshot-grid tr.ui-widget-content:nth-child(2)')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-grid'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should open the grid context menu', function (done) {
        var screenshotName = screenshot_prefix.value + 'grids_contextmenu',
            pageName = screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForExist('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid button.bb-context-menu-btn')
            .waitForVisible('ul.dropdown-menu li[bb-context-menu-action]')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-grid'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

});
