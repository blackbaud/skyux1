/*jshint browser: true, jasmine: true */
/*global document, inject, module */

describe('Window', function () {
    'use strict';

    var bbWindow,
        bbWindowConfig,
        previousWindowTitle,
        $timeout,
        $document;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.window'));

    beforeEach(inject(function (_$timeout_, _bbWindow_, _bbWindowConfig_, _$document_) {
        bbWindowConfig = _bbWindowConfig_;
        bbWindow = _bbWindow_;
        $timeout = _$timeout_;
        $document = _$document_;
        
        previousWindowTitle = document.title;
    }));
    
    afterEach(function () {
        document.title = previousWindowTitle;
    });

    describe('setWindowTitle() method', function () {
        function testTitle(newTitle, expectedFullTitle) {
            bbWindow.setWindowTitle(newTitle);

            $timeout.flush();

            expect(document.title).toBe(expectedFullTitle || newTitle);
        }
        
        it('should set the window title', function () {
            testTitle('New Title');
        });

        it('should include the product name in the window title', function () {
            bbWindowConfig.productName = 'Tester\'s Edge';
            
            testTitle('New Title', 'New Title - Tester\'s Edge');
        });

        it('should just use the product name with an empty window title', function () {
            bbWindowConfig.productName = 'Tester\'s Edge';
            
            testTitle('', 'Tester\'s Edge');
        });
    });
    
    describe('getScrollbarWidth() method', function () {
        
        function caculateScrollbarWidth() {
            var inner, 
                outer, 
                w1,
                w2;
                      
            inner = document.createElement('p');
            inner.style.width = '100%';
            inner.style.height = '200px';
                            
            outer = document.createElement('div');
            outer.style.position = 'absolute';
            outer.style.top = '0px';
            outer.style.left = '0px';
            outer.style.visibility = 'hidden';
            outer.style.width = '200px';
            outer.style.height = '150px';
            outer.style.overflow = 'hidden';
                            
            outer.appendChild(inner);
                            
            document.body.appendChild(outer);
                            
            w1 = inner.offsetWidth;
            outer.style.overflow = 'scroll';
            w2 = inner.offsetWidth;
                            
            if (w1 === w2) {
                w2 = outer.clientWidth;
            }
                            
            document.body.removeChild(outer);
            return (w1 - w2);
        }
        
        it('gets back the scrollbar width when offsetWidth of scrollable element is different', function () {
            var expectedScrollbarWidth,
                actualScrollbarWidth;

            expectedScrollbarWidth = caculateScrollbarWidth();
            
            actualScrollbarWidth = bbWindow.getScrollbarWidth();
            expect(actualScrollbarWidth).toBe(expectedScrollbarWidth);
            
        });
        
        it('uses an already calculated width when it is defined', function () {
            var expectedScrollbarWidth,
                actualScrollbarWidth;
            
            expectedScrollbarWidth = caculateScrollbarWidth();
            
            actualScrollbarWidth = bbWindow.getScrollbarWidth();
            expect(actualScrollbarWidth).toBe(expectedScrollbarWidth);
            actualScrollbarWidth = bbWindow.getScrollbarWidth();
            expect(actualScrollbarWidth).toBe(expectedScrollbarWidth);
        });
    });
});