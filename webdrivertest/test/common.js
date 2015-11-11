/* global module */
(function () {
    'use strict';
    var createScreenshotPrefix = function (browser, screenshot_prefix, done) {
        browser.session().then(function (res) {
            var browserName = res.value.browserName.replace(/\s+/g, ''),
                platform = res.value.platform;
            screenshot_prefix.value =  res.value.platform + '_' + browserName + '_';

            if (platform === "WINDOWS") {
                screenshot_prefix.value += res.value.version;
            }

        }).call(done);
    };

    module.exports.createScreenshotPrefix = createScreenshotPrefix;
}());
