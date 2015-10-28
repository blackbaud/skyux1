/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Utilities', function () {
    'use strict';
    
    var $filter;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.utilities'));

    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));

    describe('encodeURIComponent', function () {
        it('should encode a URI component', function () {
            var encoded = $filter('encodeURIComponent')('amp=&');

            expect(encoded).toBe('amp%3D%26');
        });
    });
    
    describe('format', function () {
        it('should format the string', function () {
            var encoded = $filter('format')('{0}{1}', 'foo', 'bar');

            expect(encoded).toBe('foobar');
        });
    });
});