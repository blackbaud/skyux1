/*global describe, it, browser */

describe('repeaters', function () {
    'use strict';

    function createBrowserResult(switchToComponent) {
        var result = browser.setupTest('/repeaters/fixtures/test.full.html');

        if (switchToComponent) {
            result = result.click('#screenshot-repeaters-switch-to-component');
        }

        return result;
    }

    it('should match the baseline repeater screenshot', function () {
        return createBrowserResult()
            .compareScreenshot({
                screenshotName: 'repeaters',
                selector: '#screenshot-repeaters-full',
                checkAccessibility: true
            });
    });

    it('should match the baseline repeater component screenshot when all items are collapsed', function () {
        return createBrowserResult(true)
            .compareScreenshot({
                screenshotName: 'repeaters_component_collapsed',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            });
    });

    it('should match the baseline repeater component screenshot when an item is expanded', function () {
        return createBrowserResult(true)
            .click('.bb-repeater-item-header:nth-Child(1)')
            .compareScreenshot({
                screenshotName: 'repeaters_component_expanded',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            });
    });

    it('should match the baseline repeater component screenshot when an item is expanded and no context menu exists', function () {
        return createBrowserResult(true)
            .click('#screenshot-repeaters-hide-context-menu')
            .click('.bb-repeater-item-header:nth-Child(1)')
            .compareScreenshot({
                screenshotName: 'repeaters_component_expanded_no_context_menu',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            });
    });

    it('should match the baseline repeater component screenshot when no title exists', function () {
        return createBrowserResult(true)
            .click('#screenshot-repeaters-expand-mode-none')
            .click('#screenshot-repeaters-hide-title')
            .compareScreenshot({
                screenshotName: 'repeaters_component_expanded_no_title',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            });
    });
    
    it('should match the baseline repeater component screenshot when no checkbox exists', function () {
        return createBrowserResult(true)
            .click('#screenshot-repeaters-hide-checkbox')
            .compareScreenshot({
                screenshotName: 'repeaters_component_expanded_no_checkbox',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            });
    });

    it('should match the baseline repeater component screenshot when expand mode is "none"', function () {
        return createBrowserResult(true)
            .click('#screenshot-repeaters-expand-mode-none')
            .compareScreenshot({
                screenshotName: 'repeaters_component_expanded_no_expand',
                selector: '#screenshot-repeaters-component-full',
                checkAccessibility: true
            });
    });
});
