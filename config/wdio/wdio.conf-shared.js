/* jshint node: true */
/* global browser */
'use strict';

/**
 * WebDriver configuration options shared between CI and local versions.
 */

var common = require('../../webdrivertest/test/common.js');

module.exports = {
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
    waitforTimeout: 3000,
    onPrepare: function () {
        console.log('preparing tests');
    },
    before: function () {
        console.log('before test run');
        browser.addCommand('setupTest', function async(url, screenWidth) {
            return common.setupTest(this, url, screenWidth); 
        });
    },
    after: function () {
        console.log('after test run');
    },
    onComplete: function () {
        console.log('tests complete');
    }
};
