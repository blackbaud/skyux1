/*global describe, it, browser */

describe('search', function () {
    'use strict';

    it('should match the baseline search screenshot', function (done) {

        browser
            .setupTest('/search/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'search',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline search screenshot when the input is focused', function (done) {
        browser
            .setupTest('/search/fixtures/test.full.html')
            .focusElement('.bb-search-input')
            .compareScreenshot({
                screenshotName: 'search_focus',
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
                screenshotName: 'search_small',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline search screenshot on small screens when dismissable input is shown', function (done) {

        browser
            .setupTest('/search/fixtures/test.full.html', 480)
            .click('.bb-search-btn-open')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'search_small_dismissable',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline search screenshot on small screens when search is applied', function (done) {

        browser
            .setupTest('/search/fixtures/test.full.html', 480)
            .click('.bb-search-btn-open')
            .setValue('.bb-search-input', 'Value')
            .click('.bb-search-btn-apply')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'search_small_dismissable_applied',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            })
            .call(done);
    });

    it('should match the baseline search screenshot on small screens when search is applied and dismissed', function (done) {

        browser
            .setupTest('/search/fixtures/test.full.html', 480)
            .click('.bb-search-btn-open')
            .setValue('.bb-search-input', 'Value')
            .click('.bb-search-btn-apply')
            .click('.bb-search-btn-dismiss')
            .pause(1000)
            .compareScreenshot({
                screenshotName: 'search_small_applied',
                selector: '#screenshot-search-full',
                checkAccessibility: true
            })
            .call(done);
    });

});