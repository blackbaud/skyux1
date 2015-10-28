/*jshint browser: true, jasmine: true */
/*global inject, module */

describe('Template directive', function () {
    'use strict';

    var $compile,
        $scope;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.templating'));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
    }));

    it('should process template', function () {
        var el,
            templateResultEl;

        /*jslint white: true */
        el = $compile(
            '<span bb-template="myTemplate">' +
                '<span bb-template-item>{{templateValue1}}</span>' +
                '<span bb-template-item>{{templateValue2}}</span>' +
                '<span bb-template-item>{{templateValue1}}</span>' +
            '</span>'
        )($scope);
        /*jslint white: false */

        $scope.myTemplate = 'Template item 1: {0} Template item 2: {1} Template item 3: {0}';
        $scope.templateValue1 = 'abc';
        $scope.templateValue2 = 'xyz';

        $scope.$digest();
        
        templateResultEl = el.find('.bb-template-result');
        
        expect(templateResultEl.find('.bb-template-item-0 span').eq(0)).toHaveText('abc');
        expect(templateResultEl.find('.bb-template-item-1 span')).toHaveText('xyz');
        expect(templateResultEl.find('.bb-template-item-0 span').eq(1)).toHaveText('abc');
    });

    it('should not process an undefined template', function () {
        var el;

        el = $compile('<span bb-template="myTemplate"></span>')($scope);

        $scope.$digest();

        expect(el).toHaveHtml('');
    });
});