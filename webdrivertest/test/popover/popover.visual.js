/*global describe, it, browser */

describe('popover', function () {
    'use strict';

    it('should match the baseline popover screenshot when it has a title', function () {
        return browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-title a')
            .compareScreenshot({
                screenshotName: 'popover_title',
                selector: '#screenshot-popover-title',
                checkAccessibility: true
            });
    });

    it('should match the baseline popover screenshot when it does not have a title', function () {
        return browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-no-title a')
            .compareScreenshot({
                screenshotName: 'popover_no_title',
                selector: '#screenshot-popover-no-title',
                checkAccessibility: true
            });

    });

    it('should match the baseline popover screenshot with position top', function () {
        return browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-top button')
            .compareScreenshot({
                screenshotName: 'popover_top',
                selector: '#screenshot-popover-top',
                checkAccessibility: true
            });
    });

    it('should match the baseline popover screenshot with position bottom', function () {
        return browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-bottom button')
            .compareScreenshot({
                screenshotName: 'popover_bottom',
                selector: '#screenshot-popover-bottom',
                checkAccessibility: true
            });

    });

    it('should match the baseline popover screenshot with position left', function () {
        return browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-left button')
            .compareScreenshot({
                screenshotName: 'popover_left',
                selector: '#screenshot-popover-left',
                checkAccessibility: true
            });

    });

    it('should match the baseline popover screenshot with position right', function () {
        return browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-right button')
            .compareScreenshot({
                screenshotName: 'popover_right',
                selector: '#screenshot-popover-right',
                checkAccessibility: true
            });
    });


});
