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
            build: 'mac-chrome-webdriver-' + process.env.TRAVIS_BUILD_NUMBER,
            resolution: '1280x960'
        },
        {
            browserName: 'firefox',
            browser_version: '47',
            'browserstack.local': 'true',
            'browserstack.debug': 'true',
            os: 'OS X',
            os_version: 'Yosemite',
            browserDisconnectTimeout: 3e5,
            browserDisconnectTolerance: 3,
            browserNoActivityTimeout: 3e5,
            captureTimeout: 3e5,
            build: 'mac-firefox-webdriver-' + process.env.TRAVIS_BUILD_NUMBER,
            resolution: '1280x960'
        }
    ];

    shared.maxInstances = 10;
    shared.host = 'hub-cloud-us.browserstack.com';
    shared.port = 80;

    shared.visualRegression = require('../../webdrivertest/test/common.js').getVisualRegression('webdriver-screenshots', 
                                                                                                'webdriver-screenshots-screen', 
                                                                                                'webdriver-screenshots-diffs');
    exports.config = shared;

}());
