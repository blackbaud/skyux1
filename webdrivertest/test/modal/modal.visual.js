/*global describe, it, browser, require, expect */

describe('modals', function () {
    'use strict';

    it('match the baseline modal screenshot', function (done) {
        var result,
            common = require('../common');

        result = browser.url('/modal/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: result,
            prefix: common.getPrefix(browser),
            screenshotName: 'modal',
            selector: '#screenshot-modal',
            done: done
        });
    });

    it('match the baseline modal with context menu screenshot', function (done) {
        var result,
            prefix,
            screenshotName,
            pageName,
            common = require('../common');

        result = browser.url('/modal/fixtures/test.full.html')
                        .click('.bb-test-dropdown')
                        .click('.bb-context-menu-btn');

        prefix = common.getPrefix(browser);
        screenshotName = 'modal_dropdown';

        pageName = prefix + '/' + prefix + '_' + screenshotName + '_full';

        result
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '.modal-content'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .click('.modal-dialog .close')
            .call(done);
    });
});
