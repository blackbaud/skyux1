
/*global phantom */

(function () {
    'use strict';

    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;

    casper.thenOpen(phantom.rootUrl + 'badges/fixtures/test.full.html')
        .then(function () {
            phantomcss.screenshot('#screenshots-badge .badge:first-child', 'badge');
        })
        .then(function () {
            phantomcss.screenshot('#screenshots-badge .badge-primary', 'badge (primary)');
        })
        .then(function () {
            phantomcss.screenshot('#screenshots-badge .badge-success', 'badge (success)');
        })
        .then(function () {
            phantomcss.screenshot('#screenshots-badge .badge-warning', 'badge (warning)');
        })
        .then(function () {
            phantomcss.screenshot('#screenshots-badge .badge-danger', 'badge (danger)');
        })
        .then(function () {
            phantomcss.screenshot('#screenshots-badge .badge', 'badge');
        }).then(function () {
            phantomcss.screenshot('#screenshots-badge-in-button-primary .btn', 'badge in button (primary)');
        });
}());
