/*jshint jasmine: true */
/* global module, axe, document, console */

(function () {
    'use strict';

    function getPrefix(browser) {
        var browserName = browser.desiredCapabilities.browserName,
            platform;

        if (browser.desiredCapabilities.os === 'OS X') {
            platform = 'MAC';
        }

        return platform + '_' + browserName;
    }

    function logError(message) {
        console.log('\x1b[31m', message);
    }

    function checkAccessibility(options) {
        options.browserResult.executeAsync(function (done) {
            axe.a11yCheck(document, function (results) {
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
                expect(ret.value.violations.length).toBe(0, ' number of accesiblity violations');
            }
        }).call(options.done);
    }

    module.exports = {
        getPrefix: getPrefix,
        compareScreenshot: function (options) {
            var pageName = options.prefix + '/' + options.prefix + '_' + options.screenshotName + '_full';

            options.browserResult
                .webdrivercss(pageName, [
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
                        checkAccessibility(options);
                    } else {
                        options.done();
                    }
                });
        },
        checkAccessibility: checkAccessibility,
        moveCursorOffScreen: function (browser) {
            return browser.moveToObject('body', 0, 0);
        }
    };
}());
