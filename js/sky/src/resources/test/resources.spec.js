/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Resources filter', function () {
    'use strict';
    
    var $filter,
        bbResources;
    
    beforeEach(module(
        'ngMock',
        'sky.resources'
    ));
    
    beforeEach(module(function ($provide) {
        bbResources = {
            foo: 'bar'
        };
        
        $provide.constant('bbResources', bbResources);
    }));
    
    beforeEach(inject(function (_$filter_) {
        $filter = _$filter_;
    }));
    
    it('should return the expected resource property', function () {
        expect($filter('bbResources')('foo')).toBe(bbResources.foo);
    });
});