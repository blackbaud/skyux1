/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

describe('Validation module', function () {
    'use strict';
    var $compile,
        $scope,
        $parse;
    
    beforeEach(module('ngMock'));
    beforeEach(module('sky.validation'));
    
    beforeEach(inject(function (_$rootScope_, _$compile_, _$parse_) {
        $compile = _$compile_;
        $scope = _$rootScope_;
        $parse = _$parse_;
    }));
    
    describe('Email validation', function () {
       
        it('validates properly formatted email addresses', function () {
            var el,
                validationHtml = '<ng-form name="test">' +
                    '<input type="email" name="email" ng-model="locals.email" bb-email-validation />' +
                    '</ng-form>';
            
            el = angular.element(validationHtml);
            
            $scope.locals = {
                email: 'wedge@antilles.com'
            };
            
            $compile(el)($scope);
            
            $scope.$digest();
            
            expect($scope.test.$valid).toBe(true);
            
        });
        
        it('validates improperly formatted email addresses', function () {
            var el,
                validationHtml = '<ng-form name="test">' +
                    '<input type="email" name="email" ng-model="locals.email" bb-email-validation />' +
                    '</ng-form>';
            
            el = angular.element(validationHtml);
            
            $scope.locals = {
                email: 'wedgeantillescom'
            };
            
            $compile(el)($scope);
            
            $scope.$digest();
            
            expect($scope.test.$valid).toBe(false);
        });
        
        it('does nothing if there is no email validator', function () {
            var el,
                validationHtml = '<ng-form name="test">' +
                    '<input name="myField" ng-model="locals.email" bb-email-validation />' +
                    '</ng-form>';
            
            el = angular.element(validationHtml);
            
            $scope.locals = {
                email: 'wedgeantillescom'
            };
            
            $compile(el)($scope);
            
            $scope.$digest();
            
            expect($scope.test.$valid).toBe(true);
        });
    });
});