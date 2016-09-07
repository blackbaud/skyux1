/*global describe, it, browser */

describe('bb-grid component', function () {
    'use strict';

    it('should match the baseline screenshot of the standard grid', function () {
        return browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-no-flyout')
            .moveCursorOffScreen()
            .waitForVisible('#screenshot-grid-no-flyout .bb-filter-btn', 20000)
            .compareScreenshot({
                screenshotName: 'grids_standard',
                selector: '#screenshot-grid-no-flyout'
            });
    });

    it('should match the baseline screenshot of the grid while wait is invoked', function () {
        return browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-wait')
            .moveCursorOffScreen()
            .waitForVisible('#screenshot-grid-wait .bb-filter-btn', 20000)
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'grids_wait',
                selector: '#screenshot-grid-wait'
            });
    });

    it('should match the baseline screenshort of a loading grid', function () {
        return browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-loading')
            .moveCursorOffScreen()
            .waitForVisible('#screenshot-grid-loading .bb-filter-btn', 20000)
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'grids_loading',
                selector: '#screenshot-grid-loading'
            });
    });

    it('should match the baseline screenshot of a grid with pagination', function () {
        return browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-page')
            .moveCursorOffScreen()
            .waitForVisible('#screenshot-grid-pagination .bb-filter-btn', 20000)
            .compareScreenshot({
                screenshotName: 'grids_paged',
                selector: '#screenshot-grid-pagination'
            });
    });

    it('match a baseline screenshot of a grid with filters', function () {
        return browser
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
            });
    });

    it('match a baseline screenshot while a grid with filters open is scrolled', function () {
        return browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid')
            .waitForVisible('#screenshot-grid .bb-filter-btn', 20000)
            .click('#screenshot-grid .bb-filter-btn')
            .waitForVisible('#screenshot-grid .bb-visual-filter', 20000)
            .scroll(0, 49)
            .compareScreenshot({
                screenshotName: 'grids_filter_viewkeeper',
                selector: '#screenshot-grid'
            });
    });

    it('should match a baseline screenshot with a grid that has active inline filters', function () {
        return browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-page')
            .waitForVisible('#screenshot-grid-pagination .bb-filter-btn', 20000)
            .click('#screenshot-grid-pagination .bb-filter-btn')
            .waitForVisible('#screenshot-grid-pagination .bb-filters-inline', 20000)
            .click('#screenshot-grid-pagination .bb-filters-inline input[type="checkbox"]')
            .compareScreenshot({
                screenshotName: 'grids_filter_inline',
                selector: '#screenshot-grid-pagination'
            });
    });

    function multiselectTest(screenSize) {
        return browser
            .setupTest('/grids/fixtures/test.full.html', screenSize)
            .click('button.show-grid-no-flyout')
            .waitForVisible('#screenshot-grid-no-flyout .bb-filter-btn', 20000)
            .click('#screenshot-grid-no-flyout td label.bb-check-wrapper')
            .moveToObject('#screenshot-grid-no-flyout tr.ui-widget-content:nth-child(2)')
            .moveCursorOffScreen()
            .compareScreenshot({
                screenshotName: 'grids_multiselect',
                selector: '#screenshot-grid-no-flyout'
            });
    }

    it('should match a baseline screenshot of a grid with multiselect', function () {
        return multiselectTest(1280);
    });

    it('should match a baseline screenshot of a grid with multiselect on a small screen', function () {
        return multiselectTest(480);
    });

    it('should match a baseline screenshot of a grid with context menu open', function () {

        return browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-no-flyout')
            .waitForVisible('#screenshot-grid-no-flyout td .bb-context-menu-btn', 20000)
            .click('.bb-context-menu-btn')
            .compareScreenshot({
                screenshotName: 'grids_contextmenu_open',
                selector: '#screenshot-grid-no-flyout'
            });
    });

    it('should match a baseline screenshot of a grid with filter modal', function () {
        return browser
            .setupTest('/grids/fixtures/test.full.html')
            .click('button.show-grid-no-flyout')
            .waitForVisible('#screenshot-grid-no-flyout .bb-filter-btn .bb-btn-secondary', 20000)
            .click('#screenshot-grid-no-flyout .bb-filter-btn .bb-btn-secondary')
            .pause(1000)
            .click('.bb-test-guitar')
            .click('.bb-test-drum')
            .click('.btn-primary')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'grids_filter_modal',
                selector: '#screenshot-grid-no-flyout'
            });
    });
});
