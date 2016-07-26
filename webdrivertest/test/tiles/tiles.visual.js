
/*global describe, it, browser, require */

describe('tiles', function () {
    'use strict';

    it('should match the baseline screenshot when tile is expanded', function (done) {
        browser
            .setupTest('/tiles/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'tile_expanded',
                selector: '#screenshot-tiles-all'
            })
            .call(done);
    });

    it('should match the baseline screenshot whe tiles are collapsed', function (done) {
        browser.setupTest('/tiles/fixtures/test.full.html')
            .click('#screenshot-tile-minimal .bb-tile-title')
            .click('#screenshot-tile-with-settings .bb-tile-title')
            .click('#screenshot-tile-with-header-content .bb-tile-title')
            .click('#screenshot-tile-with-header-check .bb-tile-title')
            .click('#screenshot-tile-with-settings-overflow .bb-tile-title')
            .click('#screenshot-tile-with-header-content-overflow .bb-tile-title')
            .click('#screenshot-tile-with-overflow-header-content-overflow .bb-tile-title')
            .click('#screenshot-tile-with-overflow-header-content .bb-tile-title')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'tile_collapsed',
                selector: '#screenshot-tiles-all'
            })
            .call(done);
    });

    it('should match the baseline screenshot when the tile has a config icon', function (done) {
        browser
            .setupTest('/tiles/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'tile_config',
                selector: '#screenshot-tile-with-settings'
            })
            .call(done);
    });
});
