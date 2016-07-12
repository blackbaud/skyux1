/* global describe, it, browser, require */


describe('actionbar', function () {
    'use strict';

    function createActionbarOptions() {
        return {
            screenshotName: 'actionbar',
            selector: '#screenshot-actionbar',
            checkAccessibility: true
        };
    }

    it('should match the baseline actionbar screenshot on small screens', function (done) {
        var options = createActionbarOptions();

        browser
            .setupTest('/actionbar/fixtures/test.full.html')
            .compareScreenshot(options)
            .call(done);
    });

    it('should match the baseline actionbar screenshot on small screens', function (done) {
        var options = createActionbarOptions();

        browser
            .setupTest('/actionbar/fixtures/test.full.html', 480)
            .compareScreenshot(options)
            .call(done);
    });
});
