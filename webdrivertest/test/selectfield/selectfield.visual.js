/*global describe, it, browser, require */

describe('selectfield', function () {
    'use strict';

    it('should match the baseline screenshot of the multiple select field', function (done) {
        var browserResult,
            common = require('../common');

        browserResult = browser
            .url('/selectfield/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'selectfield_multiple',
            selector: '#screenshot-selectfield-multiple',
            done: done
        });
    });

    it('should match the baseline screenshot of the single select field', function (done) {
        var browserResult,
            common = require('../common');

        browserResult = browser
            .url('/selectfield/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'selectfield_single',
            selector: '#screenshot-selectfield-single',
            done: done
        });
    });

});
