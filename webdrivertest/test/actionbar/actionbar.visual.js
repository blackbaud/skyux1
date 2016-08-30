/* global describe, it, browser */


describe('actionbar', function () {
    'use strict';

    function createActionbarOptions() {
        return {
            screenshotName: 'actionbar',
            selector: '#screenshot-actionbar',
            checkAccessibility: true
        };
    }

    it('should match the baseline actionbar screenshot', function () {
        var options = createActionbarOptions();

        return browser
            .setupTest('/actionbar/fixtures/test.full.html')
            .compareScreenshot(options);
    });

    it('should match the baseline actionbar screenshot on small screens', function () {
        var options = createActionbarOptions();

        return browser
            .setupTest('/actionbar/fixtures/test.full.html', 480)
            .compareScreenshot(options);
    });
});
