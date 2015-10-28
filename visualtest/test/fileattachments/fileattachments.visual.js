/*global phantom */

(function () {
    'use strict';
    
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'fileattachments/fixtures/test.full.html')
    .then(function () {
        casper.then(function () {
            phantomcss.screenshot('#screenshot-file-upload', 'file upload state');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-file-delete', 'file delete state'); 
        });
    });
}());