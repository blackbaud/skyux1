/*jshint node: true */

/**
 * Karma configuration options when testing a push or pull request from a branch.
 * This file expects certain TRAVIS secure environment variables to be set.
 **/
module.exports = function (config) {
    'use strict';

    var base = 'SauceLabs',
        customLaunchers = {
            sl_windows_ie_11: {
                base: base,
                browserName: 'internet explorer',
                version: '11.0',
                platform: 'Windows 10'
            },
            sl_windows_edge: {
                base: base,
                browserName: 'internet explorer',
                version: '20',
                platform: 'Windows 10'
            },
            sl_windows_chrome_latest: {
                base: base,
                browserName: 'chrome',
                platform: 'Windows 8.1'
            },
            sl_windows_firefox_latest: {
                base: base,
                browserName: 'firefox',
                platform: 'Windows 8.1'
            },
            sl_osx_safari_latest: {
                base: base,
                browserName: 'safari',
                platform: 'OS X 10.11'
            },
            sl_osx_chrome_latest: {
                base: base,
                browserName: 'chrome',
                platform: 'OS X 10.11'
            },
            sl_osx_firefox_latest: {
                base: base,
                browserName: 'firefox',
                platform: 'OS X 10.11'
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
    shared.reporters.push('saucelabs');

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
        captureTimeout: 3e5
    });
};
