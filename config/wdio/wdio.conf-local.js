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

    config.maxInstances = 1;

    config.visualRegression = require('../../webdrivertest/test/common.js').getVisualRegression('webdriver-screenshotslocal', 
                                                                                                'webdriver-screenshotslocal-screen', 
                                                                                                'webdriver-screenshotslocal-diffs');

    exports.config = config;
}());
