
/*global describe, it, browser, beforeEach, expect, require */

describe('Page summary', function () {
    'use strict';

    var options = {};

    beforeEach(function (done) {
        require('../common').initWebdriverCss(browser, options, done);
    });

    function clickTest(screenshotName, visibleComponents, done) {
        var pageName = options.prefix + 'pagesummary_' + screenshotName;

        browser
            .url('/pagesummary/fixtures/test.full.html')
            .setValue('#screenshots-pagesummary-items', visibleComponents.join(','))
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: ('#screenshots-pagesummary')
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .call(done);
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
