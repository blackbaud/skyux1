
/*global describe, it, browser, require */

describe('checklist', function () {
    'use strict';


    it('match the baseline screenshot for the checklist in grid mode', function (done) {
        var browserResult,
            common = require('../common');

        browserResult = browser
            .url('/checklist/fixtures/test.full.html')
            .click('button.show-grid');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'checklist_grid',
            selector: '#screenshot-checklist-grid',
            done: done
        });
    });

    it('match the baseline screenshot for the checklist in list mode', function (done) {
        var browserResult,
            common = require('../common');

        browserResult = browser
            .url('/checklist/fixtures/test.full.html')
            .click('button.show-list');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'checklist_list',
            selector: '#screenshot-checklist-list',
            done: done
        });
    });

    it('match the baseline screenshot for the checklist in single select mode', function (done) {
        var browserResult,
            common = require('../common');

        browserResult = browser
            .url('/checklist/fixtures/test.full.html')
            .click('button.show-single');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'checklist_single',
            selector: '#screenshot-checklist-single',
            done: done
        });
    });
});
