
/*global describe, it, browser, expect */

describe('badges', function () {
    'use strict';
    /*it('should take badge screenshots', function (done) {
        browser
            .url('/badges/fixtures/test.full.html')
            .webdrivercss('badges', [
                {
                    name: 'badge',
                    elem: '#screenshots-badge .badge'
                },
                {
                    name: 'badge_primary',
                    elem: '#screenshots-badge .bb-badge-primary'
                },
                {
                    name: 'badge_success',
                    elem: '#screenshots-badge .bb-badge-success'
                },
                {
                    name: 'badge_warning',
                    elem: '#screenshots-badge .bb-badge-warning'
                },
                {
                    name: 'badge_danger',
                    elem: '#screenshots-badge .bb-badge-danger'
                },
                {
                    name: 'badge_in_button_primary',
                    elem: '#screenshots-badge-in-button-primary .btn'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.badge[0].isWithinMisMatchTolerance).toBe(true);
                expect(res.badge_primary[0].isWithinMisMatchTolerance).toBe(true);
                expect(res.badge_success[0].isWithinMisMatchTolerance).toBe(true);
                expect(res.badge_warning[0].isWithinMisMatchTolerance).toBe(true);
                expect(res.badge_danger[0].isWithinMisMatchTolerance).toBe(true);
                expect(res.badge_in_button_primary[0].isWithinMisMatchTolerance).toBe(true);
            }).call(done);
    });*/

    it('should take badge-primary screenshot', function (done) {
        browser
            .url('/badges/fixtures/test.full.html')
            .webdrivercss('badges', [
                {
                    name: 'badge_primary',
                    elem: '#screenshots-badge .bb-badge-primary'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.badge_primary[0].isWithinMisMatchTolerance).toBe(true);

            }).call(done);
    });

    it('should take badge-success screenshot', function (done) {
        browser
            .url('/badges/fixtures/test.full.html')
            .webdrivercss('badges', [
                {
                    name: 'badge_success',
                    elem: '#screenshots-badge .bb-badge-success'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.badge_success[0].isWithinMisMatchTolerance).toBe(true);

            }).call(done);
    });

    it('should take badge-warning screenshot', function (done) {
        browser
            .url('/badges/fixtures/test.full.html')
            .webdrivercss('badges', [
                {
                    name: 'badge_warning',
                    elem: '#screenshots-badge .bb-badge-warning'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.badge_warning[0].isWithinMisMatchTolerance).toBe(true);

            }).call(done);
    });

    it('should take badge-danger screenshot', function (done) {
        browser
            .url('/badges/fixtures/test.full.html')
            .webdrivercss('badges', [
                {
                    name: 'badge_danger',
                    elem: '#screenshots-badge .bb-badge-danger'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.badge_danger[0].isWithinMisMatchTolerance).toBe(true);

            }).call(done);
    });

    it('should take badge in primary screenshot', function (done) {
        browser
            .url('/badges/fixtures/test.full.html')
            .webdrivercss('badges', [
                {
                    name: 'badge_in_button_primary',
                    elem: '#screenshots-badge-in-button-primary .btn'
                }
            ], function (err, res) {
                expect(err).toBe(undefined);
                expect(res.badge_in_button_primary[0].isWithinMisMatchTolerance).toBe(true);

            }).call(done);
    });
});
