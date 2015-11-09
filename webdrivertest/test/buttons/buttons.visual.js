
/*global describe, it, browser, expect */

describe('buttons', function () {
    'use strict';

    it('should take the button default screenshots', function (done) {
        var screenshotName = this.screenshot_prefix + 'button_default';
        browser
            .url('/buttons/fixtures/test.full.html')
            .webdrivercss('button-default', [
                {
                    name: screenshotName,
                    elem: '#screenshots-buttons-default'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });

    it('should take the button default hover test', function (done) {
        var screenshotName = this.screenshot_prefix + 'button_default_hover';
        browser
            .url('/buttons/fixtures/test.full.html')
            .moveToObject('.btn-default')
            .webdrivercss('button_default_hover', [
                {
                    name: screenshotName,
                    elem: '#screenshots-buttons-default'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .call(done);
    });




});
/*(function () {
    'use strict';

    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;

    function captureStates(name, prefix) {
        return function () {
            var btnSelector = '.' + (prefix ? prefix + '-' : '') + 'btn-' + name,
                divSelector = '#screenshots-buttons-' + name;

            casper.then(function () {
                phantomcss.screenshot(divSelector, 'button ' + name);
            })
            .then(function () {
                casper.mouse.move(btnSelector);
                phantomcss.screenshot(divSelector, 'button ' + name + ' (hover)');
            })
            .then(function () {
                casper.mouse.down(btnSelector);
                phantomcss.screenshot(divSelector, 'button ' + name + ' (active)');
            });
        };
    }

    casper.thenOpen(phantom.rootUrl + 'buttons/fixtures/test.full.html')
        .then(captureStates('default'))
        .then(captureStates('primary'))
        .then(captureStates('secondary', 'bb'))
        .then(captureStates('success'))
        .then(captureStates('info'))
        .then(captureStates('warning'))
        .then(captureStates('danger'))
        .then(captureStates('link'));
}());*/
