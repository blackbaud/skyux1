/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Moment constant', function () {
    'use strict';

    var $window,
        bbMoment;
    
    beforeEach(module('sky.moment'));
    
    beforeEach(inject(function (_$window_, _bbMoment_) {
        $window = _$window_;
        bbMoment = _bbMoment_;
    }));
    
    it('should expose the moment library', function () {
        expect(bbMoment).toBe($window.moment);
    });
});