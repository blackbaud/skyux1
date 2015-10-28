/*global phantom */

(function () {
    'use strict';
  
    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;
    
    casper.thenOpen(phantom.rootUrl + 'searchfield/fixtures/test.full.html')
        .then(function () {
            phantomcss.screenshot('#screenshot-searchfield-single', 'search field single');
        })
        .then(function () {
            casper.click('#screenshot-searchfield-single .ui-select-toggle');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-searchfield-single', 'search field single (active)');
        })
        .then(function () {
            casper.mouse.move('#screenshot-searchfield-single-choices .ui-select-choices-row-inner');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-searchfield-single-choices', 'search field single drop-down');
        })
        .then(function () {
            casper.click('#screenshot-searchfield-single-choices .ui-select-choices-row-inner');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-searchfield-multiple', 'search field multiple');
        })
        .then(function () {
            casper.click('#screenshot-searchfield-multiple .ui-select-search');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-searchfield-multiple', 'search field multiple (active)');
        })
        .then(function () {
            casper.mouse.move('#screenshot-searchfield-multiple-choices .ui-select-choices-row-inner');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-searchfield-multiple-choices', 'search field multiple drop-down');
        })
        .then(function () {
            casper.click('#screenshot-searchfield-multiple-choices .ui-select-choices-row-inner');
        })
        .then(function () {
            phantomcss.screenshot('.ui-select-match-item', 'search field multiple item');
        })
        .then(function () {
            casper.mouse.move('.ui-select-match-item .ui-select-match-close');
        })
        .then(function () {
            phantomcss.screenshot('.ui-select-match-item', 'search field multiple item (close button hover)');
        });
}());
