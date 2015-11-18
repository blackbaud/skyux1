/*global describe, it, browser, beforeEach, expect, require */

describe('searchfield', function () {
    'use strict';

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, done);
    });

    it('should take searchfield screenshots', function (done) {
        var screenshotName = 'searchfields',
            pageName = screenshotName + '_full';
        browser
            .url('/searchfield/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-searchfield-full'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take searchfield single active screenshots', function (done) {
        var screenshotName = 'searchfield_single_active',
            pageName = screenshotName + '_full';
        browser
            .url('/searchfield/fixtures/test.full.html')
            .click('#screenshot-searchfield-single .ui-select-toggle')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-searchfield-single'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take searchfield single dropdown screenshots', function (done) {
        var screenshotName = 'searchfield_single_dropdown',
            pageName = screenshotName + '_full';
        browser
            .url('/searchfield/fixtures/test.full.html')
            .click('#screenshot-searchfield-single .ui-select-toggle')
            .moveToObject('#screenshot-searchfield-single-choices .ui-select-choices-row-inner')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-searchfield-single-choices'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take searchfield multiple active screenshots', function (done) {
        var screenshotName = 'searchfield_multiple_active',
            pageName = screenshotName + '_full';
        browser
            .url('/searchfield/fixtures/test.full.html')
            .click('#screenshot-searchfield-multiple .ui-select-search')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-searchfield-multiple'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take searchfield multiple dropdown screenshots', function (done) {
        var screenshotName = 'searchfield_multiple_dropdown',
            pageName = screenshotName + '_full';
        browser
            .url('/searchfield/fixtures/test.full.html')
            .click('#screenshot-searchfield-multiple .ui-select-search')
            .moveToObject('#screenshot-searchfield-multiple-choices .ui-select-choices-row-inner')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-searchfield-multiple-choices'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take searchfield multiple close hover screenshots', function (done) {
        var screenshotName = 'searchfield_multiple_close_hover',
            pageName = screenshotName + '_full';
        browser
            .url('/searchfield/fixtures/test.full.html')
            .moveToObject('.ui-select-match-item .ui-select-match-close')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '.ui-select-match-item'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

});
