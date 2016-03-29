/*jshint node: true */
'use strict';

/**
 * WebDriver configuration options shared between CI and local versions.
 */
module.exports = {
    specs: [
        'webdrivertest/test/**/actionbar.visual.js'
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
