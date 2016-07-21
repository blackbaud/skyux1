/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Key info component', function () {
    'use strict';

    var $compile,
        $rootScope;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.keyinfo'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should support vertical and horizontal layouts', function () {
        var el,
            $scope = $rootScope.$new();

        el = $compile('<bb-key-info bb-key-info-layout="horizontal"><bb-key-info-value></bb-key-info-value><bb-key-info-label></bb-key-info-label></bb-key-info>')($scope);

        $scope.$digest();

        expect(el.find('.bb-key-info')).toHaveClass('bb-key-info-horizontal');
    });
    
    it('should have the appropriate content in expected areas', function () {
        var el,
            $scope = $rootScope.$new(),
            keyvalue = 'foo',
            keylabel = 'bar';

        el = $compile('<bb-key-info><bb-key-info-value>' + keyvalue + '</bb-key-info-value><bb-key-info-label>' + keylabel + '</bb-key-info-label></bb-key-info>')($scope);

        $scope.$digest();

        expect(el.find('.bb-key-info-value')).toHaveText(keyvalue);
        expect(el.find('.bb-key-info-label')).toHaveText(keylabel);
    });
}); 
