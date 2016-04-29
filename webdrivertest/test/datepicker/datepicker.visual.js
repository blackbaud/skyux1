/*global describe, it, browser, require */

describe('datepicker', function () {
    'use strict';

    it('should match the baseline screenshot when the datepickers are closed', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/datepicker/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'datepicker_closed',
            selector: '#screenshot-datepicker',
            done: done
        });

    });

    it('should match the baseline screenshot when the datepicker is open', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/datepicker/fixtures/test.full.html')
            .click('#screenshot-datepicker .bb-date-field-calendar-button')
            .waitForVisible('ul[uib-datepicker-popup-wrap]', 3000);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'datepicker_open',
            selector: '#screenshot-datepickers',
            done: done
        });

    });

    it('should match the baseline screenshot when the datepicker is appended to body and open', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/datepicker/fixtures/test.full.html')
            .click('#screenshot-datepicker-append-to-body .bb-date-field-calendar-button')
            .waitForVisible('ul[uib-datepicker-popup-wrap]', 3000);
        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'datepicker_open_append',
            selector: '#screenshot-datepicker-append-to-body',
            done: done
        });

    });


});
