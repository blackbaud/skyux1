/*global describe, it, browser, require */

describe('pagination', function () {
    'use strict';

    it('match the baseline pagination screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/pagination/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'pagination',
                selector: '#screenshot-pagination'
            })
            .call(done);

    });

    it('should match the baseline pagination screenshot when clicked', function (done) {
        var common = require('../common');

        browser
            .setupTest('/pagination/fixtures/test.full.html')
            .click('#screenshot-pagination li:nth-child(3) a')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'pagination_click',
                selector: '#screenshot-pagination'
            })
            .call(done);

    });
});
