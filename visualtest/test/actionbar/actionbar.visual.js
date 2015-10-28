/*global phantom, console */

(function () {
    'use strict';
  
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'actionbar/fixtures/test.full.html')
        .then(function () {
            phantomcss.screenshot('#screenshot-actionbar', 'actionbar');
        });
}());