/*global describe, it, browser, require */

describe('bb-grid component', function () {
    'use strict';

    it('should match the baseline screenshot of the standard grid', function (done) {
        var browserResult,
            common = require('../common'),
            result;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid');

        result = common.moveCursorOffScreen(browserResult)
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'grids_standard',
            selector: '#screenshot-grid',
            done: done
        });
    });

    it('should match the baseline screenshot of the grid while wait is invoked', function (done) {
        var browserResult,
            common = require('../common'),
            result;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid-wait');

        result = common.moveCursorOffScreen(browserResult)
            .waitForVisible('#screenshot-grid-wait .bb-filter-btn', 20000);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'grids_wait',
            selector: '#screenshot-grid-wait',
            done: done
        });
    });

    it('should match the baseline screenshort of a loading grid', function (done) {
        var browserResult,
            common = require('../common'),
            result;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid-loading');

        result = common.moveCursorOffScreen(browserResult)
            .waitForVisible('#screenshot-grid-loading .bb-filter-btn', 20000);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'grids_loading',
            selector: '#screenshot-grid-loading',
            done: done
        });
    });

    it('should match the baseline screenshot of a grid with pagination', function (done) {
        var browserResult,
            common = require('../common'),
            result;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid-page');

        result = common.moveCursorOffScreen(browserResult)
            .waitForVisible('#screenshot-grid-pagination .bb-filter-btn', 20000);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'grids_paged',
            selector: '#screenshot-grid-pagination',
            done: done
        });
    });

    it('should match the baseline screenshot of a grid with the column chooser open', function (done) {
        var browserResult,
            common = require('../common');

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('.bb-column-picker-btn')
            .waitForVisible('.modal-content');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'grids_columnchooser',
            selector: '.modal-content',
            screenWidth: [480],
            done: done
        });
    });

    it('match a baseline screenshot of a grid with filters', function (done) {
        var common = require('../common'),
            browserResult;

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
            prefix: common.getPrefix(browser),
            screenshotName: 'grids_filters',
            selector: '#screenshot-grid',
            done: done
        });
    });

    it('match a baseline screenshot while a grid with filters open is scrolled', function (done) {
        var common = require('../common'),
            browserResult;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid .bb-filter-btn')
            .waitForVisible('#screenshot-grid .bb-visual-filter', 20000)
            .scroll(0, 49);

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'grids_filter_viewkeeper',
            selector: '#screenshot-grid',
            done: done
        });
    });

    it('should match a baseline screenshot with a grid that has active inline filters', function (done) {
        var common = require('../common'),
            browserResult;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid-page')
            .waitForVisible('#screenshot-grid-pagination .bb-filter-btn', 20000)
            .click('#screenshot-grid-pagination .bb-filter-btn')
            .waitForVisible('#screenshot-grid-pagination .bb-filters-inline', 20000)
            .click('#screenshot-grid-pagination .bb-filters-inline input[type="checkbox"]');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'grids_filter_inline',
            selector: '#screenshot-grid-pagination',
            done: done
        });
    });

    it('should match a baseline screenshot of a grid with multiselect', function (done) {
        var common = require('../common'),
            browserResult,
            result;

        browserResult = browser
            .url('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid td label.bb-check-wrapper')
            .moveToObject('#screenshot-grid tr.ui-widget-content:nth-child(2)');

        result = common.moveCursorOffScreen(browserResult);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'grids_multiselect',
            selector: '#screenshot-grid',
            screenWidth: [1280, 480],
            done: done
        });

    });


});
