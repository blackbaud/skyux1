/*global describe, it, browser, require */

describe('repeaters', function () {
    'use strict';

    var common = require('../common');

    function createBrowserResult(switchToComponent) {
        var result = browser.url('/repeaters/fixtures/test.full.html');

        if (switchToComponent) {
            result = result.click('#screenshot-repeaters-switch-to-component');
        }

        return result;
    }

    it('should match the baseline repeater screenshot', function (done) {
        var result = createBrowserResult();

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'repeaters',
            selector: '#screenshot-repeaters-full',
            done: done
        });
    });

    it('should match the baseline repeater component screenshot when all items are collapsed', function (done) {
        var result = createBrowserResult(true);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'repeaters-component-collapsed',
            selector: '#screenshot-repeaters-component-full',
            done: done
        });
    });

    it('should match the baseline repeater component screenshot when an item is expanded', function (done) {
        var result = createBrowserResult(true)
            .click('.bb-repeater-item-header:nth-Child(1)');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'repeaters-component-expanded',
            selector: '#screenshot-repeaters-component-full',
            done: done
        });
    });

    it('should match the baseline repeater component screenshot when an item is expanded and no context menu exists', function (done) {
        var result = createBrowserResult(true)
            .click('#screenshot-repeaters-hide-context-menu')
            .click('.bb-repeater-item-header:nth-Child(1)');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'repeaters-component-expanded-no-context-menu',
            selector: '#screenshot-repeaters-component-full',
            done: done
        });
    });

    it('should match the baseline repeater component screenshot when no title exists', function (done) {
        var result = createBrowserResult(true)
            .click('#screenshot-repeaters-hide-title');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'repeaters-component-expanded-no-title',
            selector: '#screenshot-repeaters-component-full',
            done: done
        });
    });

    it('should match the baseline repeater component screenshot when expand mode is "none"', function (done) {
        var result = createBrowserResult(true)
            .click('#screenshot-repeaters-expand-mode-none');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'repeaters-component-expanded-no-expand',
            selector: '#screenshot-repeaters-component-full',
            done: done
        });
    });
});
