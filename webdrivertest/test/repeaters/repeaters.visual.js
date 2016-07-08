/*global describe, it, browser, require */

describe('repeaters', function () {
    'use strict';

    var common = require('../common');

    function createBrowserResult(switchToComponent) {
        var result = browser.setupTest('/repeaters/fixtures/test.full.html');

        if (switchToComponent) {
            result = result.click('#screenshot-repeaters-switch-to-component');
        }

        return result;
    }

    it('should match the baseline repeater screenshot', function (done) {
        createBrowserResult()
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'repeaters',
                selector: '#screenshot-repeaters-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline repeater component screenshot when all items are collapsed', function (done) {
        createBrowserResult(true)
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'repeaters_component_collapsed',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline repeater component screenshot when an item is expanded', function (done) {
        createBrowserResult(true)
            .click('.bb-repeater-item-header:nth-Child(1)')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'repeaters_component_expanded',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline repeater component screenshot when an item is expanded and no context menu exists', function (done) {
        createBrowserResult(true)
            .click('#screenshot-repeaters-hide-context-menu')
            .click('.bb-repeater-item-header:nth-Child(1)')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'repeaters_component_expanded_no_context_menu',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline repeater component screenshot when no title exists', function (done) {
        createBrowserResult(true)
            .click('#screenshot-repeaters-hide-title')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'repeaters_component_expanded_no_title',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            })
            .call(done);
    });
    
    it('should match the baseline repeater component screenshot when no checkbox exists', function (done) {
        createBrowserResult(true)
            .click('#screenshot-repeaters-hide-checkbox')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'repeaters_component_expanded_no_checkbox',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline repeater component screenshot when expand mode is "none"', function (done) {
        createBrowserResult(true)
            .click('#screenshot-repeaters-expand-mode-none')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'repeaters_component_expanded_no_expand',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            })
            .call(done);
    });
});
