/*global phantom */

(function () {
    'use strict';
  
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    function captureTextExpand(name, selector) {
        casper
            .then(function () {
                phantomcss.screenshot(selector, name + ' (collapsed)');
            })
            .then(function () {
                casper.click(selector + ' .bb-text-expand-see-more');
            })
            .then(function () {
                phantomcss.screenshot(selector, name + ' (expanded)');
            });
    }
    
    casper.thenOpen(phantom.rootUrl + 'textexpand/fixtures/test.full.html')
        .then(function () {
            captureTextExpand('text expand', '#screenshot-text-expand');
        })
        .then(function () {
            captureTextExpand('text expand with line break', '#screenshot-text-expand-line-break');
        })
        .then(function () {
            captureTextExpand('text expand repeater', '#screenshot-text-expand-repeater');
        });
}());
