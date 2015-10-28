/*global phantom */

(function () {
    'use strict';

    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;

    function takeTileScreenshots(tileToTest) {
        var idSelector = '#screenshot-tile-' + tileToTest,
            prettyName = tileToTest.replace(/-/g, ' ');

        casper.then(function () {
            phantomcss.screenshot(idSelector, 'tile ' + prettyName + ' expanded');
        }).then(function () {
            casper.click(idSelector + ' .bb-tile-title');
        }).then(function () {
            phantomcss.screenshot(idSelector, 'tile ' + prettyName + ' collapsed');
        });
    }

    casper.thenOpen(phantom.rootUrl + 'tiles/fixtures/test.full.html')
        .then(function () {
            takeTileScreenshots('minimal');
            takeTileScreenshots('with-settings');
            takeTileScreenshots('with-header-content');
            takeTileScreenshots('with-header-check');
            takeTileScreenshots('with-settings-overflow');
            takeTileScreenshots('with-header-content-overflow');
            takeTileScreenshots('with-overflow-header-content-overflow');
            takeTileScreenshots('with-overflow-header-content');
        });
}());
