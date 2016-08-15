/*global describe, it, browser, require */

describe('popover', function () {
    'use strict';

    it('should match the baseline popover screenshot when it has a title', function (done) {
        browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-title a')
            .compareScreenshot({
                screenshotName: 'popover_title',
                selector: '#screenshot-popover-title',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline popover screenshot when it does not have a title', function (done) {
        browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-no-title a')
            .compareScreenshot({
                screenshotName: 'popover_no_title',
                selector: '#screenshot-popover-no-title',
                checkAccessibility: true
            })
            .call(done);

    });

    it('should match the baseline popover screenshot with position top', function (done) {
        browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-top button')
            .compareScreenshot({
                screenshotName: 'popover_top',
                selector: '#screenshot-popover-top',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline popover screenshot with position bottom', function (done) {
        browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-bottom button')
            .compareScreenshot({
                screenshotName: 'popover_bottom',
                selector: '#screenshot-popover-bottom',
                checkAccessibility: true
            })
            .call(done);

    });

    it('should match the baseline popover screenshot with position left', function (done) {
        browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-left button')
            .compareScreenshot({
                screenshotName: 'popover_left',
                selector: '#screenshot-popover-left',
                checkAccessibility: true
            })
            .call(done);

    });

    it('should match the baseline popover screenshot with position right', function (done) {
        browser
            .setupTest('/popover/fixtures/test.full.html')
            .click('#screenshot-popover-right button')
            .compareScreenshot({
                screenshotName: 'popover_right',
                selector: '#screenshot-popover-right',
                checkAccessibility: true
            })
            .call(done);
    });


});
