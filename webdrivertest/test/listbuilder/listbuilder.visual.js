/*global describe, it, browser, require */

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
        listbuilderTest(1280);
    });

    it('match the baseline listbuilder screenshot on small screens', function () {
        listbuilderTest(480);
    });
});