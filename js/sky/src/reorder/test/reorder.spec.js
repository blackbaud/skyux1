/*jshint browser: true, jasmine: true */
/*global inject, module, $, spyOn */

describe('Reorder', function () {
    'use strict';

    var $compile,
        bbResources,
        $timeout,
        $rootScope;

    beforeEach(module(
        'ngMock',
        'sky.reorder',
        'sky.templates'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _bbResources_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        bbResources = _bbResources_;
    }));

    describe('directive', function () {

        function createTestItems() {
            return [{
                title: 'test1',
                description: 'testdescription1'
            }, {
                title: 'test2',
                description: 'testdescription2'
            }, {
                title: 'test3',
                description: 'testdescription3'
            }, {
                title: 'test4',
                description: 'testdescription4'
            }];
        }

        function initializeDirective($scope) {
            var el = $compile(
                '<bb-reorder bb-reorder-items="items"></bb-reorder>'
            )($scope);

            $scope.$digest();

            return el;
        }

        it('should set items on the isolate scope', function () {
            var $scope = $rootScope.$new(),
                el,
                elScope;

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            elScope = el.isolateScope();

            expect(elScope.bbReorderItems.length).toBe(4);
        });

        it('should set the data-index attribute on each row', function () {
            var $scope = $rootScope.$new(),
                rows,
                el;

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            rows = el.find('.bb-reorder-list-row');

            $.each(rows, function (i, item) {
                expect($(item)).toHaveAttr('data-index', i.toString());
            });
        });

        it('should display title and description correctly', function () {
            var $scope = $rootScope.$new(),
                rows,
                currentTitle,
                el;

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            rows = el.find('.bb-reorder-list-row');

            $.each(rows, function (i, item) {
                currentTitle = $(item).find('.bb-reorder-list-title');

                expect(currentTitle).toContainText($scope.items[i].title);
                expect(currentTitle.next()).toContainText($scope.items[i].description);
            });
        });

        it('should hide the ability to send the first row to the top of the list', function () {
            var $scope = $rootScope.$new(),
                firstRow,
                el;

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            firstRow = el.find('.bb-reorder-list-row')[0];

            expect($(firstRow).find('.bb-reorder-list-col-top')).toHaveClass('ng-hide');
        });

        it('should allow rows that are not first to be sent to the top of the list', function () {
            var $scope = $rootScope.$new(),
                secondRow,
                el;

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            secondRow = el.find('.bb-reorder-list-row')[1];

            expect($(secondRow).find('.bb-reorder-list-col-top')).not.toHaveClass('ng-hide');
        });

        it('should hide the ability to send to the top while the list is current being sorted', function () {
            var $scope = $rootScope.$new(),
                elScope,
                secondRow,
                el;

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            elScope = el.isolateScope();

            elScope.sorting = true;
            $scope.$digest();

            secondRow = el.find('.bb-reorder-list-row')[1];

            expect($(secondRow).find('.bb-reorder-list-col-top')).toHaveClass('ng-hide');
        });

        it('should hide the current sort number when the list is not being sorted', function () {
            var $scope = $rootScope.$new(),
                firstRow,
                el;

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            firstRow = el.find('.bb-reorder-list-row')[0];

            expect($(firstRow).find('.bb-reorder-list-sorting-number').parent()).toHaveClass('ng-hide');
        });

        it('should show the current sort number when the list is being sorted', function () {
            var $scope = $rootScope.$new(),
                elScope,
                firstRow,
                el;

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            elScope = el.isolateScope();

            elScope.sorting = true;
            $scope.$digest();

            firstRow = el.find('.bb-reorder-list-row')[0];

            expect($(firstRow).find('.bb-reorder-list-sorting-number').parent()).not.toHaveClass('ng-hide');
        });

        it('should send a row to the top of the list when clicked', function () {
            var $scope = $rootScope.$new(),
                animateCallback,
                secondRow,
                el;

            spyOn($.fn, 'animate');

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            secondRow = $(el.find('.bb-reorder-list-row')[1]);
            secondRow.find('.bb-reorder-list-col-top').trigger('click');

            expect(secondRow).toHaveClass('bb-reorder-list-row-placeholder');
            expect(secondRow.children()).toHaveCss({visibility: 'hidden'});
            expect($.find('.bb-reorder-list-sorting-item')).toExist();

            animateCallback = $.fn.animate.calls.argsFor(0)[3];
            animateCallback();

            expect($(el.find('.bb-reorder-list-row')[0]).find('.bb-reorder-list-title')).toContainText('test2');
            expect($scope.items[0].title).toBe('test2');

            expect(secondRow.children()).not.toHaveCss({visibility: 'hidden'});
            expect(secondRow).not.toHaveClass('bb-reorder-list-row-placeholder');
            expect($.find('.bb-reorder-list-sorting-item')).not.toExist();
        });

        it('should not send an item to the top if there is already another item being sent to the top', function () {
            var $scope = $rootScope.$new(),
                secondRow,
                thirdRow,
                el;

            spyOn($.fn, 'animate');

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            secondRow = $(el.find('.bb-reorder-list-row')[1]);
            thirdRow = $(el.find('.bb-reorder-list-row')[2]);

            secondRow.find('.bb-reorder-list-col-top').trigger('click');
            thirdRow.find('.bb-reorder-list-col-top').trigger('click');

            expect($.fn.animate.calls.count()).toBe(1);
        });

        it('should handle the sortable start event', function () {
            var $scope = $rootScope.$new(),
                startEventCallback,
                eventArg,
                rows,
                elScope,
                el;

            spyOn($.fn, 'sortable');

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            eventArg = {
                item: $(el),
                placeholder: $(el)
            };

            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            elScope = el.isolateScope();

            expect(elScope.sorting).toBe(true);

            rows = el.find('.bb-reorder-list-row');

            $.each(rows, function (i, item) {
                expect($(item).find('.bb-reorder-list-sorting-number')).toContainText((i + 1).toString());
            });
        });

        it('should handle the sortable stop event', function () {
            var $scope = $rootScope.$new(),
                stopEventCallback,
                eventArg,
                elScope,
                el;

            spyOn($.fn, 'sortable');

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            eventArg = {
                item: $(el),
                placeholder: $(el)
            };

            stopEventCallback = $.fn.sortable.calls.argsFor(0)[0].stop;
            stopEventCallback(null, eventArg);

            elScope = el.isolateScope();

            expect(elScope.sorting).toBe(false);
        });

        it('should handle the sortable update event', function () {
            var $scope = $rootScope.$new(),
                updateEventCallback,
                eventArg,
                elScope,
                el;

            spyOn($.fn, 'sortable');

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            eventArg = {
                item: {
                    index: jasmine.createSpy().and.returnValue(1)
                }
            };

            updateEventCallback = $.fn.sortable.calls.argsFor(0)[0].update;
            updateEventCallback(null, eventArg);

            elScope = el.isolateScope();

            expect($scope.items[0].title).toBe('test2');
            expect($.fn.sortable).toHaveBeenCalledWith('cancel');
        });

        it('should handle the sortable change event from bottom to top', function () {
            var $scope = $rootScope.$new(),
                changeEventCallback,
                startEventCallback,
                eventArg,
                rows,
                placeholder,
                rowBeingMoved,
                newOrder = ['2', '3', '4', '1'],
                el;

            spyOn($.fn, 'sortable');
            spyOn($.fn, 'offset').and.returnValue({top: 1000});

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            rowBeingMoved = $(el.find('.bb-reorder-list-row')[3]);

            placeholder = $('<div id="placeholder"></div>');
            $(el.find('.bb-reorder-list-row')[0]).before(placeholder);

            eventArg = {
                offset: {
                    top: 1
                },
                item: rowBeingMoved,
                placeholder: placeholder
            };

            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            changeEventCallback = $.fn.sortable.calls.argsFor(0)[0].change;
            changeEventCallback(null, eventArg);

            rows = el.find('.bb-reorder-list-row');

            $.each(rows, function (i, item) {
                expect($(item).find('.bb-reorder-list-sorting-number')).toContainText(newOrder[i]);
            });
        });

        it('should handle the sortable change event from top to bottom', function () {
            var $scope = $rootScope.$new(),
                changeEventCallback,
                startEventCallback,
                eventArg,
                rows,
                placeholder,
                rowBeingMoved,
                newOrder = ['4', '1', '2', '3'],
                el;

            spyOn($.fn, 'sortable');
            spyOn($.fn, 'offset').and.returnValue({top: 1});

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            rowBeingMoved = $(el.find('.bb-reorder-list-row')[0]);

            placeholder = $('<div id="placeholder"></div>');
            $(el.find('.bb-reorder-list-row')[3]).after(placeholder);

            eventArg = {
                offset: {
                    top: 1000
                },
                item: rowBeingMoved,
                placeholder: placeholder
            };

            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            changeEventCallback = $.fn.sortable.calls.argsFor(0)[0].change;
            changeEventCallback(null, eventArg);

            rows = el.find('.bb-reorder-list-row');

            $.each(rows, function (i, item) {
                expect($(item).find('.bb-reorder-list-sorting-number')).toContainText(newOrder[i]);
            });
        });
    });
});
