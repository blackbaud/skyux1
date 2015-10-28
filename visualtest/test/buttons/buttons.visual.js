
/*global phantom */

(function () {
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
}());
