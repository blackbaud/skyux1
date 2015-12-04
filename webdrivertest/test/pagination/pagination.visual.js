/*global describe, it, browser, beforeEach, expect, require */

describe('pagination', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });


    it('should take pagination screenshot', function (done) {
        var screenshotName = 'pagination',
            pageName = options.prefix + screenshotName + '_full';
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
        var screenshotName = 'pagination_hover',
            pageName = options.prefix + screenshotName + '_full';
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
        var screenshotName = 'pagination_click',
            pageName = options.prefix + screenshotName + '_full';
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
