/*global phantom */

(function () {
    'use strict';

    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;

    casper.thenOpen(phantom.rootUrl + 'tabset/fixtures/test.full.html')
        .then(function () {
            phantomcss.screenshot('#screenshot-tabset-open-add', 'tabset open add state');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-tabset-open', 'tabset open state');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-tabset-add', 'tabset add state');
        })
        .then(function () {
            casper.mouse.move('#screenshot-tabset-open-add li:nth-child(2) a');
            phantomcss.screenshot('#screenshot-tabset-open-add', 'tabset hover state');
        });
}());
