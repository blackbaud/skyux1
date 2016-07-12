/*global describe, it, browser, require, $ */

describe('bb-grid component', function () {
    'use strict';

    it('should match the baseline screenshot of the standard grid', function (done) {
        browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .moveCursorOffScreen()
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .compareScreenshot({
                screenshotName: 'grids_standard',
                selector: '#screenshot-grid'
            })
            .call(done);
    });

    it('should match the baseline screenshot of the grid while wait is invoked', function (done) {
        browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-wait')
            .moveCursorOffScreen()
            .waitForVisible('#screenshot-grid-wait .bb-filter-btn', 20000)
            .compareScreenshot({
                screenshotName: 'grids_wait',
                selector: '#screenshot-grid-wait'
            })
            .call(done);
    });

    it('should match the baseline screenshort of a loading grid', function (done) {
        browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-loading')
            .moveCursorOffScreen()
            .waitForVisible('#screenshot-grid-loading .bb-filter-btn', 20000)
            .compareScreenshot({
                screenshotName: 'grids_loading',
                selector: '#screenshot-grid-loading'
            })
            .call(done);
    });

    it('should match the baseline screenshot of a grid with pagination', function (done) {
        browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-page')
            .moveCursorOffScreen()
            .waitForVisible('#screenshot-grid-pagination .bb-filter-btn', 20000)
            .compareScreenshot({
                screenshotName: 'grids_paged',
                selector: '#screenshot-grid-pagination'
            })
            .call(done);
    });

    it('match a baseline screenshot of a grid with filters', function (done) {
        browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid .bb-filter-btn')
            .waitForVisible('#screenshot-grid .bb-visual-filter', 20000)
            .click('#screenshot-grid .bb-visual-filter')
            .click('#screenshot-grid .bb-grid-filters-footer .btn-primary')
            .compareScreenshot({
                screenshotName: 'grids_filters',
                selector: '#screenshot-grid'
            })
            .call(done);
    });

    it('match a baseline screenshot while a grid with filters open is scrolled', function (done) {
        browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid .bb-filter-btn')
            .waitForVisible('#screenshot-grid .bb-visual-filter', 20000)
            .scroll(0, 49)
            .compareScreenshot({
                screenshotName: 'grids_filter_viewkeeper',
                selector: '#screenshot-grid'
            })
            .call(done);
    });

    it('should match a baseline screenshot with a grid that has active inline filters', function (done) {
        browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-page')
            .waitForVisible('#screenshot-grid-pagination .bb-filter-btn', 20000)
            .click('#screenshot-grid-pagination .bb-filter-btn')
            .waitForVisible('#screenshot-grid-pagination .bb-filters-inline', 20000)
            .click('#screenshot-grid-pagination .bb-filters-inline input[type="checkbox"]')
            .compareScreenshot({
                screenshotName: 'grids_filter_inline',
                selector: '#screenshot-grid-pagination'
            })
            .call(done);
    });

    function multiselectTest(screenSize, done) {
        browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid td label.bb-check-wrapper')
            .moveToObject('#screenshot-grid tr.ui-widget-content:nth-child(2)')
            .moveCursorOffScreen()
            .compareScreenshot({
                screenshotName: 'grids_multiselect',
                selector: '#screenshot-grid'
            })
            .call(done);
    }

    it('should match a baseline screenshot of a grid with multiselect', function (done) {
        multiselectTest(1280, done);
    });

    it('should match a baseline screenshot of a grid with multiselect on a small screen', function (done) {
        multiselectTest(480, done);
    });

    it('should match a baseline screenshot of a grid with context menu open', function (done) {
        var browserResult;

        /*  We add this class to the body because the resizing that webdriverCss does 
            while taking screenshots closes the context menu dropdown.
        */
        browserResult = browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid td .bb-context-menu-btn', 20000)
            .click('.bb-context-menu-btn')
            .compareScreenshot({
                screenshotName: 'grids_contextmenu_open',
                selector: '#screenshot-grid'
            })
            .call(done);
    });
});
