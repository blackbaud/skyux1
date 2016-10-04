/*global describe, it, browser */

describe('listbuilder', function () {
    'use strict';


    function listbuilderTest(screenWidth) {

        return browser
            .setupTest('/listbuilder/fixtures/test.full.html', screenWidth)
            .compareScreenshot({
                screenshotName: 'listbuilder',
                selector: '#screenshot-listbuilder',
                checkAccessibility: true
            });
    }

    it('match the baseline listbuilder screenshot', function () {
        return listbuilderTest(1280);
    });

    it('match the baseline listbuilder screenshot on small screens', function () {
        return listbuilderTest(480);
    });
});