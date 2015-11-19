/* global module, require */
(function () {
    'use strict';
    var initWebdriverCss = function (browser, options, done) {
        browser.session().then(function (res) {
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
                failedComparisonsRoot: screenshotRoot + '-diffs/' + prefix,
                mismatchTolerance: 0.05,
                screenWidth: [1280]
            });

        }).call(done);
    };

    module.exports.initWebdriverCss = initWebdriverCss;
}());
