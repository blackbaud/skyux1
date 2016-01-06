
/*global describe, it, browser, beforeEach, expect, require */

describe('buttons', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });

    it('should take the button screenshots', function (done) {
        var screenshotName = 'buttons',
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/buttons/fixtures/test.full.html')
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-buttons'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .call(done);
    });

    function getSelector(type, prefix) {
        var selector = (prefix !== undefined ? ('.' + prefix + '-') : '.') + 'btn-' + type;
        return selector;
    }

    function clickTest(type, done, prefix) {
        var screenshotName = 'button_' + type + '_click',
            selector = getSelector(type, prefix),
            pageName = options.prefix + screenshotName + '_full';
        browser
            .url('/buttons/fixtures/test.full.html')
            .click(selector)
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: ('#screenshots-buttons-' + type)
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .call(done);
    }

    it('should take the button default click test', function (done) {
        clickTest('default', done);
    });

    it('should take the button primary click test', function (done) {
        clickTest('primary', done);
    });

    it('should take the button secondary click test', function (done) {
        clickTest('secondary', done, 'bb');
    });

    it('should take the button success click test', function (done) {
        clickTest('success', done);
    });

    it('should take the button info click test', function (done) {
        clickTest('info', done);
    });

    it('should take the button warning click test', function (done) {
        clickTest('warning', done);
    });

    it('should take the button danger click test', function (done) {
        clickTest('danger', done);
    });

    it('should take the button link click test', function (done) {
        clickTest('link', done);
    });

});
