
/*global describe, it, browser */

describe('highlight', function () {
    'use strict';

    it('match the baseline highlight screenshot', function () {
        return browser
            .setupTest('/highlight/fixtures/test.full.html')
            .compareScreenshot({
                screenshotName: 'highlight',
                selector: '#screenshot-highlight',
                checkAccessibility: true
            });
    });
});
