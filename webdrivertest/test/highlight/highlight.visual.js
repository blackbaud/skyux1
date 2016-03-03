
/*global describe, it, browser,require */

describe('highlight', function () {
    'use strict';

    it('match the baseline highlight screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/highlight/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'highlight',
            selector: '#screenshot-highlight',
            done: done
        });
    });
});
