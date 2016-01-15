/*jshint node: true */

/**
 * Karma configuration options when testing a push or pull request from a branch.
 * This file expects certain TRAVIS secure environment variables to be set.
 **/
module.exports = function (config) {
    'use strict';

    var base = 'BrowserStack',
        customLaunchers = {
            bs_windows_ie_11: {
                base: base,
                browser: 'ie',
                browser_version: '11.0',
                os: 'Windows',
                os_version: '8.1'
            },
            bs_windows_chrome_latest: {
                base: base,
                browser: 'chrome',
                os: 'Windows',
                os_version: '8.1'
            },
            bs_windows_firefox_latest: {
                base: base,
                browser: 'firefox',
                os: 'Windows',
                os_version: '8.1'
            },
            bs_osx_safari_latest: {
                base: base,
                browser: 'safari',
                os: 'OS X',
                os_version: 'Yosemite'
            },
            bs_osx_chrome_latest: {
                base: base,
                browser: 'chrome',
                os: 'OS X',
                os_version: 'Yosemite'
            },
            bs_osx_firefox_latest: {
                base: base,
                browser: 'firefox',
                os: 'OS X',
                os_version: 'Yosemite'
            },
            bs_android_samsung_galaxy_s5_4_4: {
                base: base,
                device: 'Samsung Galaxy S5',
                os: 'android',
                os_version: '4.4'
            }
        },
        shared = require('./karma.conf-shared.js');

    shared.files.push(
        'dist/js/locales/sky-locale-en-US.js',
        'dist/css/sky-bundle.css',
        {
            pattern: 'dist/css/fonts/*.*',
            included: false,
            served: true
        }
    );

    // Add new reporters
    shared.reporters.push('coveralls');

    // Coveralls needs lcov
    shared.coverageReporter.reporters.push({
        type: 'lcov',
        dir: 'coverage/'
    });

    config.set(shared);
    config.set({
        singleRun: true,
        customLaunchers: customLaunchers,
        browsers: Object.keys(customLaunchers),
        browserDisconnectTimeout: 3e5,
        browserDisconnectTolerance: 3,
        browserNoActivityTimeout: 3e5,
        captureTimeout: 3e5,
        browserStack: {
            port: 9876,
            pollingTimeout: 10000
        }
    });
};
