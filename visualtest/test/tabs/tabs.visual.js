/*global phantom */

(function () {
    'use strict';
  
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'tabs/fixtures/test.full.html')
        .then(function () {
            phantomcss.screenshot('#screenshot-tabs', 'tabs (tab 1 selected)');
        })
        .then(function () {
            casper.mouse.move('#screenshot-tab-2');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-tabs', 'tabs (tab 2 hover)');
        })
        .then(function () {
            casper.click('#screenshot-tab-2 a');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-tabs', 'tabs (tab 2 selected)');
        });
}());
