/*jshint jasmine: true */
/* global module, axe, document, require, console */

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
                testName = context.test.title,
                width = context.meta.width,
                screenshotName;

            screenshotName = prefix + '_' + testName + '_full' + '.' + testName + '.' + width + 'px' + '.baseline.png';
            
            return path.join(basePath, prefix, screenshotName);
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
                console.log('in get viewport size');
                if (size.width !== screenWidth) {
                    console.log('before return 1');
                    return browser.setViewportSize({width: screenWidth, height: size.height});
                } else {
                    console.log('before return 2');
                    return;
                }
            });
    }

    function getViewSizeHandler(width, browser, options) {
        var pageName,
                    prefix = getPrefix(browser.desiredCapabilities),
                    widthString = '.' + width + 'px';

        pageName = prefix + '/' + prefix + '_' + options.screenshotName + '_full';
        options.screenshotName = options.screenshotName + widthString;

        console.log('before check element');
        return browser.checkElement(options.selector, {widths: [width]}).then(function (results) {
            results.forEach(function (element) {
                console.log('checking elements');
                expect(element.isExactSameImage).toBe(true);
            });
            console.log('after check element');
            if (options.checkAccessibility) {
                return checkAccessibility(this, options);
            } else {
                return;
            }
        });
    }

    module.exports = {
        compareScreenshot: function (options) { 
            console.log('in compare screenshot');
            return options.browserResult.getViewportSize('width').then(function (width) {
                return getViewSizeHandler(width, this, options);
            });  
        },
        setupTest: setupTest,
        getScreenshotName: getScreenshotName,
        checkAccessibility: checkAccessibility,
        moveCursorOffScreen: function (browser) {
            return browser.moveToObject('body', 0, 0);
        },
        focusElement: function (browser, selector) {
            return browser.execute('document.querySelector("' + selector + '").focus()');
        }
    };
})();