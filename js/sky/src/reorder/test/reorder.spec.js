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

    describe('component', function () {

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

            expect(elScope.$ctrl.bbReorderItems.length).toBe(4);
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

            elScope.$ctrl.sorting = true;
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

            elScope.$ctrl.sorting = true;
            $scope.$digest();

            firstRow = el.find('.bb-reorder-list-row')[0];

            expect($(firstRow).find('.bb-reorder-list-sorting-number').parent()).not.toHaveClass('ng-hide');
        });

        it('should send a row to the top of the list when clicked', function () {
            var $scope = $rootScope.$new(),
                animateCallback,
                secondRow,
                el;

            spyOn($.fn, 'fadeOut');

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            secondRow = $(el.find('.bb-reorder-list-row')[1]);
            secondRow.find('.bb-reorder-list-col-top').trigger('click');

            expect(secondRow).toHaveClass('bb-reorder-list-row-placeholder');
            expect(el.find('.bb-reorder-animate-element')).toExist();

            animateCallback = $.fn.fadeOut.calls.argsFor(0)[0].always;
            animateCallback(); // act as though the animation finished

            expect($(el.find('.bb-reorder-list-row')[0]).find('.bb-reorder-list-title')).toContainText('test2');
            expect($scope.items[0].title).toBe('test2');

            expect(secondRow).not.toHaveClass('bb-reorder-list-row-placeholder');
            expect(el.find('.bb-reorder-animate-element')).not.toExist();
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

            expect(elScope.$ctrl.sorting).toBe(true);

            rows = el.find('.bb-reorder-list-row');

            $.each(rows, function (i, item) {
                expect($(item).find('.bb-reorder-list-sorting-number')).toContainText((i + 1).toString());
            });
        });

        it('should handle the sortable stop event', function () {
            var $scope = $rootScope.$new(),
                startEventCallback,
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

            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            eventArg = {
                item: $(el),
                placeholder: $(el)
            };

            stopEventCallback = $.fn.sortable.calls.argsFor(0)[0].stop;
            stopEventCallback(null, eventArg);

            $timeout.flush();

            elScope = el.isolateScope();

            expect(elScope.$ctrl.sorting).toBe(false);
        });

        it('should handle the sortable update event', function () {
            var $scope = $rootScope.$new(),
                updateEventCallback,
                eventArg,
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

            expect(eventArg.item.index).toHaveBeenCalled();
            expect($.fn.sortable).toHaveBeenCalledWith('cancel');
        });

        it('should set the position numbers correctly when moving the sorting item from bottom to top', function () {
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

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            // we are going to move the bottom item to the top of the list
            rowBeingMoved = $(el.find('.bb-reorder-list-row')[3]);

            // put the placeholder in the right position as if the user was currently sorting
            placeholder = $('<div id="placeholder"></div>');
            el.append(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            // call start as if the user started sorting
            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            // move the placeholder as if the user has moved the sort element
            el.find('#placeholder').remove();

            placeholder = $('<div id="placeholder"></div>');
            el.prepend(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            // call change as if the user changed the position of the element being sorted
            changeEventCallback = $.fn.sortable.calls.argsFor(0)[0].change;
            changeEventCallback(null, eventArg);

            // valdiate that items are ordered as we would expect
            rows = el.find('.bb-reorder-list-row');

            $.each(rows, function (i, item) {
                expect($(item).find('.bb-reorder-list-sorting-number')).toContainText(newOrder[i]);
            });
        });

        it('should set the position numbers correctly when moving the sorting item from top to bottom', function () {
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

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            // we are going to move the top element to the bottom of the list
            rowBeingMoved = $(el.find('.bb-reorder-list-row')[0]);

            // put the placeholder in the right position as if the user was currently sorting
            placeholder = $('<div id="placeholder"></div>');
            el.prepend(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            // call start as if the user started sorting
            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            // move the placeholder as if the user has moved the sort element
            el.find('#placeholder').remove();

            placeholder = $('<div id="placeholder"></div>');
            el.append(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            // call change as if the user changed the position of the element being sorted
            changeEventCallback = $.fn.sortable.calls.argsFor(0)[0].change;
            changeEventCallback(null, eventArg);

            // valdiate that items are ordered as we would expect
            rows = el.find('.bb-reorder-list-row');

            $.each(rows, function (i, item) {
                expect($(item).find('.bb-reorder-list-sorting-number')).toContainText(newOrder[i]);
            });
        });

        it('should handle the sortable change event that can fire if no change was actually made', function () {
            var $scope = $rootScope.$new(),
                changeEventCallback,
                startEventCallback,
                eventArg,
                rows,
                placeholder,
                rowBeingMoved,
                el;

            spyOn($.fn, 'sortable');

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            // we are going to move the top element to the bottom of the list
            rowBeingMoved = $(el.find('.bb-reorder-list-row')[0]);

            // put the placeholder in the right position as if the user was currently sorting
            placeholder = $('<div id="placeholder"></div>');
            rowBeingMoved.after(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            // call start as if the user started sorting
            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            // call change as if the user changed the position of the element being sorted
            changeEventCallback = $.fn.sortable.calls.argsFor(0)[0].change;
            changeEventCallback(null, eventArg);

            // valdiate that items are ordered as we would expect
            rows = el.find('.bb-reorder-list-row');

            $.each(rows, function (i, item) {
                expect($(item).find('.bb-reorder-list-sorting-number')).toContainText((i + 1).toString());
            });
        });

        it('should handle the sortable change event lifecyle from start to finish', function () {
            var $scope = $rootScope.$new(),
                startEventCallback,
                updateEventCallback,
                stopEventCallback,
                eventArg,
                placeholder,
                rowBeingMoved,
                el;

            spyOn($.fn, 'sortable');

            $scope.items = createTestItems();
            el = initializeDirective($scope);

            rowBeingMoved = $(el.find('.bb-reorder-list-row')[1]);

            // put the placeholder in the right position as if the user was currently sorting
            placeholder = $('<div id="placeholder"></div>');
            rowBeingMoved.insertAfter(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            // call start as if the user started sorting
            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            eventArg = {
                item: {
                    index: jasmine.createSpy().and.returnValue(2)
                }
            };

            // call update as if the user has moved the item to a new index
            updateEventCallback = $.fn.sortable.calls.argsFor(0)[0].update;
            updateEventCallback(null, eventArg);

            eventArg = {
                item: rowBeingMoved
            };

            // call stop to validate that we correctly swap the item positions
            stopEventCallback = $.fn.sortable.calls.argsFor(0)[0].stop;
            stopEventCallback(null, eventArg);

            expect($(el.find('.bb-reorder-list-row')[2])).toContainText('test2');
        });
    });
});
