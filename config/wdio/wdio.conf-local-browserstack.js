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
            build: 'mac-chrome-webdriver-local'
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
            build: 'mac-firefox-webdriver-local'
        },
        {
            'browserstack.local': 'true',
            browserDisconnectTimeout: 3e5,
            browserDisconnectTolerance: 3,
            browserNoActivityTimeout: 3e5,
            captureTimeout: 3e5,
            browser: 'ie',
            browser_version: '11.0',
            'browserstack.ie.driver': '2.48',
            os: 'Windows',
            os_version: '8.1',
            build: 'win81-ie11-webdriver-local'
        },
        {
            'browserstack.local': 'true',
            browserDisconnectTimeout: 3e5,
            browserDisconnectTolerance: 3,
            browserNoActivityTimeout: 3e5,
            captureTimeout: 3e5,
            browser: 'ie',
            browser_version: '10.0',
            'browserstack.ie.driver': '2.48',
            os: 'Windows',
            os_version: '8',
            build: 'win8-ie10-webdriver-local'
        }
    ];
    shared.host = 'hub-cloud.browserstack.com';
    shared.port = 80;
    shared.plugins = {
        webdrivercss: {
            screenshotRoot: 'webdriver-screenshotslocal',
            failedComparisonsRoot: 'webdriver-screenshotslocal-diffs',
            mismatchTolerance: 0.05,
            screenWidth: [1280]
        }
    };

    exports.config = shared;

}());
