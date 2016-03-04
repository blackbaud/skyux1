/*global describe, it, browser, require */

describe('checklist', function () {
    'use strict';

    it('should take checklist screenshots', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/checklist/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'checklist',
            selector: '#screenshot-checklist',
            done: done
        });
    });
});
