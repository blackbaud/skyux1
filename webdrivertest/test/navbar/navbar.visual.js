/*global describe, it, browser, $ */


describe('navbar', function () {
    'use strict';

    function testNavbar(screenWidth) {
        return browser
            .setupTest('/navbar/fixtures/test.full.html', screenWidth)
            .compareScreenshot({
                screenshotName: 'navbar',
                selector: '#screenshot-navbar',
                checkAccessibility: true
            });

    }

    it('should match the baseline navbar screenshot', function () {
        return testNavbar(1280);
    });

    it('should match the baseline navbar screenshot on small screens', function () {
        return testNavbar(480);
    });

    it('should match the baseline navbar screenshot with the dropdown open', function () {
        return browser
            .setupTest('/navbar/fixtures/test.full.html')
            .moveToObject('.nav li.dropdown a')
            .compareScreenshot({
                screenshotName: 'navbar_dropdown',

                selector: '#screenshot-navbar-dropdown',
                checkAccessibility: true
            });
    });

    it('should match the baseline navbar screenshot with the dropdown open and not active', function () {
        return browser
            .setupTest('/navbar/fixtures/test.full.html')
            .execute(function () {
                $('.dropdown').addClass('open');
            })
            .compareScreenshot({
                screenshotName: 'navbar_dropdown_open',
                selector: '#screenshot-navbar-dropdown',
                checkAccessibility: true
            });
    });
});
