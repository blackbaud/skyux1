/* global require, exports */

(function () {
    'use strict';

    // Load our shared config
    var config = require('./wdio.conf-shared.js');

    config.capabilities = [
        {
            browserName: 'chrome',
            os: 'OS X'
        }
    ];

    config.plugins = {
        webdrivercss: {
            screenshotRoot: 'webdriver-screenshotslocal',
            failedComparisonsRoot: 'webdriver-screenshotslocal-diffs',
            mismatchTolerance: 0.05,
            screenWidth: [1280]
        }
    };

    exports.config = config;
}());
