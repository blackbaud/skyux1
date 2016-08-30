
/*global describe, it, browser */

describe('Page summary', function () {
    'use strict';

    function clickTest(screenshotName, visibleComponents, screenWidth) {
        return browser
            .setupTest('/pagesummary/fixtures/test.full.html', screenWidth)
            .setValue('#screenshots-pagesummary-items', visibleComponents.join(','))
            .compareScreenshot({
                screenshotName: ('pagesummary_' + screenshotName),
                selector: '#screenshots-pagesummary'
            });
    }

    it('should match previous pagesummary screenshot when all components are present', function () {
        return clickTest(
            'all',
            [
                'Title',
                'Subtitle',
                'Image',
                'Status',
                'KeyInfo',
                'Content',
                'Alert'
            ]
        );
    });

    it('should match previous pagesummary screenshot when all components are present on small screens', function () {
        return clickTest(
            'all',
            [
                'Title',
                'Subtitle',
                'Image',
                'Status',
                'KeyInfo',
                'Content',
                'Alert'
            ],
            480
        );
    });

    it('should match previous pagesummary screenshot when no image is present', function () {
        return clickTest(
            'noimage',
            [
                'Title',
                'Subtitle',
                'Status',
                'KeyInfo',
                'Content',
                'Alert'
            ]
        );
    });

    it('should match previous pagesummary screenshot when no subtitle is present', function () {
        return clickTest(
            'nosubtitle',
            [
                'Title',
                'Image',
                'Status',
                'KeyInfo',
                'Content',
                'Alert'
            ]
        );
    });

    it('should match previous pagesummary screenshot when no status is present', function () {
        return clickTest(
            'nostatus',
            [
                'Title',
                'Subtitle',
                'Image',
                'KeyInfo',
                'Content',
                'Alert'
            ]
        );
    });

    it('should match previous pagesummary screenshot when no key info is present', function () {
        return clickTest(
            'nokeyinfo',
            [
                'Title',
                'Subtitle',
                'Image',
                'Status',
                'Content',
                'Alert'
            ]
        );
    });

    it('should match previous pagesummary screenshot when no additional content is present', function () {
        return clickTest(
            'nocontent',
            [
                'Title',
                'Subtitle',
                'Image',
                'Status',
                'KeyInfo',
                'Alert'
            ]
        );
    });

    it('should match previous pagesummary screenshot when no alert is present', function () {
        return clickTest(
            'noalert',
            [
                'Title',
                'Subtitle',
                'Image',
                'Status',
                'KeyInfo',
                'Content'
            ]
        );
    });

    it('should match previous pagesummary screenshot when only image, title, and subtitle are present', function () {
        return clickTest(
            'image_title_subtitle',
            [
                'Title',
                'Subtitle',
                'Image'
            ]
        );
    });

    it('should match previous pagesummary screenshot when only image, title, and subtitle are present on small screens', function () {
        return clickTest(
            'image_title_subtitle',
            [
                'Title',
                'Subtitle',
                'Image'
            ],
            480
        );
    });

});
