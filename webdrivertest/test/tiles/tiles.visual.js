
/*global describe, it, browser, beforeEach, expect, require */

describe('tiles', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });

    it('should take tile expanded screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'tile_expanded',
            pageName = screenshotName + '_full';
        browser
            .url('/tiles/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-tiles-all'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take tile collapsed screenshots', function (done) {
        var screenshotName = screenshot_prefix.value + 'tile_collapsed',
            pageName = screenshotName + '_full';
        browser
            .url('/tiles/fixtures/test.full.html')
            .click('#screenshot-tile-minimal .bb-tile-title')
            .click('#screenshot-tile-with-settings .bb-tile-title')
            .click('#screenshot-tile-with-header-content .bb-tile-title')
            .click('#screenshot-tile-with-header-check .bb-tile-title')
            .click('#screenshot-tile-with-settings-overflow .bb-tile-title')
            .click('#screenshot-tile-with-header-content-overflow .bb-tile-title')
            .click('#screenshot-tile-with-overflow-header-content-overflow .bb-tile-title')
            .click('#screenshot-tile-with-overflow-header-content .bb-tile-title')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-tiles-all'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
