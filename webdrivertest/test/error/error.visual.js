/*jshint jasmine: true */
/*global browser, require */

describe('error', function () {
    'use strict';

    it('should match the custom baseline error image', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/error/fixtures/test.full.html')
                    .selectByValue('#select-error-type', 'custom');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'error',
            selector: '#screenshot-error',
            done: done,
            checkAccessibility: true
        });
    });

    describe('types', function () {

        it('should match the baseline error broken image', function (done) {
            var result,
                common = require('../common');

            result = browser.url('/error/fixtures/test.full.html')
                        .selectByValue('#select-error-type', 'broken');

            common.compareScreenshot({
                browserResult: result,
                prefix: common.getPrefix(browser),
                screenshotName: 'error_broken',
                selector: '#screenshot-error-type',
                done: done,
                checkAccessibility: true
            });
        });

        it('should match the baseline error construction image', function (done) {
            var result,
                common = require('../common');

            result = browser.url('/error/fixtures/test.full.html')
                        .selectByValue('#select-error-type', 'construction');

            common.compareScreenshot({
                browserResult: result,
                prefix: common.getPrefix(browser),
                screenshotName: 'error_construction',
                selector: '#screenshot-error-type',
                done: done,
                checkAccessibility: true
            });
        });

        it('should match the baseline error notFound image', function (done) {
            var result,
                common = require('../common');

            result = browser.url('/error/fixtures/test.full.html')
                        .selectByValue('#select-error-type', 'notFound');

            common.compareScreenshot({
                browserResult: result,
                prefix: common.getPrefix(browser),
                screenshotName: 'error_notfound',
                selector: '#screenshot-error-type',
                done: done,
                checkAccessibility: true
            });
        });

    });

    describe('modal', function () {
        it('should match the baseline error modal image', function (done) {
            var result = browser
                .url('/error/fixtures/test.full.html')
                .click('#screenshot-error-show-modal'),
                common = require('../common');

            common.compareScreenshot({
                browserResult: result,
                prefix: common.getPrefix(browser),
                screenshotName: 'error_modal',
                selector: '.modal-dialog',
                done: done,
                checkAccessibility: true
            });
        });
    });

});
