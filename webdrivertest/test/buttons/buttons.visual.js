/*global describe, it, browser */

describe('buttons', function () {
    'use strict';

    it('should match the baseline buttons screenshot', function () {
        return browser
            .setupTest('/buttons/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'buttons',
                selector: '#screenshot-buttons',
                checkAccessibility: true
            });
    });

    function getSelector(type, prefix) {
        var selector = (prefix !== undefined ? ('.' + prefix + '-') : '.') + 'btn-' + type;
        return selector;
    }

    function clickTest(type, prefix) {
        var selector = getSelector(type, prefix);

        return browser
            .setupTest('/buttons/fixtures/test.full.html')
            .click(selector)
            .compareScreenshot({
                screenshotName: ('button_' + type + '_click'),
                selector: ('#screenshots-buttons-' + type),
                checkAccessibility: true
            });
    }

    it('should match the baseline screenshot while clicking a default button', function () {
        return clickTest('default');
    });

    it('should match the baseline screenshot while clicking a primary button', function () {
        return clickTest('primary');
    });

    it('should match the baseline screenshot while clicking a secondary button', function () {
        return clickTest('secondary', 'bb');
    });

    it('should match the baseline screenshot while clicking a success button', function () {
        return clickTest('success');
    });

    it('should match the baseline screenshot while clicking an info button', function () {
        return clickTest('info');
    });

    it('should match the baseline screenshot while clicking a warning button', function () {
        return clickTest('warning');
    });

    it('should match the baseline screenshot while clicking a danger button', function () {
        return clickTest('danger');
    });

    it('should match the baseline screenshot while clicking a link button', function () {
        return clickTest('link');
    });

});
