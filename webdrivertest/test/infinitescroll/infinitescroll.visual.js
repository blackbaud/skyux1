/*global describe, it, browser */

describe('infinite scroll', function () {
    'use strict';

    it('match the baseline infinite scroll screenshot', function () {

        return browser
            .setupTest('/infinitescroll/fixtures/test.full.html')
            .click('.bb-btn-secondary')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'infinitescroll',
                selector: '#screenshot-infinitescroll',
                checkAccessibility: true
            });
    });
});