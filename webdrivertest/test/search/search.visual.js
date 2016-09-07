/*global describe, it, browser */

describe('search', function () {
    'use strict';

    it('should match the baseline search screenshot', function () {

        return browser
            .setupTest('/search/fixtures/test.full.html')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'search',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            });
    });

    it('should match the baseline search screenshot when the input is focused', function () {
        return browser
            .setupTest('/search/fixtures/test.full.html')
            .pause(1000)
            .focusElement('.bb-search-input')
            .compareScreenshot({
                screenshotName: 'search_focus',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            });
    });

    it('should match the baseline search screenshot on small screens', function () {

        return browser
            .setupTest('/search/fixtures/test.full.html', 480)
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'search_small',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            });
    });

    it('should match the baseline search screenshot on small screens when dismissable input is shown', function () {

        return browser
            .setupTest('/search/fixtures/test.full.html', 480)
            .pause(1000)
            .click('.bb-search-btn-open')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'search_small_dismissable',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            });
    });

    it('should match the baseline search screenshot on small screens when search is applied', function () {

        return browser
            .setupTest('/search/fixtures/test.full.html', 480)
            .pause(1000)
            .click('.bb-search-btn-open')
            .pause(1000)
            .setValue('.bb-search-input', 'Value')
            .click('.bb-search-btn-apply')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'search_small_dismissable_applied',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            });
    });

    it('should match the baseline search screenshot on small screens when search is applied and dismissed', function () {

        return browser
            .setupTest('/search/fixtures/test.full.html', 480)
            .pause(1000)
            .click('.bb-search-btn-open')
            .pause(1000)
            .setValue('.bb-search-input', 'Value')
            .click('.bb-search-btn-apply')
            .pause(1000)
            .click('.bb-search-btn-dismiss')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'search_small_applied',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            });
    });

});