/* global module, require, console */
(function () {
    'use strict';
    var createScreenshotPrefix = function (browser, screenshot_prefix, done) {
        browser.session().then(function (res) {
            var browserName = res.value.browserName.replace(/\s+/g, ''),
                platform = res.value.platform;
            screenshot_prefix.value =  res.value.platform + '_' + browserName + '_';

            if (platform === "WINDOWS") {
                screenshot_prefix.value += (res.value.version + '_');
            }

        }).call(done);
    },
    initWebdriverCss = function (browser, done) {
        browser.session().then(function (res) {
            var browserName = res.value.browserName.replace(/\s+/g, ''),
                platform = res.value.platform,
                prefix,
                screenshotRoot;
            prefix =  res.value.platform + '_' + browserName;

            if (platform === "WINDOWS") {
                prefix.value += ('_' + res.value.version);
            }

            screenshotRoot = 'webdriver-screenshots-' + require('../wdio.conf.js').environment;

            require('webdrivercss').init(browser, {
                screenshotRoot: screenshotRoot + '/' + prefix,
                failedComparisonsRoot: screenshotRoot + '-diffs/' + prefix,
                mismatchTolerance: 0.05,
                screenWidth: [1280]
            });

        }).call(done);
    };

    module.exports.createScreenshotPrefix = createScreenshotPrefix;

    module.exports.initWebdriverCss = initWebdriverCss;
}());
