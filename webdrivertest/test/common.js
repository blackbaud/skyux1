/*jshint jasmine: true */
/* global module, axe, document, console */

(function () {
    'use strict';

    function getPrefix(browser) {
        var browserName = browser.desiredCapabilities.browserName,
            platform;

        if (browser.desiredCapabilities.os === 'OS X') {
            platform = 'MAC';
        } else {
            platform = 'WIN';
        }

        return platform + '_' + browserName;
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
            .getViewportSize('height').then(function (height) {
                return browser.setViewportSize({width: screenWidth, height: height});
            });
    }

    module.exports = {
        getPrefix: getPrefix,
        compareScreenshot: function (options) {
            
            return options.browserResult.getViewportSize('width').then(function (width) {
                var pageName,
                    widthString = '.' + width + 'px';

                pageName = options.prefix + '/' + options.prefix + '_' + options.screenshotName + '_full';
                options.screenshotName = options.screenshotName + widthString;
                
                return this.webdrivercss(pageName, [
                    {
                        name: options.screenshotName,
                        elem: options.selector,
                        screenWidth: options.screenWidth
                    }
                ], function (err, res) {
                    expect(err).toBe(undefined);
                    expect(res[options.screenshotName][0].isWithinMisMatchTolerance).toBe(true);
                })
                .then(function () {
                    if (options.checkAccessibility) {
                        return checkAccessibility(this, options);
                    } else {
                        return;
                    }
                });
            });
                
        },
        setupTest: setupTest,
        checkAccessibility: checkAccessibility,
        moveCursorOffScreen: function (browser) {
            return browser.moveToObject('body', 0, 0);
        },
        focusElement: function (browser, selector) {
            return browser.execute('document.querySelector("' + selector + '").focus()');
        }
    };
}());
