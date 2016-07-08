/*global describe, it, browser, require */

describe('listbuilder', function () {
    'use strict';


    function listbuilderTest(screenWidth, done) {
        var common = require('../common');

        browser
            .setupTest('/listbuilder/fixtures/test.full.html', screenWidth)
            .compareScreenshot({
                prefix: common.getPrefix(browser),
                screenshotName: 'listbuilder',
                selector: '#screenshot-listbuilder'
            })
            .call(done);
    }

    it('match the baseline listbuilder screenshot', function (done) {
        listbuilderTest(1280, done);
    });

    it('match the baseline listbuilder screenshot on small screens', function (done) {
        listbuilderTest(480, done);
    });
});