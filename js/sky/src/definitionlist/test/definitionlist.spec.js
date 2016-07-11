/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Definition list component', function () {
    'use strict';

    var $compile,
        $rootScope;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.definitionlist'));
    beforeEach(module('sky.templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('should display the correct heading', function () {
        var el,
            $scope = $rootScope.$new(),
            header = 'head',
            value = 'foo',
            label = 'bar';

        el = $compile('<bb-definition-list><bb-definition-list-heading>' + header + '</bb-definition-list-heading><bb-definition-list-content><bb-definition-list-value>' + value + '</bb-definition-list-value><bb-definition-list-label>' + label + '</bb-definition-list-label></bb-definition-list-content></bb-definition-list>')($scope);

        $scope.$digest();

        
        expect(el.find('.bb-definition-list-heading')).toHaveText(header);
    });
    
    it('should display the correct value', function () {
        var el,
            $scope = $rootScope.$new(),
            header = 'head',
            value = 'foo',
            label = 'bar';

        el = $compile('<bb-definition-list><bb-definition-list-heading>' + header + '</bb-definition-list-heading><bb-definition-list-content><bb-definition-list-value>' + value + '</bb-definition-list-value><bb-definition-list-label>' + label + '</bb-definition-list-label></bb-definition-list-content></bb-definition-list>')($scope);

        $scope.$digest();

        
        expect(el.find('.bb-definition-list-value')).toHaveText(value);
    });
    
    it('should display the correct label', function () {
        var el,
            $scope = $rootScope.$new(),
            header = 'head',
            value = 'foo',
            label = 'bar';

        el = $compile('<bb-definition-list><bb-definition-list-heading>' + header + '</bb-definition-list-heading><bb-definition-list-content><bb-definition-list-value>' + value + '</bb-definition-list-value><bb-definition-list-label>' + label + '</bb-definition-list-label></bb-definition-list-content></bb-definition-list>')($scope);

        $scope.$digest();

        
        expect(el.find('.bb-definition-list-label')).toHaveText(label);
    });
}); 