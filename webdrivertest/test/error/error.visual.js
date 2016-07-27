/*jshint jasmine: true */
/*global browser, require */

describe('error', function () {
    'use strict';

    it('should match the custom baseline error image', function (done) {

        browser
            .setupTest('/error/fixtures/test.full.html')
            .selectByValue('#select-error-type', 'custom')
            .compareScreenshot({
                screenshotName: 'error',
                selector: '#screenshot-error',
                checkAccessibility: true
            })
            .call(done);
    });

    describe('types', function () {

        it('should match the baseline error broken image', function (done) {
            browser
                .setupTest('/error/fixtures/test.full.html')
                .selectByValue('#select-error-type', 'broken')
                .compareScreenshot({
                    screenshotName: 'error_broken',
                    selector: '#screenshot-error-type',
                    checkAccessibility: true
                })
                .call(done);
        });

        it('should match the baseline error construction image', function (done) {
            browser
                .setupTest('/error/fixtures/test.full.html')
                .selectByValue('#select-error-type', 'construction')
                .compareScreenshot({
                    screenshotName: 'error_construction',
                    selector: '#screenshot-error-type',
                    checkAccessibility: true
                })
                .call(done);
        });

        it('should match the baseline error notFound image', function (done) {
            browser
                .setupTest('/error/fixtures/test.full.html')
                .selectByValue('#select-error-type', 'notFound')
                .compareScreenshot({
                    screenshotName: 'error_notfound',
                    selector: '#screenshot-error-type',
                    checkAccessibility: true
                })
                .call(done);
        });

    });

    describe('modal', function () {
        it('should match the baseline error modal image', function (done) {
            browser
                .setupTest('/error/fixtures/test.full.html')
                .click('#screenshot-error-show-modal')
                .pause(1000)
                .compareScreenshot({
                    screenshotName: 'error_modal',
                    selector: '.modal-dialog',
                    checkAccessibility: true
                })
                .call(done);
        });
    });

});
