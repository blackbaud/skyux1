/*jshint jasmine: true */
/*global browser, require */

describe('error', function () {
    'use strict';

    it('should match the custom baseline error image', function (done) {
        var common = require('../common');

        browser
            .setupTest('/error/fixtures/test.full.html')
            .selectByValue('#select-error-type', 'custom')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'error',
                selector: '#screenshot-error'
            })
            .call(done);
    });

    describe('types', function () {

        it('should match the baseline error broken image', function (done) {
            var common = require('../common');

            browser
                .setupTest('/error/fixtures/test.full.html')
                .selectByValue('#select-error-type', 'broken')
                .compareScreenshot({
                    prefix: common.getPrefix(browser),
                    screenshotName: 'error_broken',
                    selector: '#screenshot-error-type'
                })
                .call(done);
        });

        it('should match the baseline error construction image', function (done) {
            var common = require('../common');

            browser
                .setupTest('/error/fixtures/test.full.html')
                .selectByValue('#select-error-type', 'construction')
                .compareScreenshot({
                    prefix: common.getPrefix(browser),
                    screenshotName: 'error_construction',
                    selector: '#screenshot-error-type'
                })
                .call(done);
        });

        it('should match the baseline error notFound image', function (done) {
            var common = require('../common');

            browser
                .setupTest('/error/fixtures/test.full.html')
                .selectByValue('#select-error-type', 'notFound')
                .compareScreenshot({
                    prefix: common.getPrefix(browser),
                    screenshotName: 'error_notfound',
                    selector: '#screenshot-error-type'
                })
                .call(done);
        });

    });

    describe('modal', function () {
        it('should match the baseline error modal image', function (done) {
            var common = require('../common');

            browser
                .setupTest('/error/fixtures/test.full.html')
                .click('#screenshot-error-show-modal')
                .pause(1000)
                .compareScreenshot({
                    prefix: common.getPrefix(browser),
                    screenshotName: 'error_modal',
                    selector: '.modal-dialog'
                })
                .call(done);
        });
    });

});
