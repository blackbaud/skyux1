/* global console, exports, process */

(function () {
    'use strict';

    var config = {
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
        exports.environment = '';
        config.capabilities = [
            {
                browserName: 'chrome',
                platform: 'OS X 10.11',
                browserDisconnectTimeout: 3e5,
                browserDisconnectTolerance: 3,
                browserNoActivityTimeout: 3e5,
                captureTimeout: 3e5,
                build: 'mac-chrome-webdriver-' + process.env.TRAVIS_BUILD_NUMBER,
                'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
            },
            {
                browserName: 'firefox',
                platform: 'OS X 10.11',
                browserDisconnectTimeout: 3e5,
                browserDisconnectTolerance: 3,
                browserNoActivityTimeout: 3e5,
                captureTimeout: 3e5,
                build: 'mac-firefox-webdriver-' + process.env.TRAVIS_BUILD_NUMBER,
                'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER
            }
        ];
    } else {
        exports.environment = 'local';
        config.capabilities = [{
                browserName: 'chrome'
            }
        ];
    }

    exports.config = config;

}());
