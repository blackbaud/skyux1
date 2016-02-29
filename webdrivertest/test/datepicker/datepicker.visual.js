/*global describe, it, browser, beforeEach, require */

describe('datepicker', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    it('should match the baseline screenshot when the datepickers are closed', function (done) {
        var result;

        result = browser.url('/datepicker/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'datepicker_closed',
            selector: '#screenshot-datepicker',
            done: done
        });

    });

    it('should match the baseline screenshot when the datepicker is open', function (done) {
        var result;

        result = browser.url('/datepicker/fixtures/test.full.html')
            .click('#screenshot-datepicker .bb-date-field-calendar-button')
            .waitForVisible('ul[uib-datepicker-popup-wrap]');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'datepicker_open',
            selector: '#screenshot-datepickers',
            done: done
        });

    });

    it('should match the baseline screenshot when the datepicker is appended to body and open', function (done) {
        var result;

        result = browser.url('/datepicker/fixtures/test.full.html')
            .click('#screenshot-datepicker-append-to-body .bb-date-field-calendar-button')
            .waitForVisible('ul[uib-datepicker-popup-wrap]');
        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'datepicker_open_append',
            selector: '#screenshot-datepicker-append-to-body',
            done: done
        });

    });


});
