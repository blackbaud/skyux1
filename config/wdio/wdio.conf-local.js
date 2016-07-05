/* global require, exports, process */

(function () {
    'use strict';
    var os,
    config;
    
    if (process.platform === 'win32') {
        os = 'WIN';
    } else {
        os = 'OS X';
    }

    // Load our shared config
    config = require('./wdio.conf-shared.js');

    config.capabilities = [
        {
            browserName: 'chrome',
            os: os
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
