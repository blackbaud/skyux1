/*global describe, it, browser, require */

describe('pagination', function () {
    'use strict';

    it('match the baseline pagination screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/pagination/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'pagination',
            selector: '#screenshot-pagination',
            done: done
        });

    });

    it('should match the baseline pagination screenshot when clicked', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/pagination/fixtures/test.full.html')
            .click('#screenshot-pagination li:nth-child(3) a');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'pagination_click',
            selector: '#screenshot-pagination',
            done: done
        });

    });
});
