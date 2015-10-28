/*global phantom */

(function () {
    'use strict';
  
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'toast/fixtures/test.full.html')
        .then(function () {
            casper.click('#screenshot-toast-open');
        })
        .then(function () {
            phantomcss.screenshot('#toast-container', 'toast');
        })
        .then(function () {
            casper.mouse.move('#toast-container');
        })
        .then(function () {
            phantomcss.screenshot('#toast-container', 'toast (mouse over)');
        })
        .then(function () {
            casper.mouse.move('#toast-container .toast-close-button');
        })
        .then(function () {
            phantomcss.screenshot('#toast-container', 'toast (mouse over close)');
        });
}());
