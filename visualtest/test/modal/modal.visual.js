/*global phantom */

(function () {
    'use strict';

    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;

    casper.thenOpen(phantom.rootUrl + 'modal/fixtures/test.full.html')
        .then(function () {
            phantomcss.screenshot('#screenshot-modal-tiles', 'modal with tiles');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-modal-help-key .modal-header', 'modal header with helpkey');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-modal-no-help-key .modal-header', 'modal header with no helpkey');
        });
}());
