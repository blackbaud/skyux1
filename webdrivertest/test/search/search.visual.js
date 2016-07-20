/*global describe, it, browser, require */

describe('search', function () {
    'use strict';

    var common = require('../common');


    it('should match the baseline search screenshot', function (done) {

        browser
            .setupTest('/search/fixtures/test.full.html')
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'search',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline search screenshot on small screens', function (done) {

        browser
            .setupTest('/search/fixtures/test.full.html', 480)
            .pause(1000)
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'search_small',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline search screenshot on small screens when dismissable input is shown', function (done) {

        browser
            .setupTest('/search/fixtures/test.full.html', 480)
            .click('.bb-search-open')
            .pause(1000)
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'search_small_dismissable',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            })
            .call(done);
    });

});