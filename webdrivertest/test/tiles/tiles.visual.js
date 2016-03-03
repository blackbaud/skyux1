
/*global describe, it, browser, beforeEach, require */

describe('tiles', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline screenshot when tile is expanded', function (done) {
        var result;

        result = browser.url('/tiles/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'tile_expanded',
            selector: '#screenshot-tiles-all',
            done: done
        });
    });

    it('should match the baseline screenshot whe tiles are collapsed', function (done) {
        var result;

        result = browser.url('/tiles/fixtures/test.full.html')
            .click('#screenshot-tile-minimal .bb-tile-title')
            .click('#screenshot-tile-with-settings .bb-tile-title')
            .click('#screenshot-tile-with-header-content .bb-tile-title')
            .click('#screenshot-tile-with-header-check .bb-tile-title')
            .click('#screenshot-tile-with-settings-overflow .bb-tile-title')
            .click('#screenshot-tile-with-header-content-overflow .bb-tile-title')
            .click('#screenshot-tile-with-overflow-header-content-overflow .bb-tile-title')
            .click('#screenshot-tile-with-overflow-header-content .bb-tile-title');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'tile_collapsed',
            selector: '#screenshot-tiles-all',
            done: done
        });

    });

    it('should match the baseline screenshot when the tile has a config icon', function (done) {
        var result;

        result = browser.url('/tiles/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'tile_config',
            selector: '#screenshot-tile-with-settings',
            done: done
        });
    });
});
