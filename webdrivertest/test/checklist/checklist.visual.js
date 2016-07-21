
/*global describe, it, browser, require */

describe('checklist', function () {
    'use strict';

    it('match the baseline screenshot for the checklist in grid mode', function (done) {
        browser
            .setupTest('/checklist/fixtures/test.full.html')
            .click('button.show-grid')
            .compareScreenshot({
                screenshotName: 'checklist_grid',
                selector: '#screenshot-checklist-grid',
                checkAccessibility: true
            })
            .call(done);
    });

    it('match the baseline screenshot for the checklist in list mode', function (done) {
        browser
            .setupTest('/checklist/fixtures/test.full.html')
            .click('button.show-list')
            .compareScreenshot({
                screenshotName: 'checklist_list',
                selector: '#screenshot-checklist-list',
                checkAccessibility: true
            })
            .call(done);
    });

    it('match the baseline screenshot for the checklist in single select mode', function (done) {
        browser
            .setupTest('/checklist/fixtures/test.full.html')
            .click('button.show-single')
            .compareScreenshot({
                screenshotName: 'checklist_single',
                selector: '#screenshot-checklist-single',
                checkAccessibility: true
            })
            .call(done);
    });
});
