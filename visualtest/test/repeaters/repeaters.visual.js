/*global phantom */

(function () {
    'use strict';
  
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'repeaters/fixtures/test.full.html')
        .then(function () {
            phantomcss.screenshot('#screenshot-repeater', 'repeater');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-repeater-tile', 'repeater in tile');
        });
}());
