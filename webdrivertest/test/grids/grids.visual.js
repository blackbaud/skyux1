/*global describe, it, browser, beforeEach, require */

describe('grids', function () {
    'use strict';

    var common,
        options = {};

    beforeEach(function (done) {
        common = require('../common');

        common.initWebdriverCss(browser, options, done);
    });

    it('should take screenshot of the standard grid', function (done) {
        var browserResult,
            result;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid');

        result = common.moveCursorOffScreen(browserResult)
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000);

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'grids_standard',
            selector: '#screenshot-grid',
            done: done
        });
    });

    it('should take a screenshot of the wait grid', function (done) {
        var browserResult,
            result;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid-wait');

        result = common.moveCursorOffScreen(browserResult)
            .waitForVisible('#screenshot-grid-wait .bb-filter-btn', 20000);

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'grids_wait',
            selector: '#screenshot-grid-wait',
            done: done
        });
    });

    it('should take a screenshot of the loading grid', function (done) {
        var browserResult,
            result;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid-loading');

        result = common.moveCursorOffScreen(browserResult)
            .waitForVisible('#screenshot-grid-loading .bb-filter-btn', 20000);

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'grids_loading',
            selector: '#screenshot-grid-loading',
            done: done
        });
    });

    it('should take a screenshot of the paged grid', function (done) {
        var browserResult,
            result;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid-page');

        result = common.moveCursorOffScreen(browserResult)
            .waitForVisible('#screenshot-grid-pagination .bb-filter-btn', 20000);

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'grids_paged',
            selector: '#screenshot-grid-pagination',
            done: done
        });
    });

    it('should takes screenshot of all filters', function (done) {
        var browserResult;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid .bb-filter-btn')
            .waitForVisible('#screenshot-grid .bb-visual-filter', 20000)
            .click('#screenshot-grid .bb-visual-filter')
            .click('#screenshot-grid .bb-grid-filters-footer .btn-primary');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: options.prefix,
            screenshotName: 'grids_filters',
            selector: '#screenshot-grid',
            done: done
        });
    });

    it('should scroll the screen with the filter open', function (done) {
        var browserResult;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid .bb-filter-btn')
            .waitForVisible('#screenshot-grid .bb-visual-filter', 20000)
            .scroll(0, 49);

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: options.prefix,
            screenshotName: 'grids_filter_viewkeeper',
            selector: '#screenshot-grid',
            done: done
        });
    });

    it('should have active inline filters', function (done) {
        var browserResult;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid-page')
            .waitForVisible('#screenshot-grid-pagination .bb-filter-btn', 20000)
            .click('#screenshot-grid-pagination .bb-filter-btn')
            .waitForVisible('#screenshot-grid-pagination .bb-filters-inline', 20000)
            .click('#screenshot-grid-pagination .bb-filters-inline input[type="checkbox"]');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: options.prefix,
            screenshotName: 'grids_filter_inline',
            selector: '#screenshot-grid-pagination',
            done: done
        });
    });

    it('should have multiselect', function (done) {
        var browserResult;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid td label.bb-check-wrapper')
            .moveToObject('#screenshot-grid tr.ui-widget-content:nth-child(2)');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: options.prefix,
            screenshotName: 'grids_multiselect',
            selector: '#screenshot-grid',
            screenWidth: [1280, 480],
            done: done
        });

    });


});
