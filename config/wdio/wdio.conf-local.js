/* global require, exports, process */

(function () {
    'use strict';
    var os,
        config,
        path = require('path'),
        VisualRegressionCompare = require('wdio-visual-regression-service/compare'),
        common = require('../../webdrivertest/test/common.js');

    
    
    if (process.platform === 'win32') {
        os = 'WIN';
    } else {
        os = 'OS X';
    }

    // Load our shared config
    config = require('./wdio.conf-shared.js');

    config.capabilities = [
        {
            browserName: 'chrome',
            os: os
        }
    ];

    config.visualRegression = {
        compare: new VisualRegressionCompare.LocalCompare({
            referenceName: common.getScreenshotName(path.join(process.cwd(), 'webdriver-screenshotslocal')),
            screenshotName: common.getScreenshotName(path.join(process.cwd(), 'webdriver-screenshotslocal-screen')),
            diffName: common.getScreenshotName(path.join(process.cwd(), 'webdriver-screenshotslocal-diffs')),
            misMatchTolerance: 0.01
        }),
        viewportChangePause: 300
    };

    exports.config = config;
}());
