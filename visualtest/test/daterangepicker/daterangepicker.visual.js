/*global phantom */

(function () {
    'use strict';
    
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'daterangepicker/fixtures/test.full.html')
    .then(function () {
        phantomcss.screenshot('#screenshot-daterangepicker', 'date range picker states');
    });
}());