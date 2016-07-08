/*global describe, it, browser, require */

describe('buttons', function () {
    'use strict';

    it('should match the baseline buttons screenshot', function (done) {
        var common = require('../common');

        browser
            .setupTest('/buttons/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'buttons',
                selector: '#screenshot-buttons',
                checkAccessibility: true
            })
            .call(done);
    });

    function getSelector(type, prefix) {
        var selector = (prefix !== undefined ? ('.' + prefix + '-') : '.') + 'btn-' + type;
        return selector;
    }

    function clickTest(type, done, prefix) {
        var common = require('../common'),
            selector = getSelector(type, prefix);

        browser
            .setupTest('/buttons/fixtures/test.full.html')
            .click(selector)
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: ('button_' + type + '_click'),
                selector: ('#screenshots-buttons-' + type),
                checkAccessibility: true
            })
            .call(done);
    }

    it('should match the baseline screenshot while clicking a default button', function (done) {
        clickTest('default', done);
    });

    it('should match the baseline screenshot while clicking a primary button', function (done) {
        clickTest('primary', done);
    });

    it('should match the baseline screenshot while clicking a secondary button', function (done) {
        clickTest('secondary', done, 'bb');
    });

    it('should match the baseline screenshot while clicking a success button', function (done) {
        clickTest('success', done);
    });

    it('should match the baseline screenshot while clicking an info button', function (done) {
        clickTest('info', done);
    });

    it('should match the baseline screenshot while clicking a warning button', function (done) {
        clickTest('warning', done);
    });

    it('should match the baseline screenshot while clicking a danger button', function (done) {
        clickTest('danger', done);
    });

    it('should match the baseline screenshot while clicking a link button', function (done) {
        clickTest('link', done);
    });

});
