/*global describe, it, browser */

describe('sectionedform', function () {
    'use strict';

    var mobileViewScreenSize = 767,
        sectionedFormOnPageId = 'sectionedForm';

    it('should match the screenshot for the normal view', function () {
        return browser
            .setupTest('/sectionedform/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'sectionedform',
                selector: '#' + sectionedFormOnPageId
            });
    })

    it('should match the screenshot for the mobile view', function () {
        return browser
            .setupTest('/sectionedform/fixtures/test.full.html', mobileViewScreenSize)
            .compareScreenshot({
                screenshotName: 'sectionedform_mobile',
                selector: '#' + sectionedFormOnPageId
            });
    })
});