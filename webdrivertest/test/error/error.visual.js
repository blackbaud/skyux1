/*jshint jasmine: true */
/*global browser */

describe('error', function () {
    'use strict';

    it('should match the custom baseline error image', function () {
        return browser
            .setupTest('/error/fixtures/test.full.html')
            .selectByValue('#select-error-type', 'custom')
            .compareScreenshot({
                screenshotName: 'error',
                selector: '#screenshot-error',
                checkAccessibility: true
            });
    });

    describe('types', function () {

        it('should match the baseline error broken image', function () {
            return browser
                .setupTest('/error/fixtures/test.full.html')
                .selectByValue('#select-error-type', 'broken')
                .compareScreenshot({
                    screenshotName: 'error_broken',
                    selector: '#screenshot-error-type',
                    checkAccessibility: true
                });
        });

        it('should match the baseline error construction image', function () {
            return browser
                .setupTest('/error/fixtures/test.full.html')
                .selectByValue('#select-error-type', 'construction')
                .compareScreenshot({
                    screenshotName: 'error_construction',
                    selector: '#screenshot-error-type',
                    checkAccessibility: true
                });
        });

        it('should match the baseline error notFound image', function () {
            return browser
                .setupTest('/error/fixtures/test.full.html')
                .selectByValue('#select-error-type', 'notFound')
                .compareScreenshot({
                    screenshotName: 'error_notfound',
                    selector: '#screenshot-error-type',
                    checkAccessibility: true
                });
        });

    });

    describe('modal', function () {
        it('should match the baseline error modal image', function () {
            return browser
                .setupTest('/error/fixtures/test.full.html')
                .click('#screenshot-error-show-modal')
                .pause(1000)
                .compareScreenshot({
                    screenshotName: 'error_modal',
                    selector: '.modal-dialog',
                    checkAccessibility: true
                });
        });
    });

});
