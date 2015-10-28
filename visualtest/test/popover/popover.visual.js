/*global phantom */

(function () {
    'use strict';
    
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'popover/fixtures/test.full.html')
    .then(function () {
        casper.then(function () {
            casper.click('#screenshot-popover-title a');
            phantomcss.screenshot('#screenshot-popover-title', 'popover title state');
        })
        .then(function () {
            casper.click('#screenshot-popover-no-title a');
            phantomcss.screenshot('#screenshot-popover-no-title', 'popover no title state');
        })
        .then(function () {
            casper.click('#screenshot-popover-top button');
            phantomcss.screenshot('#screenshot-popover-top', 'popover top state');
        })
        .then(function () {
            casper.click('#screenshot-popover-bottom button');
            phantomcss.screenshot('#screenshot-popover-bottom', 'popover bottom state');
        })
        .then(function () {
            casper.click('#screenshot-popover-left button');
            phantomcss.screenshot('#screenshot-popover-left', 'popover left state');
        })
        .then(function () {
            casper.click('#screenshot-popover-right button');
            phantomcss.screenshot('#screenshot-popover-right', 'popover right state');
        }); 
    });
}());