/* global console, exports, process */

(function () {
    'use strict';

    var capabilities = [
        {
            browser: 'chrome',
            'browserstack.local': 'true',
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
            os: 'OS X',
            os_version: 'Yosemite',
            browserDisconnectTimeout: 3e5,
            browserDisconnectTolerance: 3,
            browserNoActivityTimeout: 3e5,
            captureTimeout: 3e5,
            build: 'mac-firefox-webdriver-' + process.env.TRAVIS_BUILD_NUMBER
        }/*,
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
            build: 'win81-ie11-webdriver-' + process.env.TRAVIS_BUILD_NUMBER
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
            build: 'win8-ie10-webdriver-' + process.env.TRAVIS_BUILD_NUMBER
        }*/
    ],
    config = {

        specs: [
            'webdrivertest/test/**/*.visual.js'
        ],
        logLevel: 'silent',
        baseUrl: 'http://localhost:8000/webdrivertest/test',
        framework: 'jasmine',
        jasmineNodeOpts: {
            defaultTimeoutInterval: 200000,
            expectationResultHandler: function () {
            }
        },
        onPrepare: function () {
            console.log('preparing tests');
        },
        before: function () {
            console.log('before test run');
        },
        after: function () {
            console.log('after test run');
        },
        onComplete: function () {
            console.log('tests complete');
        }

    };

    if (process.env.TRAVIS) {
        config.user = process.env.BROWSER_STACK_USERNAME;
        config.key = process.env.BROWSER_STACK_ACCESS_KEY;
        config.capabilities = capabilities;
        config.host = 'hub.browserstack.com';
        config.port = 80;
        exports.environment = '';
    } else {
        config.capabilities = [
            {
                browserName: 'chrome'
            }
        ];
        exports.environment = 'local';
    }

    exports.config = config;

}());
