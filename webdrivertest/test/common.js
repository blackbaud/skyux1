/*jshint jasmine: true */
/* global module, require */

(function () {
    'use strict';
    var initWebdriverCss = function (browser, options) {
        var browserName = browser.desiredCapabilities.browserName,
            platform;

        if (browser.desiredCapabilities.os === 'OS X') {
            platform = 'MAC';
        }

        options.prefix = platform + '_' + browserName;

        /*browser.session().then(function (res) {
            var browserName = res.value.browserName.replace(/\s+/g, ''),
                platform = res.value.platform,
                prefix,
                screenshotRoot;
            prefix =  res.value.platform + '_' + browserName;

            if (platform === "WINDOWS") {
                prefix += ('_' + res.value.version);
            }
            options.prefix = prefix + '_';
            screenshotRoot = 'webdriver-screenshots' + require('../wdio.conf.js').environment;
            require('webdrivercss').init(browser, {
                screenshotRoot: screenshotRoot + '/' + prefix,
                failedComparisonsRoot: screenshotRoot + '-diffs/',
                mismatchTolerance: 0.05,
                screenWidth: [1280]
            });

        }).call(done);*/
    };

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
        initWebdriverCss: initWebdriverCss,
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
