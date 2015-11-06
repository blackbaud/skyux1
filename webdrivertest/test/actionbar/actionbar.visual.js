/*global describe, it, browser, expect */

describe('actionbar', function () {
    'use strict';
    it('should take an actionbar screenshot', function (done) {
        browser
            .url('/actionbar/fixtures/test.full.html')
            .webdrivercss('actionbar', [
                {
                    name: 'actionbar',
                    elem: '#screenshot-actionbar'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.actionbar[0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });
});
