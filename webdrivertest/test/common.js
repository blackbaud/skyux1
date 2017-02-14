/*jshint jasmine: true */
/* global module, axe, document, require, console, process */

(function () {
    'use strict';

    function getPrefix(capabilities) {
        var browserName = capabilities.browserName,
            platform;

        if (capabilities.os === 'OS X') {
            platform = 'MAC';
        } else {
            platform = 'WIN';
        }

        return platform + '_' + browserName;
    }

    function getScreenshotName(basePath) {
        var path = require('path');
            
        return function (context) {
            var prefix = getPrefix(context.desiredCapabilities),
                screenshotName = context.options.screenshotName;

            screenshotName = prefix + '_' + screenshotName + '.baseline.png';
            
            return path.join(basePath, prefix, screenshotName);
        };
    }

    function getVisualRegression(referenceFolder, screenshotFolder, diffsFolder) {
        var path = require('path'),
            VisualRegressionCompare = require('wdio-visual-regression-service/compare');
        return {
            compare: new VisualRegressionCompare.LocalCompare({
                referenceName: getScreenshotName(path.join(process.cwd(), referenceFolder)),
                screenshotName: getScreenshotName(path.join(process.cwd(), screenshotFolder)),
                diffName: getScreenshotName(path.join(process.cwd(), diffsFolder)),
                misMatchTolerance: 0.05
            }),
            viewportChangePause: 300
        };
    }

    function logError(message) {
        console.log('\x1b[31m', message);
    }

    function checkAccessibility(browser, options) {
        return browser.executeAsync(function (done) {
            axe.a11yCheck(
                document,
                {
                    "rules": {
                        "bypass": { enabled: false },
                        "color-contrast": { enabled: false }
                    }
                },
                function (results) {
                    done(results);
                });
        }).then(function (ret) {
            var i,
                j,
                violation;
            if (ret.value.violations && ret.value.violations.length !== 0) {
                logError('\nThe following accessibility issues exist in ' + options.screenshotName + ': \n');
                for (i = 0; i < ret.value.violations.length; i++) {
                    violation = ret.value.violations[i];
                    logError(violation.help);
                    logError('violation at: ');
                    for (j = 0; j < violation.nodes.length; j++) {
                        logError(violation.nodes[j].target);
                    }
                    logError('See: ' + violation.helpUrl + '\n');
                }
                expect(ret.value.violations.length).toBe(0, ' number of accessiblity violations');
            }
            return;
        });
    }

    function setupTest(browser, url, screenWidth) {
        if (!screenWidth) {
            screenWidth = 1280;
        }
        return browser.url(url)
            .getViewportSize().then(function (size) {
                if (size.width !== screenWidth) {
                    return browser.setViewportSize({width: screenWidth, height: size.height});
                } else {
                    return;
                }
            });
    }

    function checkVisualResult(results, options, browser) {
        results.forEach(function (element) {
            console.log('checking element:', element);
            console.log('isExactSameImage: ', element.isExactSameImage);
            expect(element.isWithinMisMatchTolerance).toBe(true);
        });
        if (options.checkAccessibility) {
            return checkAccessibility(browser, options);
        } else {
            return;
        }
    }

    function getViewSizeHandler(width, browser, options) {
        var widthString = '.' + width + 'px';

        options.screenshotName = options.screenshotName + '_full' + '.' + options.screenshotName + widthString;

        return browser.checkElement(options.selector, {screenshotName: options.screenshotName}).then(function (results) {
            return checkVisualResult(results, options, this);
        });
        
    }

    module.exports = {
        compareScreenshot: function (options) { 
            return options.browserResult.getViewportSize('width').then(function (width) {
                return getViewSizeHandler(width, this, options);
            });  
        },
        setupTest: setupTest,
        getVisualRegression: getVisualRegression,
        checkAccessibility: checkAccessibility,
        moveCursorOffScreen: function (browser) {
            return browser.moveToObject('body', 0, 0);
        },
        focusElement: function (browser, selector) {
            return browser.execute('document.querySelector("' + selector + '").focus()');
        }
    };
})();