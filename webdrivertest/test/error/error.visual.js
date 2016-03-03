/*jshint jasmine: true */
/*global browser, require */

describe('error', function () {
    'use strict';

    it('should match the baseline error image', function (done) {
        var result = browser.url('/error/fixtures/test.full.html'),
            common = require('../common');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'error',
            selector: '#screenshot-error',
            done: done
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
                done: done
            });
        });
    });

});
