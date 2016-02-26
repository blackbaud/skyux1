/*global describe, it, browser, beforeEach, require */

describe('checklist', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });


    it('match the baseline screenshot for the checklist in grid mode', function (done) {
        var browserResult;

        browserResult = browser
            .url('/checklist/fixtures/test.full.html')
            .click('button.show-grid');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: options.prefix,
            screenshotName: 'checklist_grid',
            selector: '#screenshot-checklist-grid',
            done: done
        });
    });

    it('match the baseline screenshot for the checklist in list mode', function (done) {
        var browserResult;

        browserResult = browser
            .url('/checklist/fixtures/test.full.html')
            .click('button.show-list');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: options.prefix,
            screenshotName: 'checklist_list',
            selector: '#screenshot-checklist-list',
            done: done
        });
    });

    it('match the baseline screenshot for the checklist in single select mode', function (done) {
        var browserResult;

        browserResult = browser
            .url('/checklist/fixtures/test.full.html')
            .click('button.show-single');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: options.prefix,
            screenshotName: 'checklist_single',
            selector: '#screenshot-checklist-single',
            done: done
        });
    });
});
