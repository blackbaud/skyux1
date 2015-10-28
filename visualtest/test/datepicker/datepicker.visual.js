/*jshint browser: true */
/*global phantom */
(function () {
    'use strict';

    var casper = phantom.casper,
        phantomcss = phantom.phantomcss;

    casper.thenOpen(phantom.rootUrl + 'datepicker/fixtures/test.full.html')
    .then(function () {
        casper.then(function () {
            phantomcss.screenshot('#screenshot-datepicker', 'datepicker closed');
        })
        .then(function () {
            phantomcss.screenshot('#screenshot-datepicker-append-to-body', 'datepicker append closed');
        })
        .then(function () {
            casper.click('#screenshot-datepicker .bb-date-field-calendar-button');
        })
        .waitFor(function () {
            // It would be nice to factor this out since it's almost identical to a step below, but any attempt to move this
            // to a function that takes the text content as a parameter causes the test to hang as if closures are not a thing.
            return casper.evaluate(function () {
                return document.querySelectorAll('button[id^="datepicker-"][id$="-title"] strong')[0].textContent === 'May 2015';
            });
        }, function () {
            phantomcss.screenshot('#screenshot-datepicker', 'datepicker open');
        })
        .then(function () {
            casper.click('#screenshot-datepicker .bb-date-field-calendar-button');
        })
        .then(function () {
            casper.click('#screenshot-datepicker-append-to-body .bb-date-field-calendar-button');
        })
        .waitFor(function () {
            return casper.evaluate(function () {
                return document.querySelectorAll('button[id^="datepicker-"][id$="-title"] strong')[0].textContent === 'April 2015';
            });
        }, function () {
            phantomcss.screenshot('#screenshot-datepicker-append-to-body', 'datepicker append open');
        })
        .then(function () {
            casper.click('#screenshot-datepicker-append-to-body .bb-date-field-calendar-button');
        });
    });
}());
