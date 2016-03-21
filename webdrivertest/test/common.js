/*jshint jasmine: true */
/* global module */

(function () {
    'use strict';

    function getPrefix(browser) {
        var browserName = browser.desiredCapabilities.browserName,
            platform;

        if (browser.desiredCapabilities.os === 'OS X') {
            platform = 'MAC';
        }

        return platform + '_' + browserName;
    }

    module.exports = {
        getPrefix: getPrefix,
        compareScreenshot: function (options) {
            var pageName = options.prefix + '/' + options.prefix + '_' + options.screenshotName + '_full';

            options.browserResult
                .webdrivercss(pageName, [
                    {
                        name: options.screenshotName,
                        elem: options.selector,
                        screenWidth: options.screenWidth
                    }
                ], function (err, res) {
                    expect(err).toBe(undefined);
                    expect(res[options.screenshotName][0].isWithinMisMatchTolerance).toBe(true);
                }).call(options.done);
        },
        moveCursorOffScreen: function (browser) {
            return browser.moveToObject('body', 0, 0);
        }
    };
}());
