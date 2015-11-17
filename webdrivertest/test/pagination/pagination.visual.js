/*global describe, it, browser, beforeEach, expect, require */

describe('pagination', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });


    it('should take pagination screenshot', function (done) {
        var screenshotName = screenshot_prefix.value + 'pagination',
            pageName = screenshotName + '_full';
        browser
            .url('/pagination/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-pagination'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take pagination hover screenshot', function (done) {
        var screenshotName = screenshot_prefix.value + 'pagination_hover',
            pageName = screenshotName + '_full';
        browser
            .url('/pagination/fixtures/test.full.html')
            .moveToObject('#screenshot-pagination li:nth-child(3) a')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-pagination'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take pagination clicked screenshot', function (done) {
        var screenshotName = screenshot_prefix.value + 'pagination_click',
            pageName = screenshotName + '_full';
        browser
            .url('/pagination/fixtures/test.full.html')
            .click('#screenshot-pagination li:nth-child(3) a')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-pagination'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
