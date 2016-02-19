/*jshint jasmine: true */
/*global browser, require */

describe('error', function () {
    'use strict';

    var common,
        options = {};

    beforeEach(function (done) {
        common = require('../common');

        common.initWebdriverCss(browser, options, done);
    });


    it('should match the baseline image', function (done) {
        var result = browser.url('/error/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: 'error',
            selector: '#screenshot-error',
            done: done
        });
    });

    describe('modal', function () {
        it('should match the baseline image', function (done) {
            var result = browser
                .url('/error/fixtures/test.full.html')
                .click('#screenshot-error-show-modal');

            common.compareScreenshot({
                browserResult: result,
                prefix: options.prefix,
                screenshotName: 'error_modal',
                selector: '.modal-dialog',
                done: done
            });
        });
    });

});
