/* global describe, it, browser, require */


describe('actionbar', function () {
    'use strict';

    function createActionbarOptions(done) {
        var common = require('../common');
        return {
            prefix: common.getPrefix(browser),
            screenshotName: 'actionbar',
            selector: '#screenshot-actionbar',
            checkAccessibility: true,
            done: done
        };
    }

    it('should match the baseline actionbar screenshot on small screens', function (done) {
        var options = createActionbarOptions(done);

        browser
            .setupTest('/actionbar/fixtures/test.full.html')
            .compareScreenshot(options)
            .call(done);
    });

    it('should match the baseline actionbar screenshot on small screens', function (done) {
        var options = createActionbarOptions(done);

        browser
            .setupTest('/actionbar/fixtures/test.full.html', 480)
            .compareScreenshot(options)
            .call(done);
    });
});
