/*global phantom */

(function () {
    'use strict';
  
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'tooltip/fixtures/test.full.html')
        .then(function () {
            casper.click('#screenshots-tooltip-link');
        })
        .then(function () {
            phantomcss.screenshot('.tooltip', 'tooltip');
        });
}());
