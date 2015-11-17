/* global console, exports */

(function () {
    'use strict';
    exports.config = {
        specs: [
            'webdrivertest/test/toast/toast.visual.js'
        ],
        logLevel: 'verbose',
        baseUrl: 'http://localhost:8000/webdrivertest/test',
        capabilities: [
            {
                browserName: 'chrome'
            }
        ],
        plugins: {
            webdrivercss: {
                screenshotRoot: 'screenshots-local',
                failedComparisonsRoot: 'screenshot-local-diffs',
                mismatchTolerance: 0.05,
                screenWidth: [1280]
            }
        },
        framework: 'jasmine',
        jasmineNodeOpts: {
            defaultTimeoutInterval: 600000,
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
