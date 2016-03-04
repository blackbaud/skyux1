/*global describe, it, browser, require */

describe('buttons', function () {
    'use strict';

    it('should match the baseline buttons screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/buttons/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'buttons',
            selector: '#screenshot-buttons',
            done: done
        });
    });

    function getSelector(type, prefix) {
        var selector = (prefix !== undefined ? ('.' + prefix + '-') : '.') + 'btn-' + type;
        return selector;
    }

    function clickTest(type, done, prefix) {
        var result,
            common = require('../common'),
            selector = getSelector(type, prefix);

        result = browser.url('/buttons/fixtures/test.full.html').
                    click(selector);

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: ('button_' + type + '_click'),
            selector: ('#screenshots-buttons-' + type),
            done: done
        });
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
