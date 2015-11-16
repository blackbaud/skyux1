/*global describe, it, browser, beforeEach, expect, require */

describe('datepicker', function () {
    'use strict';

    var screenshot_prefix = {};

    beforeEach(function (done) {
        require('../common').createScreenshotPrefix(browser, screenshot_prefix, done);
    });

    it('should take screenshot of closed datepickers', function (done) {
        var screenshotName = screenshot_prefix.value + '_datepicker_closed',
            pageName = screenshotName + '_full';
        browser
            .url('/datepicker/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-datepickers'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take a screenshot of the open datepicker', function (done) {
        var screenshotName = screenshot_prefix.value + '_datepicker_open',
            pageName = screenshotName + '_full';
        browser
            .url('/datepicker/fixtures/test.full.html')
            .click('#screenshot-datepicker .bb-date-field-calendar-button')
            .waitForVisible('ul[datepicker-popup-wrap]')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-datepicker'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take a screenshot of the open datepicker append', function (done) {
        var screenshotName = screenshot_prefix.value + '_datepicker_open_append',
            pageName = screenshotName + '_full';
        browser
            .url('/datepicker/fixtures/test.full.html')
            .click('#screenshot-datepicker-append-to-body .bb-date-field-calendar-button')
            .waitForVisible('ul[datepicker-popup-wrap]')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-datepicker-append-to-body'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });


});
