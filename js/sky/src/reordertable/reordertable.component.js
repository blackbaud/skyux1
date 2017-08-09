/*global angular, jQuery */

(function ($) {
    'use strict';

    var bbReorderTable;

    function Controller($element, $filter, $scope, $timeout, $compile, $templateCache, $controller) {
        var bbAutonumericConfig,
            cellScopes = {},
            compiledTemplates = {}, // compiled cell templates
            containerEl = $element.find('.bb-reorder-table-body-container'),
            currentRepeaterItems, // the set of items from ng-repeat before sorting starts
            currentSortItemIndex, // the index where the sorting item is currently being placed
            finalIndex = -1, // the final index of the element being sorting after sorting has ended
            originalSortItemIndex, // the original index of th item being sorted before sorting starts
            sortableOptions, // jQuery sortable widget options
            vm = this;

        function applyNumberFormatting(index) {
            return $filter('bbAutonumeric')(index, bbAutonumericConfig);
        }

        function setPositionNumberText(item, index) {
            $(item).find('.bb-reorder-table-sorting-number').text(applyNumberFormatting(index));
        }

        function setPositionNumbers(incrementStep, siblingTraversalFunc, displayIndex, placeholder, item) {
            var curSibling;

            // set the position number of the item being sorted to account for how the user moved it
            setPositionNumberText(item, displayIndex);

            curSibling = siblingTraversalFunc.call(placeholder).not(item);
            while (curSibling.length > 0) {
                displayIndex = displayIndex + incrementStep;
                setPositionNumberText(curSibling, displayIndex);
                curSibling = siblingTraversalFunc.call(curSibling).not(item);
            }
        }

        function reinitTable(vm) {
            vm.options = vm.options || {};
            vm.sortable = !vm.unsortable && vm.options.data && vm.options.data.length > 1 && vm.options.fixed < vm.options.data.length;
            vm.options.fixed = vm.options.fixed || 0;
            vm.menuStates = {};

            if (vm.options.getContextMenuItems) {
                vm.contextMenuItems = {};
                angular.forEach(vm.options.data, function (item, i) {
                    if (!vm.unsortable) {
                        item[vm.options.index] = vm.options.oneIndexed ? i + 1 : i;
                    }
                    vm.contextMenuItems[item[vm.options.index]] = vm.options.getContextMenuItems(item);
                });
            } else {
                if (!vm.unsortable) {
                    angular.forEach(vm.options.data, function (item, i) {
                        item[vm.options.index] = vm.options.oneIndexed ? i + 1 : i;
                    });
                }
            }

            angular.forEach(vm.options.columns, function (col) {

                col.show = col.show === false ? false : true;

                if (col.template_url && !compiledTemplates[col.name]) {
                    compiledTemplates[col.name] = $compile($templateCache.get(col.template_url));
                }

            });
        }

        function isFixed(index) {
            return index < vm.options.fixed;
        }

        function setFixed(index) {
            return isFixed(index) ? 'bb-reorder-table-row-fixed' : 'bb-reorder-table-row';
        }

        // sends an item to the top of the list with a rising animation
        function pushToTop(item) {
            var toTheTopEl,
                index,
                toTheTopElOffset,
                animateCloneEl,
                topIndex;

            index = vm.options.data.indexOf(item);

            if (vm.sortable && index > vm.options.fixed) {

                topIndex = vm.options.fixed;

                containerEl.sortable('disable'); // don't allow sorting during animation

                toTheTopEl = $(containerEl.children()[index]);
                toTheTopElOffset = toTheTopEl.position();

                // create a clone of the element being moved to the top so we can animate it without messing with the ng-repeat
                animateCloneEl = toTheTopEl.clone();
                animateCloneEl.addClass('bb-reorder-table-animate-element');
                animateCloneEl.css({ top: toTheTopElOffset.top + 'px', left: toTheTopElOffset.left + 'px', width: toTheTopEl.outerWidth() + 'px' });

                containerEl.append(animateCloneEl);

                toTheTopEl.addClass('bb-reorder-table-row-placeholder');

                // animate that we are moving the item to the top of the list
                $(animateCloneEl).fadeOut({
                    duration: 500, queue: false, always: function () {
                        toTheTopEl.removeClass('bb-reorder-table-row-placeholder');

                        animateCloneEl.remove();
                        containerEl.sortable('enable');

                        $scope.$apply(function () {
                            // perform the swap moving the item to the top of the list
                            vm.options.data.splice(
                                topIndex, 0,
                                vm.options.data.splice(index, 1)[0]);
                        });
                    }
                });
            }
        }

        function cellLink(row, index, column) {
            var cell,
                itemScope,
                rowElem,
                templateFunction;

            rowElem = $element.find('#bb-reorder-table-' + vm.tableId + '-cell-' + index + '-' + column.name);
            cell = rowElem.children();

            itemScope = $scope.$new(true);
            itemScope.data = row[column.jsonmap];
            itemScope.rowData = row;
            itemScope.resources = vm.options.resources;

            if (column.controller) {
                $controller(column.controller, {
                    $scope: itemScope
                });
            }

            templateFunction = compiledTemplates[column.name];

            cellScopes[itemScope.$id] = itemScope;

            templateFunction(itemScope, function (cloned) {
                cell.append(cloned);
            });

            // Destroys the itemScope and removes it from the
            // scopes when the cell is removed from the page
            cell.on('$destroy', function () {
                itemScope.$destroy();
                cellScopes[itemScope.$id] = null;
                delete cellScopes[itemScope.$id];
            });

        }

        function toggleDropdown($event, rowIndex) {
            $event.preventDefault();
            $event.stopPropagation();
            vm.menuStates[rowIndex] = !vm.menuStates[rowIndex];
        }

        bbAutonumericConfig = {
            mDec: 0 // no decimals
        };

        vm.sorting = false;
        vm.tableId = $scope.$id;
        vm.menuStates = {};

        vm.isFixed = isFixed;
        vm.setFixed = setFixed;
        vm.pushToTop = pushToTop;
        vm.cellLink = cellLink;
        vm.toggleDropdown = toggleDropdown;

        //Setup jQuery sortable options for the items being sorted
        sortableOptions = {
            placeholder: 'bb-reorder-table-row-placeholder', // class to put on placeholder element
            axis: 'y', // constrain movement to the Y axis,
            handle: '.bb-reorder-table-col-icon',
            start: function (e, ui) {
                $scope.$apply(function () {
                    vm.sorting = true;
                });

                // need to keep track of the how the items were placed in the DOM since
                // the sortable is going to mess them up which breaks ng-repeat
                currentRepeaterItems = containerEl.contents().not(ui.placeholder);

                ui.item.addClass('bb-reorder-table-sorting-item');

                originalSortItemIndex = ui.item.index();
                currentSortItemIndex = originalSortItemIndex;

                // need to set the height of the placeholder since we need to account for the padding on the row items
                ui.placeholder.height(ui.item.outerHeight());

                // set the current index of all rows for display purposes
                $.each(containerEl.children('.bb-reorder-table-row, .bb-reorder-table-row-fixed'), function (i, item) {
                    setPositionNumberText(item, i + 1);
                });
            },
            stop: function (e, ui) {
                // replace the repeater elements and comments so ng-repeat does not break
                currentRepeaterItems.appendTo(containerEl);

                ui.item.removeClass('bb-reorder-table-sorting-item');

                if (finalIndex >= 0 && finalIndex !== originalSortItemIndex) {
                    $scope.$apply(function () {
                        // perform the swap that the user just performed
                        vm.options.data.splice(
                            finalIndex, 0,
                            vm.options.data.splice(originalSortItemIndex, 1)[0]);
                    });
                }

                $scope.$apply(function () {
                    vm.sorting = false;
                    $scope.$emit('tableReordered');
                });

                originalSortItemIndex = null;
                currentSortItemIndex = null;
                finalIndex = -1;
                currentRepeaterItems = null;

                // once the ng-repeat has finished rendering the move, re-enable animations
                $timeout(function () {
                    containerEl.children().removeClass('bb-reorder-table-no-animate');
                });
            },
            update: function (e, ui) {
                // grab the final index of the item being sorted before we cancel
                // the sort and its position gets reset.
                finalIndex = ui.item.index();

                // don't animate the move when sorting
                containerEl.children().addClass('bb-reorder-table-no-animate');

                // stop the sortable from moving the element as we want the ng-repeat directive to do the actual reorder
                containerEl.sortable('cancel');
            },
            change: function (e, ui) {
                var displayIndex,
                    newIndex;

                // Since the element being sorted is positioned absolute it remains in the
                // same position so we can't use its index. Instead use the placeholder since
                // that will be in the right position in the list.
                newIndex = ui.item.siblings().index(ui.placeholder);

                if (newIndex === currentSortItemIndex) {
                    return;
                }

                // the display position shown to the user should start at 1, not 0
                displayIndex = newIndex + 1;

                // when we are sorting, change the position numbers on the rows
                if (newIndex > currentSortItemIndex) {
                    // set the text of all previous siblings to account for change
                    setPositionNumbers(-1, $.fn.prev, displayIndex, ui.placeholder, ui.item);
                } else {
                    // set the text of all next siblings to account for change
                    setPositionNumbers(1, $.fn.next, displayIndex, ui.placeholder, ui.item);
                }

                currentSortItemIndex = newIndex;
            },
            items: '>.bb-reorder-table-row'
        };

        containerEl.sortable(sortableOptions);

        $scope.$watchCollection('$ctrl.options.data', function () {
            reinitTable(vm);
        });

        $scope.$watch('$ctrl.unsortable', function () {
            vm.sortable = !vm.unsortable && vm.options.data && vm.options.data.length > 1 && vm.options.fixed < vm.options.data.length;
        });
    }

    bbReorderTable = {
        bindings: {
            options: '=bbReorderTableOptions',
            unsortable: '=bbReorderTableUnsortable'
        },
        controller: Controller,
        templateUrl: 'sky/templates/reordertable/reordertable.component.html'
    };

    Controller.$inject = ['$element', '$filter', '$scope', '$timeout', '$compile', '$templateCache', '$controller'];

    angular.module('sky.reordertable.component', ['sky.resources', 'sky.autonumeric', 'ngAnimate'])
        .component('bbReorderTable', bbReorderTable);
}(jQuery));