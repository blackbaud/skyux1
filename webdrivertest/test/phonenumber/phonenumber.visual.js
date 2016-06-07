/*global describe, it, browser, require */

describe('Phone Number directive', function () {
    'use strict';

    var selectors = {
        flagContainer: '.flag-container',
        countryList: '.country-list',
        localCountryTextbox: 'input[placeholder="(201) 555-5555"]',
        intlCountryTextbox: 'input[placeholder="01812-345678"]',
        intlCountrySelect: 'li[data-dial-code="880"]'
    };

    it('should match the baseline phone number screenshot.', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/phonenumber/fixtures/test.full.html')
                 .waitForVisible(selectors.localCountryTextbox);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'phonenumber',
            selector: '#screenshot-phonenumber',
            done: done,
            checkAccessibility: true
        });
    });

    it('should match the baseline phone number screenshot when the flag selector is clicked.', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/phonenumber/fixtures/test.full.html')
                 .click(selectors.flagContainer)
                 .waitForVisible(selectors.countryList);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'phonenumber_flag_select',
            selector: '#screenshot-phonenumber',
            done: done,
            checkAccessibility: true
        });
    });

    it('should match the baseline phone number screenshot when an international country is selected.', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/phonenumber/fixtures/test.full.html')
                 .click(selectors.flagContainer)
                 .click(selectors.intlCountrySelect)
                 .waitForVisible(selectors.intlCountryTextbox);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'phonenumber_intl_country',
            selector: '#screenshot-phonenumber',
            done: done,
            checkAccessibility: true
        });
    });
});
