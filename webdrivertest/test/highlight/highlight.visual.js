
/*global describe, it, browser,require */

describe('highlight', function () {
    'use strict';

    it('match the baseline highlight screenshot', function (done) {
        browser
            .setupTest('/highlight/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'highlight',
                selector: '#screenshot-highlight'
            })
            .call(done);
    });
});
