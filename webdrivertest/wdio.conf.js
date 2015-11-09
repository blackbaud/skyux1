/* global console, exports, process */

(function () {
    'use strict';
    exports.config = {
        user: process.env.BROWSER_STACK_USERNAME,
        key: process.env.BROWSER_STACK_ACCESS_KEY,
        specs: [
            'webdrivertest/test/**/*.visual.js'
        ],
        capabilities: [
            {
                browserName: 'chrome',
                'browserstack.local': 'true',
                platform: 'WIN8',
                browserDisconnectTimeout: 3e5,
                browserDisconnectTolerance: 3,
                browserNoActivityTimeout: 3e5,
                captureTimeout: 3e5,
                build: 'chrome-webdriver-' + process.env.TRAVIS_BUILD_NUMBER
            },
            {
                browserName: 'firefox',
                'browserstack.local': 'true',
                platform: 'WIN8',
                browserDisconnectTimeout: 3e5,
                browserDisconnectTolerance: 3,
                browserNoActivityTimeout: 3e5,
                captureTimeout: 3e5,
                build: 'firefox-webdriver-' + process.env.TRAVIS_BUILD_NUMBER
            }
        ],
        host: 'hub.browserstack.com',
        port: 80,
        logLevel: 'silent',
        baseUrl: 'http://localhost:8000/webdrivertest/test',
        plugins: {
            webdrivercss: {
                screenshotRoot: 'screenshots',
                failedComparisonsRoot: 'screenshot-diffs',
                mismatchTolerance: 0.05,
                screenWidth: [1280]
            }
        },
        framework: 'jasmine',
        jasmineNodeOpts: {
            defaultTimeoutInterval: 85000,
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

}());
