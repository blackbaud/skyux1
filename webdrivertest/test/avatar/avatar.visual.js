/* global describe, it, browser, beforeEach, require */


describe('Avatar', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    function takeScreenshot(type, done) {
        var result;

        result = browser.url('/avatar/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: ('avatar_' + type),
            selector: ('#screenshot-avatar-' + type),
            done: done
        });
        
    }

    it('should match previous avatar screenshot where image is available', function (done) {
        takeScreenshot('image', done);
    });

    it('should match previous avatar screenshot where image is not available', function (done) {
        takeScreenshot('placeholder', done);
    });

    it('should match previous avatarscreenshot where image is not available and the name has only one initial', function (done) {
        takeScreenshot('placeholder-one-initial', done);
    });
});
