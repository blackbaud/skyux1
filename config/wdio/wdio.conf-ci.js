/* global require, exports, process */

(function () {
    'use strict';

    // Load our shared config
    var shared = require('./wdio.conf-shared.js');

    shared.user = process.env.BROWSER_STACK_USERNAME;
    shared.key = process.env.BROWSER_STACK_ACCESS_KEY;
    shared.capabilities = [
        {
            browserName: 'chrome',
            'browserstack.local': 'true',
            'browserstack.debug': 'true',
            os: 'OS X',
            os_version: 'Yosemite',
            browserDisconnectTimeout: 3e5,
            browserDisconnectTolerance: 3,
            browserNoActivityTimeout: 3e5,
            captureTimeout: 3e5,
            build: 'mac-chrome-webdriver-' + process.env.TRAVIS_BUILD_NUMBER
        },
        {
            browserName: 'firefox',
            'browserstack.local': 'true',
            'browserstack.debug': 'true',
            os: 'OS X',
            os_version: 'Yosemite',
            browserDisconnectTimeout: 3e5,
            browserDisconnectTolerance: 3,
            browserNoActivityTimeout: 3e5,
            captureTimeout: 3e5,
            build: 'mac-firefox-webdriver-' + process.env.TRAVIS_BUILD_NUMBER
        }
    ];
    shared.host = 'http://hub-cloud.browserstack.com';
    shared.port = 80;
    shared.plugins = {
        webdrivercss: {
            screenshotRoot: 'webdriver-screenshots',
            failedComparisonsRoot: 'webdriver-screenshots-diffs',
            mismatchTolerance: 0.05,
            screenWidth: [1280]
        }
    };

    exports.config = shared;

}());
