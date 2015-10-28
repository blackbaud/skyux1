
/*global phantom */

(function () {
    'use strict';

    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;

    function captureStates(name) {
        return function () {
            var labelSelector = '.label-' + name;

            casper.then(function () {
                phantomcss.screenshot(labelSelector, 'label ' + name);
            });
        };
    }

    casper.thenOpen(phantom.rootUrl + 'labels/fixtures/test.full.html')
        .then(captureStates('default'))
        .then(captureStates('primary'))
        .then(captureStates('success'))
        .then(captureStates('info'))
        .then(captureStates('warning'))
        .then(captureStates('danger'));
}());
