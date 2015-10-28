/*global phantom */

(function () {
    'use strict';

    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'contextmenu/fixtures/test.full.html')
    .then(function () {
        casper.then(function () {
            phantomcss.screenshot('#screenshot-contextmenu', 'context menu closed');
        })
        .then(function () {
            casper.click('#screenshot-contextmenu button.bb-context-menu-btn');
            phantomcss.screenshot('#screenshot-contextmenu', 'context menu open');
        })
        .then(function () {
            casper.click('#screenshot-submenu button.bb-context-menu-btn');
            phantomcss.screenshot('#screenshot-submenu', 'submenu collapsed');
        })
        .then(function () {
            casper.click('#screenshot-submenu .bb-submenu .panel-title .accordion-toggle > span > div');
            phantomcss.screenshot('#screenshot-submenu', 'submenu expanded');
        });
    });
}());
