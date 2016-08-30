/* global describe, it, browser, require */


describe('Avatar', function () {
    'use strict';

    function takeScreenshot(type) {
        return browser
            .setupTest('/avatar/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: ('avatar_' + type),
                selector: ('#screenshot-avatar-' + type),
                checkAccessibility: true
            });
    }

    it('should match previous avatar screenshot where image is available', function () {
        return takeScreenshot('image');
    });

    it('should match previous avatar screenshot where image is not available', function () {
        return takeScreenshot('placeholder');
    });

    it('should match previous avatarscreenshot where image is not available and the name has only one initial', function () {
        return takeScreenshot('placeholder-one-initial');
    });
});
