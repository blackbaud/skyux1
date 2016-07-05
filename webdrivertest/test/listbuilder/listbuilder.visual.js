/*global describe, it, browser, require */

describe('listbuilder', function () {
    'use strict';

    it('match the baseline listbuilder screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/listbuilder/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'listbuilder',
            screenWidth: [1280, 480],
            selector: '#screenshot-listbuilder',
            done: done
        });
    });
});