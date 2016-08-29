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

    it('actionbar', function () {
        var options = createActionbarOptions();

        return browser
            .setupTest('/actionbar/fixtures/test.full.html')
            .compareScreenshot(options);
    });

    it('actionbar', function () {
        var options = createActionbarOptions();

        return browser
            .setupTest('/actionbar/fixtures/test.full.html', 480)
            .compareScreenshot(options);
    });
});
