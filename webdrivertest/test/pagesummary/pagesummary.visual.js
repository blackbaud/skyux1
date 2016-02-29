
/*global describe, it, browser, beforeEach, require */

describe('Page summary', function () {
    'use strict';

    var options = {},
        common;

    beforeEach(function (done) {
        common = require('../common');
        common.initWebdriverCss(browser, options, done);
    });

    function clickTest(screenshotName, visibleComponents, done) {
        var result;

        result = browser.url('/pagesummary/fixtures/test.full.html')
            .setValue('#screenshots-pagesummary-items', visibleComponents.join(','));

        common.compareScreenshot({
            browserResult: result,
            prefix: options.prefix,
            screenshotName: ('pagesummary_' + screenshotName),
            selector: '#screenshots-pagesummary',
            done: done
        });
    }

    it('should match previous screenshot when all components are present', function (done) {
        clickTest(
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
            done
        );
    });

    it('should match previous screenshot when no image is present', function (done) {
        clickTest(
            'noimage',
            [
                'Title',
                'Subtitle',
                'Status',
                'KeyInfo',
                'Content',
                'Alert'
            ],
            done
        );
    });

    it('should match previous screenshot when no subtitle is present', function (done) {
        clickTest(
            'nosubtitle',
            [
                'Title',
                'Image',
                'Status',
                'KeyInfo',
                'Content',
                'Alert'
            ],
            done
        );
    });

    it('should match previous screenshot when no status is present', function (done) {
        clickTest(
            'nostatus',
            [
                'Title',
                'Subtitle',
                'Image',
                'KeyInfo',
                'Content',
                'Alert'
            ],
            done
        );
    });

    it('should match previous screenshot when no key info is present', function (done) {
        clickTest(
            'nokeyinfo',
            [
                'Title',
                'Subtitle',
                'Image',
                'Status',
                'Content',
                'Alert'
            ],
            done
        );
    });

    it('should match previous screenshot when no additional content is present', function (done) {
        clickTest(
            'nocontent',
            [
                'Title',
                'Subtitle',
                'Image',
                'Status',
                'KeyInfo',
                'Alert'
            ],
            done
        );
    });

    it('should match previous screenshot when no alert is present', function (done) {
        clickTest(
            'noalert',
            [
                'Title',
                'Subtitle',
                'Image',
                'Status',
                'KeyInfo',
                'Content'
            ],
            done
        );
    });
});
