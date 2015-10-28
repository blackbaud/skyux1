/*global phantom */
(function () {
    'use strict';

    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;

    casper.thenOpen(phantom.rootUrl + 'headers/fixtures/test.full.html')
        .then(function () {
            casper.then(function () {
                phantomcss.screenshot('#screenshot-headers', 'header state');
            });
        });
}());
