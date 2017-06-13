
/*global describe, it, browser */

describe('Reorder table', function () {
    'use strict';

    it('should match previous reorder table screenshot in the default state', function () {
        return browser
            .setupTest('/reordertable/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'reordertable_default',
                selector: '#screenshot-reorder-table-context'
            });
    });

    it('should match previous fixed reorder table screenshot in the default state', function () {
        return browser
            .setupTest('/reordertable/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'reordertable_fixed_default',
                selector: '#screenshot-reorder-table-fixed'
            });
    });

    it('should match previous reorder table screenshot when user is sorting', function () {
        return browser
            .setupTest('/reordertable/fixtures/test.full.html')
            .moveToObject('#screenshot-reorder-table-context .bb-reorder-table-row:first-child .bb-reorder-table-col-icon')
            .buttonDown()
            .moveToObject('#screenshot-reorder-table-context .bb-reorder-table-row:nth-child(2)', 0, 0)
            .compareScreenshot({
                screenshotName: 'reordertable_sorting',
                selector: '#screenshot-reorder-table-context'
            })
            .buttonUp();
    });

    it('should match previous fixed reorder table screenshot when user is sorting', function () {
        return browser
            .setupTest('/reordertable/fixtures/test.full.html')
            .moveToObject('#screenshot-reorder-table-fixed .bb-reorder-table-row:nth-child(2) .bb-reorder-table-col-icon')
            .buttonDown()
            .moveToObject('#screenshot-reorder-table-fixed .bb-reorder-table-row:nth-child(3)', 0, 0)
            .compareScreenshot({
                screenshotName: 'reordertable_fixed_sorting',
                selector: '#screenshot-reorder-table-fixed'
            })
            .buttonUp();
    });

    it('should match previous reorder table screenshot with context menu open', function () {
        return browser
            .setupTest('/reordertable/fixtures/test.full.html')
            .waitForVisible('#screenshot-reorder-table-context .bb-context-menu-btn:first-child', 20000)
            .click('.bb-context-menu-btn:first-child')
            .compareScreenshot({
                screenshotName: 'reordertable_contextmenu_open',
                selector: '#screenshot-reorder-table-context'
            });
    });

    it('should match previous unsortable reorder table', function () {
        return browser
            .setupTest('/reordertable/fixtures/test.full.html')
            .click('#unsortable-toggle')
            .compareScreenshot({
                screenshotName: 'reordertable_unsortable',
                selector: '#screenshot-reorder-table-fixed'
            });
    });
    
});
