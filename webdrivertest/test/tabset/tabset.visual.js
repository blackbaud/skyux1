/*global describe, it, browser,require */

describe('tabset', function () {
    'use strict';

    function tabsetTest(screenWidth, done) {
        browser
            .setupTest('/tabset/fixtures/test.full.html', screenWidth)
            .moveToObject('#screenshot-tabset-open-add li:nth-child(2) a')
            .compareScreenshot({
                screenshotName: 'tabset',
                selector: '#screenshot-tabset-all',
                checkAccessibility: true
            })
            .call(done);
    }

    it('should match the baseline tabset screenshot', function (done) {
        tabsetTest(1280, done);
    });

    it('should match the baseline tabset screenshot on small screens', function (done) {
        tabsetTest(480, done);
    });
});
