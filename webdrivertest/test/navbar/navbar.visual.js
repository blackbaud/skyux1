/*global describe, it, browser, require */

describe('navbar', function () {
    'use strict';

    it('should match the baseline navbar screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/navbar/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'navbar',
            selector: '#screenshot-navbar',
            done: done
        });
    });

    it('should match the baseline navbar screenshot with the dropdown open', function (done) {
        var result,
            common = require('../common');

        result = browser
                    .url('/navbar/fixtures/test.full.html')
                    .moveToObject('.nav li.dropdown a');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'navbar_dropdown',
            selector: '#screenshot-navbar-dropdown',
            done: done
        });
    });
});
