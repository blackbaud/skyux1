/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

describe('Highlight', function () {
    'use strict';

    beforeEach(module('ngMock'));
    beforeEach(module('sky.highlight'));

    describe('service', function () {
        var bbHighlight;
        
        beforeEach(inject(function (_bbHighlight_) {
            bbHighlight = _bbHighlight_;
        }));

        it('should highlight specified text', function () {
            var el = angular.element('<div>a</div>');
            bbHighlight(el, 'a');
            
            expect(el).toHaveHtml('<span class="highlight">a</span>');
            
            bbHighlight.clear(el);
            
            expect(el).toHaveHtml('a');
        });

        it('should use custom CSS class if specified', function () {
            var el = angular.element('<div>a</div>');
            bbHighlight(el, 'a', 'test-highlight');
            
            expect(el).toHaveHtml('<span class="test-highlight">a</span>');
            
            bbHighlight.clear(el);
            
            expect(el).toHaveHtml('a');
        });


        it('should highlight specified text', function () {
            var el = angular.element('<div>a</div>');
            bbHighlight(el, 'a');
            
            expect(el).toHaveHtml('<span class="highlight">a</span>');
        });

        it('should ignore empty pattern', function () {
            var el = angular.element('<div>a</div>');
            bbHighlight(el, '');
            
            expect(el).toHaveHtml('a');
        });
    });
    
    describe('directive', function () {
        var $compile,
            $scope;

        beforeEach(inject(function (_$rootScope_, _$compile_) {
            $compile = _$compile_;
            $scope = _$rootScope_;
        }));

        it('should highlight the specified text', function () {
            var el = $compile('<div bb-highlight="highlightedText">Text to highlight.</div>')($scope);

            $scope.highlightedText = 'to';
            $scope.$digest();

            expect(el).toHaveHtml('Text <span class="highlight">to</span> highlight.');

            $scope.highlightedText = '';
            $scope.$digest();

            expect(el).toHaveHtml('Text to highlight.');
        });

        it('should use the specified beacon to update highlighted text', function () {
            /*jslint white: true */
            var el,
                highlightedEl;
            
            el = $compile(
                '<div bb-highlight="highlightedText" bb-highlight-beacon="beacon">' +
                    '{{textToHighlight}}' + 
                    '<div ng-if="beacon">do this, too.</div>' + 
                '</div>'
            )($scope);
            /*jslint white: false */

            $scope.textToHighlight = 'Text to highlight.';
            $scope.highlightedText = 'to';
            $scope.$digest();
            
            highlightedEl = el.find('.highlight');
            
            expect(highlightedEl.length).toBe(1);
            expect(highlightedEl).toHaveText('to');

            $scope.beacon = true;
            $scope.$digest();
            
            highlightedEl = el.find('.highlight');
            
            expect(highlightedEl.length).toBe(2);
            expect(highlightedEl.eq(0)).toHaveText('to');
            expect(highlightedEl.eq(1)).toHaveText('to');

            $scope.beacon = false;
            $scope.$digest();

            highlightedEl = el.find('.highlight');

            expect(highlightedEl.length).toBe(1);
            expect(highlightedEl).toHaveText('to');
        });
        
        it('should bind the specified value and then highlight text in the value when the bb-higlight-bind attribute is specified', function () {
            var el = $compile('<div bb-highlight="highlightedText" ng-bind="textToHighlight"></div>')($scope);

            $scope.textToHighlight = 'Text to highlight.';
            $scope.$digest();
            
            expect(el).toHaveHtml($scope.textToHighlight);
            
            $scope.highlightedText = 'to';
            $scope.$digest();

            expect(el).toHaveHtml('Text <span class="highlight">to</span> highlight.');

            $scope.textToHighlight = 'Highlight this, too.';
            $scope.$digest();
            
            expect(el).toHaveHtml('Highlight this, <span class="highlight">to</span>o.');
            
            $scope.highlightedText = '';
            $scope.$digest();

            expect(el).toHaveHtml($scope.textToHighlight);
        });
    });
});