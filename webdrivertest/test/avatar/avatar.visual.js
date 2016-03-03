/* global describe, it, browser, require */


describe('Avatar', function () {
    'use strict';

    function takeScreenshot(type, done) {
        var result,
            common = require('../common');

        result = browser.url('/avatar/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
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
