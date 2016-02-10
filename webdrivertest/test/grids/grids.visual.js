/*global describe, it, browser, beforeEach, expect, require */

describe('grids', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });

    it('should take screenshot of all grids', function (done) {
        var screenshotName = 'grids_all',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
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
        var screenshotName = 'grids_filters',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid .bb-filter-btn')
            .waitForVisible('#screenshot-grid .bb-visual-filter', 20000)
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
        var screenshotName = 'grids_filter_viewkeeper',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid .bb-filter-btn')
            .waitForVisible('#screenshot-grid .bb-visual-filter', 20000)
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
        var screenshotName = 'grids_filter_inline',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForVisible('#screenshot-grid-pagination .bb-filter-btn', 20000)
            .click('#screenshot-grid-pagination .bb-filter-btn')
            .waitForVisible('#screenshot-grid-pagination .bb-filters-inline', 20000)
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
        var screenshotName = 'grids_multiselect',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/grids/fixtures/test.full.html')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid td label.bb-check-wrapper')
            .moveToObject('#screenshot-grid tr.ui-widget-content:nth-child(2)')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-grid',
                    screenWidth: [480, 1280]
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });


});
