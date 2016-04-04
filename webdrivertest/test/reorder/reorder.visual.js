
/*global describe, it, browser,require, expect */

describe('Reorder', function () {
    'use strict';

    it('should match previous reorder screenshot in the default state', function (done) {
        var browserResult,
            common = require('../common');

        browserResult = browser
            .url('/reorder/fixtures/test.full.html');

        common.compareScreenshot({
            browserResult: browserResult,
            prefix: common.getPrefix(browser),
            screenshotName: 'reorder_default',
            selector: '#screenshot-reorder',
            done: done
        });
    });

    it('should match previous reorder screenshot when user is sorting', function (done) {
        var browserResult,
            common = require('../common'),
            prefix,
            screenshotName,
            pageName;

        browserResult = browser
            .url('/reorder/fixtures/test.full.html')
            .moveToObject('#screenshot-reorder .bb-reorder-list-row:first-child')
            .buttonDown()
            .moveToObject('#screenshot-reorder .bb-reorder-list-row:nth-child(2)', 0, -35);

        prefix = common.getPrefix(browser);
        screenshotName = 'reorder_sorting';

        pageName = prefix + '/' + prefix + '_' + screenshotName + '_full';

        browserResult
            .webdrivercss(pageName, [
                {
                    name: screenshotName,
                    elem: '#screenshot-reorder'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res[screenshotName][0].isWithinMisMatchTolerance).toBe(true);
            })
            .buttonUp()
            .call(done);
    });
});
