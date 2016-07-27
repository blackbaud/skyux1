/*global describe, it, browser, require, $ */

describe('navbar', function () {
    'use strict';

    function testNavbar(screenWidth, done) {
        browser
            .setupTest('/navbar/fixtures/test.full.html', screenWidth)
            .compareScreenshot({
                screenshotName: 'navbar',
                selector: '#screenshot-navbar'
            })
            .call(done);
    }

    it('should match the baseline navbar screenshot', function (done) {
        testNavbar(1280, done);
    });

    it('should match the baseline navbar screenshot on small screens', function (done) {
        testNavbar(480, done);
    });

    it('should match the baseline navbar screenshot with the dropdown open', function (done) {
        browser
            .setupTest('/navbar/fixtures/test.full.html')
            .moveToObject('.nav li.dropdown a')
            .compareScreenshot({
                screenshotName: 'navbar_dropdown',
                selector: '#screenshot-navbar-dropdown'
            })
            .call(done);
    });

    it('should match the baseline navbar screenshot with the dropdown open and not active', function (done) {
        browser
            .setupTest('/navbar/fixtures/test.full.html')
            .execute(function () {
                $('.dropdown').addClass('open');
            })
            .compareScreenshot({
                screenshotName: 'navbar_dropdown_open',
                selector: '#screenshot-navbar-dropdown'
            })
            .call(done);
    });
});
