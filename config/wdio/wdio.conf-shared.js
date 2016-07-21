/* jshint node: true */
/* global browser */
'use strict';

/**
 * WebDriver configuration options shared between CI and local versions.
 */



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
        var common = require('../../webdrivertest/test/common.js');
        console.log('before test run');
        
        browser.addCommand('setupTest', function async(url, screenWidth) {
            return common.setupTest(this, url, screenWidth); 
        });

        browser.addCommand('compareScreenshot', function async(options) {
            options.browserResult = this;
            return common.compareScreenshot(options);
        });

        browser.addCommand('moveCursorOffScreen', function async() {
            return common.moveCursorOffScreen(this);
        });

        browser.addCommand('focusElement', function async(selector) {
            return common.focusElement(this, selector);
        });
    },
    after: function () {
        console.log('after test run');
    },
    onComplete: function () {
        console.log('tests complete');
    }
};
