/* global describe, it, browser, require */


describe('actionbar', function () {
    'use strict';

    function actionbarScreenshot(browserResult, done) {
        var common = require('../common');
        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'actionbar',
            selector: '#screenshot-actionbar',
            checkAccessibility: true,
            done: done
        });
    }

    it('should match the baseline actionbar screenshot on small screens', function (done) {
        var browserResult;

        browserResult = browser.setupTest('/actionbar/fixtures/test.full.html');
        actionbarScreenshot(browserResult, done);
    });

    it('should match the baseline actionbar screenshot on small screens', function (done) {
        var browserResult;

        browserResult = browser.setupTest('/actionbar/fixtures/test.full.html', 480);  
        actionbarScreenshot(browserResult, done);
    });
});
