/*global phantom */

(function () {
    'use strict';
    
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'pagination/fixtures/test.full.html')
    .then(function () {
        casper.then(function () {
            phantomcss.screenshot('#screenshot-pagination', 'pagination-state');
        })
        .then(function () {
            casper.mouse.move('#screenshot-pagination li:nth-child(3) a');
            phantomcss.screenshot('#screenshot-pagination', 'pagination-hover-state');
        })
        .then(function () {
            casper.click("#screenshot-pagination li:nth-child(3) a");
            phantomcss.screenshot('#screenshot-pagination', 'pagination-changed-state');
        });
    });
    
}());