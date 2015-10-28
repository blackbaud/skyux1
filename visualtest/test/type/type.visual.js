/*global phantom */
(function () {
    'use strict';

    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;

    casper.thenOpen(phantom.rootUrl + 'type/fixtures/test.full.html')
        .then(function () {
            casper.then(function () {
                phantomcss.screenshot('#screenshot-type .bb-text-block', 'text block');
            });
        });
}());
