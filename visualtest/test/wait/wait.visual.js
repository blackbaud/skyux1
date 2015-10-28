/*jshint browser: true */
/*global phantom */

(function () {
    'use strict';
  
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'wait/fixtures/test.full.html')
        .then(function () {
            // The wait indicator fades in, so wait until that's done.
            casper.wait(1000, function () {
                phantomcss.screenshot('#screenshot-wait', 'wait');
            });
        });
}());