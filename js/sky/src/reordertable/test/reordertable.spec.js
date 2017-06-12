/*jshint browser: true, jasmine: true */
/*global inject, module, $, spyOn */

describe('Reorder Table', function () {
    'use strict';

    var $compile,
        bbResources,
        $timeout,
        $rootScope;

    beforeEach(module(
        'ngMock',
        'sky.reordertable',
        'sky.templates'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _bbResources_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        bbResources = _bbResources_;
    }));

    describe('directive', function () {

        function getCompiledElement($scope) {

            var compiledElement = $compile('<bb-reorder-table ' +
                'bb-reorder-table-options="options" ' +
                'bb-reorder-table-unsortable="unsortable">' +
                '</bb-reorder-table>')($scope);

            $scope.$digest();

            return compiledElement;
        }

        describe('initializes', function () {
            describe('with unsortable', function () {

                it('as true', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope;

                    $scope.options = {};
                    $scope.unsortable = true;

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    expect(elScope.$ctrl.options).toBeDefined();
                    expect(elScope.$ctrl.unsortable).toBeTruthy();
                });

                it('as false', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope;

                    $scope.options = {};
                    $scope.unsortable = false;

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    expect(elScope.$ctrl.options).toBeDefined();
                    expect(elScope.$ctrl.unsortable).toBeFalsy();
                });
            });

            describe('with correct IDs', function () {

                it('when zero indexed', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope;

                    $scope.options = {
                        columns: [
                            {
                                name: "test",
                                jsonMap: "testProperty"
                            }
                        ],
                        data: [
                            { id: -1, testProperty: 123 },
                            { id: -1, testProperty: 456 },
                            { id: -1, testProperty: 789 }
                        ],
                        index: "id",
                        oneIndexed: false
                    };

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    expect($scope.options.data[0].testProperty).toEqual(123);
                    expect($scope.options.data[0].id).toEqual(0);
                    expect($scope.options.data[1].testProperty).toEqual(456);
                    expect($scope.options.data[1].id).toEqual(1);
                    expect($scope.options.data[2].testProperty).toEqual(789);
                    expect($scope.options.data[2].id).toEqual(2);
                });

                it('when one indexed', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope;

                    $scope.options = {
                        columns: [
                            {
                                name: "test",
                                jsonMap: "testProperty"
                            }
                        ],
                        data: [
                            { id: -1, testProperty: 123 },
                            { id: -1, testProperty: 456 },
                            { id: -1, testProperty: 789 }
                        ],
                        index: "id",
                        oneIndexed: true
                    };

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    expect($scope.options.data[0].testProperty).toEqual(123);
                    expect($scope.options.data[0].id).toEqual(1);
                    expect($scope.options.data[1].testProperty).toEqual(456);
                    expect($scope.options.data[1].id).toEqual(2);
                    expect($scope.options.data[2].testProperty).toEqual(789);
                    expect($scope.options.data[2].id).toEqual(3);
                });
            });

            it('with correct context menu items', function () {
                var $scope = $rootScope.$new(),
                    compiledElement,
                    elScope,
                    action = {
                        id: 0,
                        title: 'Test',
                        cmd: function () { }
                    };

                $scope.options = {
                    columns: [
                        {
                            name: "test",
                            jsonMap: "testProperty"
                        }
                    ],
                    data: [
                        { id: 0, testProperty: 123 },
                        { id: 1, testProperty: 456 },
                        { id: 2, testProperty: 789 }
                    ],
                    index: "id",
                    getContextMenuItems: function (item) {
                        if (item.id !== 1) {
                            return [action];
                        } else {
                            return [];
                        }
                    }
                };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                expect(elScope.$ctrl.contextMenuItems[0]).toEqual([action]);
                expect(elScope.$ctrl.contextMenuItems[1]).toEqual([]);
                expect(elScope.$ctrl.contextMenuItems[2]).toEqual([action]);
            });
        });

        // SKY-style tests
        it('should display names or titles correctly', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                rows;

            $scope.options = {
                columns: [
                    {
                        name: "test1",
                        jsonMap: "testProperty1"
                    },
                    {
                        name: "test2",
                        jsonMap: "testProperty2",
                        title: "title2"
                    },
                    {
                        name: "test3",
                        jsonMap: "testProperty3"
                    },
                    {
                        name: "test4",
                        jsonMap: "testProperty4",
                        title: "title4"
                    }
                ],
                data: []
            };

            $scope.unsortable = true;

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            rows = compiledElement.find('.bb-reorder-table-label-cell');

            expect($(rows[0]).html()).toContain($scope.options.columns[0].name);
            expect($(rows[0]).html()).not.toContain($scope.options.columns[0].title);
            expect($(rows[1]).html()).not.toContain($scope.options.columns[1].name);
            expect($(rows[1]).html()).toContain($scope.options.columns[1].title);
            expect($(rows[2]).html()).toContain($scope.options.columns[2].name);
            expect($(rows[2]).html()).not.toContain($scope.options.columns[2].title);
            expect($(rows[3]).html()).not.toContain($scope.options.columns[3].name);
            expect($(rows[3]).html()).toContain($scope.options.columns[3].title);
        });

        it('should display with proper width', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                cells;

            $scope.options = {
                columns: [
                    {
                        name: "test1",
                        jsonMap: "testProperty1",
                        width: "60px"
                    },
                    {
                        name: "test2",
                        jsonMap: "testProperty2",
                        width: "90px"
                    },
                    {
                        name: "test3",
                        jsonMap: "testProperty3",
                        width: "120px"
                    }
                ],
                data: [
                    { id: 0, testProperty1: 123, testProperty2: -123, testProperty3: 1 },
                    { id: 1, testProperty1: 456, testProperty2: -456, testProperty3: 10 },
                    { id: 2, testProperty1: 789, testProperty2: -789, testProperty3: 100 }
                ],
                index: "id"
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            cells = compiledElement.find('.bb-reorder-table-col');

            expect($(cells[0]).width()).toEqual(60);
            expect($(cells[1]).width()).toEqual(90);
            expect($(cells[2]).width()).toEqual(120);

            expect($(cells[3]).width()).toEqual(60);
            expect($(cells[4]).width()).toEqual(90);
            expect($(cells[5]).width()).toEqual(120);

            expect($(cells[6]).width()).toEqual(60);
            expect($(cells[7]).width()).toEqual(90);
            expect($(cells[8]).width()).toEqual(120);
        });

        it('should display normal booleans as checkboxes', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                boxes;

            $scope.options = {
                columns: [
                    {
                        name: "bool",
                        jsonMap: "testProperty",
                        isBool: {}
                    }
                ],
                data: [
                    { id: 0, testProperty: true },
                    { id: 1, testProperty: false }
                ],
                index: "id"
            };

            $scope.unsortable = true;

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            boxes = compiledElement.find('.bb-reorder-table-cell-check input');

            expect($(boxes[0]).prop('checked')).toEqual($scope.options.data[0].testProperty);
            expect($(boxes[1]).prop('checked')).toEqual($scope.options.data[1].testProperty);

            expect($(boxes[0]).prop('disabled')).toEqual(false);
            expect($(boxes[1]).prop('disabled')).toEqual(false);
        });

        it('should display inverted booleans as inverted checkboxes', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                boxes;

            $scope.options = {
                columns: [
                    {
                        name: "bool",
                        jsonMap: "testProperty",
                        isBool: { isInverted: true }
                    }
                ],
                data: [
                    { id: 0, testProperty: true },
                    { id: 1, testProperty: false }
                ],
                index: "id"
            };

            $scope.unsortable = true;

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            boxes = compiledElement.find('.bb-reorder-table-cell-check input');

            expect($(boxes[0]).prop('checked')).not.toEqual($scope.options.data[0].testProperty);
            expect($(boxes[1]).prop('checked')).not.toEqual($scope.options.data[1].testProperty);

            expect($(boxes[0]).prop('disabled')).toEqual(false);
            expect($(boxes[1]).prop('disabled')).toEqual(false);
        });

        it('should display booleans on disabled rows as disabled checkboxes', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                boxes;

            $scope.options = {
                columns: [
                    {
                        name: "bool",
                        jsonMap: "testProperty",
                        isBool: {
                            disableRow: function (b) {
                                return b.id === 1;
                            }
                        }
                    }
                ],
                data: [
                    { id: 0, testProperty: true },
                    { id: 1, testProperty: false },
                    { id: 2, testProperty: true }
                ],
                index: "id"
            };

            $scope.unsortable = true;

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            boxes = compiledElement.find('.bb-reorder-table-cell-check input');

            expect($(boxes[0]).prop('checked')).toEqual($scope.options.data[0].testProperty);
            expect($(boxes[1]).prop('checked')).toEqual($scope.options.data[1].testProperty);
            expect($(boxes[1]).prop('checked')).toEqual($scope.options.data[1].testProperty);

            expect($(boxes[0]).prop('disabled')).toEqual(false);
            expect($(boxes[1]).prop('disabled')).toEqual(true);
            expect($(boxes[2]).prop('disabled')).toEqual(false);
        });

        it('should display booleans on disabled columns as disabled checkboxes', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                boxes;

            $scope.options = {
                columns: [
                    {
                        name: "bool1",
                        jsonMap: "testProperty1",
                        isBool: {}
                    },
                    {
                        name: "bool2",
                        jsonMap: "testProperty2",
                        isBool: { disableCol: true }
                    }
                ],
                data: [
                    { id: 0, testProperty1: true, testProperty2: false },
                    { id: 1, testProperty1: false, testProperty2: true },
                    { id: 2, testProperty1: true, testProperty2: false }
                ],
                index: "id"
            };

            $scope.unsortable = true;

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            boxes = compiledElement.find('.bb-reorder-table-cell-check input');

            expect($(boxes[0]).prop('checked')).toEqual($scope.options.data[0].testProperty1);
            expect($(boxes[1]).prop('checked')).toEqual($scope.options.data[0].testProperty2);

            expect($(boxes[2]).prop('checked')).toEqual($scope.options.data[1].testProperty1);
            expect($(boxes[3]).prop('checked')).toEqual($scope.options.data[1].testProperty2);

            expect($(boxes[4]).prop('checked')).toEqual($scope.options.data[2].testProperty1);
            expect($(boxes[5]).prop('checked')).toEqual($scope.options.data[2].testProperty2);


            expect($(boxes[0]).prop('disabled')).toEqual(false);
            expect($(boxes[1]).prop('disabled')).toEqual(true);

            expect($(boxes[2]).prop('disabled')).toEqual(false);
            expect($(boxes[3]).prop('disabled')).toEqual(true);

            expect($(boxes[4]).prop('disabled')).toEqual(false);
            expect($(boxes[5]).prop('disabled')).toEqual(true);
        });

        it('should display lock on fixed rows', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                firstRow,
                secondRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                fixed: 2
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            firstRow = compiledElement.find('.bb-reorder-table-row-container')[0];
            secondRow = compiledElement.find('.bb-reorder-table-row-container')[1];

            expect($(firstRow).find('.bb-reorder-table-col-top .bb-reorder-table-lock').hasClass('ng-hide')).toBeFalsy();
            expect($(secondRow).find('.bb-reorder-table-col-top .bb-reorder-table-lock').hasClass('ng-hide')).toBeFalsy();
        });

        it('should hide lock on non-fixed rows', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                secondRow,
                thirdRow,
                fourthRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                fixed: 1
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            secondRow = compiledElement.find('.bb-reorder-table-row-container')[1];
            thirdRow = compiledElement.find('.bb-reorder-table-row-container')[2];
            fourthRow = compiledElement.find('.bb-reorder-table-row-container')[3];

            expect($(secondRow).find('.bb-reorder-table-col-top .bb-reorder-table-lock').length).toBeFalsy();
            expect($(thirdRow).find('.bb-reorder-table-col-top .bb-reorder-table-lock').length).toBeFalsy();
            expect($(fourthRow).find('.bb-reorder-table-col-top .bb-reorder-table-lock').length).toBeFalsy();
        });

        it('should hide sorting elements when rows less than 2', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                iconLabel,
                topLabel,
                iconCols,
                topCols;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 }
                ],
                index: "id"
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            iconLabel = compiledElement.find('.bb-reorder-table-label-icon').length;
            topLabel = compiledElement.find('.bb-reorder-table-label-top').length;
            iconCols = compiledElement.find('.bb-reorder-table-col-icon').length;
            topCols = compiledElement.find('.bb-reorder-table-col-top').length;

            expect(iconLabel).toEqual(0);
            expect(iconCols).toEqual(0);
            expect(topLabel).toEqual(0);
            expect(topCols).toEqual(0);
        });

        it('should hide sorting elements when rows less than fixed', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                iconLabel,
                topLabel,
                iconCols,
                topCols;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 }
                ],
                index: "id",
                fixed: 3
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            iconLabel = compiledElement.find('.bb-reorder-table-label-icon').length;
            topLabel = compiledElement.find('.bb-reorder-table-label-top').length;
            iconCols = compiledElement.find('.bb-reorder-table-col-icon').length;
            topCols = compiledElement.find('.bb-reorder-table-col-top').length;

            expect(iconLabel).toEqual(0);
            expect(iconCols).toEqual(0);
            expect(topLabel).toEqual(0);
            expect(topCols).toEqual(0);
        });

        it('should hide sorting elements when rows equal to fixed', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                iconLabel,
                topLabel,
                iconCols,
                topCols;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 }
                ],
                index: "id",
                fixed: 2
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            iconLabel = compiledElement.find('.bb-reorder-table-label-icon').length;
            topLabel = compiledElement.find('.bb-reorder-table-label-top').length;
            iconCols = compiledElement.find('.bb-reorder-table-col-icon').length;
            topCols = compiledElement.find('.bb-reorder-table-col-top').length;

            expect(iconLabel).toEqual(0);
            expect(iconCols).toEqual(0);
            expect(topLabel).toEqual(0);
            expect(topCols).toEqual(0);
        });

        it('should hide sorting elements when not sortable', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                iconLabel,
                topLabel,
                iconCols,
                topCols;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 }
                ],
                index: "id"
            };

            $scope.unsortable = true;

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            iconLabel = compiledElement.find('.bb-reorder-table-label-icon').length;
            topLabel = compiledElement.find('.bb-reorder-table-label-top').length;
            iconCols = compiledElement.find('.bb-reorder-table-col-icon').length;
            topCols = compiledElement.find('.bb-reorder-table-col-top').length;

            expect(iconLabel).toEqual(0);
            expect(iconCols).toEqual(0);
            expect(topLabel).toEqual(0);
            expect(topCols).toEqual(0);
        });

        it('should display sorting elements when sortable', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                iconLabel,
                topLabel,
                iconCols,
                topCols;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 }
                ],
                index: "id"
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            iconLabel = compiledElement.find('.bb-reorder-table-label-icon').length;
            topLabel = compiledElement.find('.bb-reorder-table-label-top').length;
            iconCols = compiledElement.find('.bb-reorder-table-col-icon').length;
            topCols = compiledElement.find('.bb-reorder-table-col-top').length;

            expect(iconLabel).toEqual(1);
            expect(iconCols).toEqual(2);
            expect(topLabel).toEqual(1);
            expect(topCols).toEqual(2);
        });

        it('should hide the ability to send the first row to the top', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                firstRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 }
                ],
                index: "id"
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            firstRow = compiledElement.find('.bb-reorder-table-row')[0];

            expect($(firstRow).find('.bb-reorder-table-col-top button').length).toBeFalsy();
        });

        it('should hide the ability to send the first non-fixed row to the top', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                firstRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                fixed: 1
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            firstRow = compiledElement.find('.bb-reorder-table-row-container')[0];

            expect($(firstRow).find('.bb-reorder-table-col-top button').length).toBeFalsy();
        });

        it('should hide the ability to send fixed rows to the top', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                firstRow,
                secondRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                fixed: 2
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            firstRow = compiledElement.find('.bb-reorder-table-row-container')[0];
            secondRow = compiledElement.find('.bb-reorder-table-row-container')[1];

            expect($(firstRow).find('.bb-reorder-table-col-top button').length).toBeFalsy();
            expect($(secondRow).find('.bb-reorder-table-col-top button').length).toBeFalsy();
        });

        it('should allow rows after the first non-fixed row to be sent to the top', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                thirdRow,
                fourthRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                fixed: 1
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            thirdRow = compiledElement.find('.bb-reorder-table-row-container')[2];
            fourthRow = compiledElement.find('.bb-reorder-table-row-container')[3];

            expect($(thirdRow).find('.bb-reorder-table-col-top button').hasClass('ng-hide')).toBeFalsy();
            expect($(fourthRow).find('.bb-reorder-table-col-top button').hasClass('ng-hide')).toBeFalsy();
        });

        it('should hide the current sort number when the list is not being sorted', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                firstRow,
                secondRow,
                thirdRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 }
                ],
                index: "id"
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            elScope.$ctrl.sorting = false;

            firstRow = compiledElement.find('.bb-reorder-table-row-container')[0];
            secondRow = compiledElement.find('.bb-reorder-table-row-container')[1];
            thirdRow = compiledElement.find('.bb-reorder-table-row-container')[2];

            expect($(firstRow).find('.bb-reorder-table-col-top .bb-reorder-table-sorting-number').length).toBeFalsy();
            expect($(secondRow).find('.bb-reorder-table-col-top .bb-reorder-table-sorting-number').length).toBeFalsy();
            expect($(thirdRow).find('.bb-reorder-table-col-top .bb-reorder-table-sorting-number').length).toBeFalsy();
        });

        it('should hide the current sort number for fixed rows', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                firstRow,
                secondRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 }
                ],
                index: "id",
                fixed: 2
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            elScope.$ctrl.sorting = false;

            firstRow = compiledElement.find('.bb-reorder-table-row-container')[0];
            secondRow = compiledElement.find('.bb-reorder-table-row-container')[1];

            expect($(firstRow).find('.bb-reorder-table-col-top button').length).toBeFalsy();
            expect($(secondRow).find('.bb-reorder-table-col-top button').length).toBeFalsy();


            elScope.$ctrl.sorting = true;

            firstRow = compiledElement.find('.bb-reorder-table-row-container')[0];
            secondRow = compiledElement.find('.bb-reorder-table-row-container')[1];

            expect($(firstRow).find('.bb-reorder-table-col-top button').length).toBeFalsy();
            expect($(secondRow).find('.bb-reorder-table-col-top button').length).toBeFalsy();
        });

        it('should show the current sort number when the list is being sorted', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                firstRow,
                secondRow,
                thirdRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 }
                ],
                index: "id"
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            elScope.$ctrl.sorting = false;

            firstRow = compiledElement.find('.bb-reorder-table-row-container')[0];
            secondRow = compiledElement.find('.bb-reorder-table-row-container')[1];
            thirdRow = compiledElement.find('.bb-reorder-table-row-container')[2];

            expect($(firstRow).find('.bb-reorder-table-col-top button').hasClass('ng-hide')).toBeFalsy();
            expect($(secondRow).find('.bb-reorder-table-col-top button').hasClass('ng-hide')).toBeFalsy();
            expect($(thirdRow).find('.bb-reorder-table-col-top button').hasClass('ng-hide')).toBeFalsy();
        });

        it('should display context menu on rows with menu items when available', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                secondRow,
                fourthRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                getContextMenuItems: function (obj) {
                    if (obj.id === 1 || obj.id === 3) {
                        return [
                            {
                                id: 0,
                                title: "Action 1",
                                cmd: function () { }
                            }
                        ];
                    }
                }
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            secondRow = compiledElement.find('.bb-reorder-table-row-container')[1];
            fourthRow = compiledElement.find('.bb-reorder-table-row-container')[3];

            expect($(secondRow).find('.bb-reorder-table-context bb-context-menu').hasClass('ng-hide')).toBeFalsy();
            expect($(fourthRow).find('.bb-reorder-table-context bb-context-menu').hasClass('ng-hide')).toBeFalsy();
        });

        it('should hide context menu on rows with menu items when unavailable', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                firstRow,
                thirdRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                getContextMenuItems: function (obj) {
                    if (obj.id === 1 || obj.id === 3) {
                        return [
                            {
                                id: 0,
                                title: "Action 1",
                                cmd: function () { }
                            }
                        ];
                    }
                }
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            firstRow = compiledElement.find('.bb-reorder-table-row-container')[0];
            thirdRow = compiledElement.find('.bb-reorder-table-row-container')[2];

            expect($(firstRow).find('.bb-reorder-table-context bb-context-menu').length).toBeFalsy();
            expect($(thirdRow).find('.bb-reorder-table-context bb-context-menu').length).toBeFalsy();
        });

        it('should hide context menu column when there is no item function', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                contextLabels,
                contextCols;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id"
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            contextLabels = compiledElement.find('.bb-reorder-table-label-context');
            contextCols = compiledElement.find('.bb-reorder-table-col-context');

            expect(contextLabels.length).toBeFalsy();
            expect(contextCols.length).toBeFalsy();
        });

        it('should show context menu column when there is item function', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                contextLabels,
                contextCols;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                getContextMenuItems: function () {
                    return {};
                }
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            contextLabels = compiledElement.find('.bb-reorder-table-label-context');
            contextCols = compiledElement.find('.bb-reorder-table-col-context');

            expect(contextLabels.length).toEqual(1);
            expect(contextCols.length).toEqual(4);
        });

        it('should display fixed rows with appropriate class', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                firstRow,
                secondRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                fixed: 2
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            firstRow = compiledElement.find('.bb-reorder-table-container').children()[0];
            secondRow = compiledElement.find('.bb-reorder-table-container').children()[1];

            expect($(firstRow).hasClass('bb-reorder-table-row-fixed')).toBeTruthy();
            expect($(secondRow).hasClass('bb-reorder-table-row-fixed')).toBeTruthy();
            expect($(firstRow).hasClass('bb-reorder-table-row')).toBeFalsy();
            expect($(secondRow).hasClass('bb-reorder-table-row')).toBeFalsy();
        });

        it('should display templated items with appropriate text and class', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                firstRow,
                secondRow;

            $scope.options = {
                columns: [
                    {
                        name: "testText",
                        jsonMap: "testText",
                        templateFn: function (item) {
                            if (item.id === 1) {
                                return { text: item.testText, elClass: item.testClass };
                            } else {
                                return { text: 'Fail' };
                            }
                        }
                    }
                ],
                data: [
                    { id: 0, testText: 123, testClass: 'itemOne' },
                    { id: 1, testText: 456, testClass: 'itemTwo' }
                ],
                index: "id"
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            firstRow = compiledElement.find('.bb-reorder-table-col div div')[0];
            secondRow = compiledElement.find('.bb-reorder-table-col div div')[1];

            expect($(firstRow).hasClass('itemOne')).toBeFalsy();
            expect($(secondRow).hasClass('itemTwo')).toBeTruthy();

            expect($(firstRow).html()).toContain('Fail');
            expect($(secondRow).html()).toContain(456);
        });

        it('should hide hidden columns', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                labels,
                cells;

            $scope.options = {
                columns: [
                    {
                        name: "test1",
                        jsonMap: "testProperty1"
                    },
                    {
                        name: "test2",
                        jsonMap: "testProperty2",
                        show: false
                    },
                    {
                        name: "test3",
                        jsonMap: "testProperty3"
                    }
                ],
                data: [
                    { id: 0, testProperty1: 123, testProperty2: -123, testProperty3: 1 },
                    { id: 1, testProperty1: 456, testProperty2: -456, testProperty3: 10 },
                    { id: 2, testProperty1: 789, testProperty2: -789, testProperty3: 100 }
                ],
                index: "id"
            };

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            labels = compiledElement.find('.bb-reorder-table-label-cell');
            cells = compiledElement.find('.bb-reorder-table-col');

            expect($(labels[1]).html()).toContain('test1');
            expect($(labels[2]).html()).toContain('test3');

            expect($(cells[0]).html()).toContain(123);
            expect($(cells[1]).html()).toContain(1);

            expect($(cells[2]).html()).toContain(456);
            expect($(cells[3]).html()).toContain(10);

            expect($(cells[4]).html()).toContain(789);
            expect($(cells[5]).html()).toContain(100);
        });

        it('should send to top of non-fixed rows', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                fourthRow,
                animateCallback;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                fixed: 1
            };

            spyOn($.fn, 'fadeOut');

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            fourthRow = $(compiledElement.find('.bb-reorder-table-row')[2]);
            fourthRow.find('.bb-reorder-table-col-top button').trigger('click');

            expect($(fourthRow).hasClass('bb-reorder-table-row-placeholder')).toBeTruthy();
            expect($(fourthRow).find('.bb-reorder-table-context bb-context-menu').length).toBeFalsy();
            expect(compiledElement.find('.bb-reorder-table-animate-element').length).toBeTruthy();

            animateCallback = $.fn.fadeOut.calls.argsFor(0)[0].always;
            animateCallback(); // act as though the animation finished

            expect($($(compiledElement.find('.bb-reorder-table-row')[0]).find('.bb-reorder-table-col')[0]).html()).toContain('1000');
            expect(elScope.$ctrl.options.data[1].testProperty).toBe(1000);

            expect($(fourthRow).hasClass('.bb-reorder-table-row-placeholder')).toBeFalsy();
            expect(compiledElement.find('.bb-reorder-table-animate-element').length).toBeFalsy();
        });

        it('should handle the sortable start event', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                startEventCallback,
                eventArg,
                rows;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                fixed: 1
            };

            spyOn($.fn, 'sortable');

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            eventArg = {
                item: $(compiledElement),
                placeholder: $(compiledElement)
            };

            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            expect(elScope.$ctrl.sorting).toBeTruthy();

            rows = compiledElement.find('.bb-reorder-table-row');

            $.each(rows, function (i, item) {
                expect($($(item).find('.bb-reorder-table-sorting-number')).html()).toContain((i + 2).toString());
            });
        });

        it('should handle the sortable stop event', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                startEventCallback,
                stopEventCallback,
                eventArg;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                fixed: 1
            };

            spyOn($.fn, 'sortable');

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            eventArg = {
                item: $(compiledElement),
                placeholder: $(compiledElement)
            };

            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            eventArg = {
                item: $(compiledElement),
                placeholder: $(compiledElement)
            };

            stopEventCallback = $.fn.sortable.calls.argsFor(0)[0].stop;
            stopEventCallback(null, eventArg);

            $timeout.flush();

            expect(elScope.$ctrl.sorting).toBeFalsy();
        });

        it('should handle the sortable change event', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                updateEventCallback,
                eventArg;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id",
                fixed: 1
            };

            spyOn($.fn, 'sortable');

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

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
                compiledElement,
                elScope,
                changeEventCallback,
                startEventCallback,
                eventArg,
                rows,
                rowBeingMoved,
                placeholder,
                containerEl,
                newOrder = ['2', '3', '4', '1'];

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id"
            };

            spyOn($.fn, 'sortable');

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            containerEl = compiledElement.find('.bb-reorder-table-container');

            rowBeingMoved = $(compiledElement.find('.bb-reorder-table-row')[3]);

            placeholder = $('<div id="placeholder"></div>');
            containerEl.append(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            containerEl.find('#placeholder').remove();

            placeholder = $('<div id="placeholder"></div>');
            containerEl.prepend(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            changeEventCallback = $.fn.sortable.calls.argsFor(0)[0].change;
            changeEventCallback(null, eventArg);

            elScope.$ctrl.sorting = true;

            rows = compiledElement.find('.bb-reorder-table-row');

            expect($(rows[0]).find('.bb-reorder-table-sorting-number').html()).toContain(newOrder[0]);
            expect($(rows[1]).find('.bb-reorder-table-sorting-number').html()).toContain(newOrder[1]);
            expect($(rows[2]).find('.bb-reorder-table-sorting-number').html()).toContain(newOrder[2]);
            expect($(rows[3]).find('.bb-reorder-table-sorting-number').html()).toContain(newOrder[3]);
        });

        it('should set the position numbers correctly when moving the sorting item from top to bottom', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                changeEventCallback,
                startEventCallback,
                eventArg,
                rows,
                rowBeingMoved,
                placeholder,
                containerEl,
                newOrder = ['4', '1', '2', '3'];

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id"
            };

            spyOn($.fn, 'sortable');

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            containerEl = compiledElement.find('.bb-reorder-table-container');

            rowBeingMoved = $(compiledElement.find('.bb-reorder-table-row')[0]);

            placeholder = $('<div id="placeholder"></div>');
            containerEl.prepend(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            containerEl.find('#placeholder').remove();

            placeholder = $('<div id="placeholder"></div>');
            containerEl.append(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            changeEventCallback = $.fn.sortable.calls.argsFor(0)[0].change;
            changeEventCallback(null, eventArg);

            //elScope.$ctrl.sorting = true;

            rows = compiledElement.find('.bb-reorder-table-row');

            expect($(rows[0]).find('.bb-reorder-table-sorting-number').html()).toContain(newOrder[0]);
            expect($(rows[1]).find('.bb-reorder-table-sorting-number').html()).toContain(newOrder[1]);
            expect($(rows[2]).find('.bb-reorder-table-sorting-number').html()).toContain(newOrder[2]);
            expect($(rows[3]).find('.bb-reorder-table-sorting-number').html()).toContain(newOrder[3]);
        });

        it('should handle the sortable change event that can fire if no change was actually made', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                changeEventCallback,
                startEventCallback,
                eventArg,
                rows,
                rowBeingMoved,
                placeholder;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id"
            };

            spyOn($.fn, 'sortable');

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            rowBeingMoved = $(compiledElement.find('.bb-reorder-table-row')[0]);
            placeholder = $('<div id="placeholder"></div>');
            rowBeingMoved.after(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            changeEventCallback = $.fn.sortable.calls.argsFor(0)[0].change;
            changeEventCallback(null, eventArg);

            elScope.$ctrl.sorting = true;

            rows = compiledElement.find('.bb-reorder-table-row');

            expect($(rows[0]).find('.bb-reorder-table-sorting-number').html()).toContain(1);
            expect($(rows[1]).find('.bb-reorder-table-sorting-number').html()).toContain(2);
            expect($(rows[2]).find('.bb-reorder-table-sorting-number').html()).toContain(3);
            expect($(rows[3]).find('.bb-reorder-table-sorting-number').html()).toContain(4);
        });

        it('should handle the sortable change event libbcyle from start to finish', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                startEventCallback,
                updateEventCallback,
                stopEventCallback,
                eventArg,
                rows,
                rowBeingMoved,
                placeholder;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonMap: "testProperty"
                    }
                ],
                data: [
                    { id: 0, testProperty: 123 },
                    { id: 1, testProperty: 456 },
                    { id: 2, testProperty: 789 },
                    { id: 3, testProperty: 1000 }
                ],
                index: "id"
            };

            spyOn($.fn, 'sortable');

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            rowBeingMoved = $(compiledElement.find('.bb-reorder-table-row')[1]);
            placeholder = $('<div id="placeholder"></div>');
            rowBeingMoved.after(placeholder);

            eventArg = {
                item: rowBeingMoved,
                placeholder: placeholder
            };

            startEventCallback = $.fn.sortable.calls.argsFor(0)[0].start;
            startEventCallback(null, eventArg);

            eventArg = {
                item: {
                    index: jasmine.createSpy().and.returnValue(2)
                }
            };

            updateEventCallback = $.fn.sortable.calls.argsFor(0)[0].update;
            updateEventCallback(null, eventArg);

            eventArg = {
                item: rowBeingMoved
            };

            stopEventCallback = $.fn.sortable.calls.argsFor(0)[0].stop;
            stopEventCallback(null, eventArg);

            elScope.$ctrl.sorting = true;

            rows = compiledElement.find('.bb-reorder-table-row');

            expect($(rows[0]).html()).toContain(123);
            expect($(rows[1]).html()).toContain(789);
            expect($(rows[2]).html()).toContain(456);
            expect($(rows[3]).html()).toContain(1000);
        });


        describe('isFixed', function () {

            it('returns true for index less than set', function () {
                var $scope = $rootScope.$new(),
                    compiledElement,
                    elScope,
                    ret;

                $scope.options = { fixed: 1 };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                ret = elScope.$ctrl.isFixed(0);

                expect(ret).toBeTruthy();
            });

            it('returns false for index equal to set', function () {
                var $scope = $rootScope.$new(),
                    compiledElement,
                    elScope,
                    ret;

                $scope.options = { fixed: 1 };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                ret = elScope.$ctrl.isFixed(1);

                expect(ret).toBeFalsy();
            });

            it('returns false for index greater than set', function () {
                var $scope = $rootScope.$new(),
                    compiledElement,
                    elScope,
                    ret;

                $scope.options = { fixed: 1 };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                ret = elScope.$ctrl.isFixed(2);

                expect(ret).toBeFalsy();
            });

            it('returns true for non-number index', function () {
                var $scope = $rootScope.$new(),
                    compiledElement,
                    elScope,
                    ret;

                $scope.options = { fixed: 0 };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                ret = elScope.$ctrl.isFixed("number");
                expect(ret).toBeTruthy();
                ret = elScope.$ctrl.isFixed(null);
                expect(ret).toBeTruthy();
                ret = elScope.$ctrl.isFixed(undefined);
                expect(ret).toBeTruthy();
                ret = elScope.$ctrl.isFixed({});
                expect(ret).toBeTruthy();
                ret = elScope.$ctrl.isFixed([]);
                expect(ret).toBeTruthy();
            });

        });

        describe('setFixed', function () {

            it('returns fixed for index less than set', function () {
                var $scope = $rootScope.$new(),
                    compiledElement,
                    elScope,
                    expected,
                    ret;

                $scope.options = { fixed: 1 };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                expected = 'bb-reorder-table-row-fixed';
                ret = elScope.$ctrl.setFixed(0);

                expect(ret).toEqual(expected);
            });

            it('returns not fixed for index equal to set', function () {
                var $scope = $rootScope.$new(),
                    compiledElement,
                    elScope,
                    expected,
                    ret;

                $scope.options = { fixed: 1 };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                expected = 'bb-reorder-table-row';
                ret = elScope.$ctrl.setFixed(1);

                expect(ret).toEqual(expected);
            });

            it('returns not fixed for index greater than set', function () {
                var $scope = $rootScope.$new(),
                    compiledElement,
                    elScope,
                    expected,
                    ret;

                $scope.options = { fixed: 1 };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                expected = 'bb-reorder-table-row';
                ret = elScope.$ctrl.setFixed(2);

                expect(ret).toEqual(expected);
            });

            it('returns fixed for non-number index', function () {
                var $scope = $rootScope.$new(),
                    compiledElement,
                    elScope,
                    expected,
                    ret;

                $scope.options = { fixed: 0 };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                expected = 'bb-reorder-table-row-fixed';

                ret = elScope.$ctrl.setFixed("number");
                expect(ret).toEqual(expected);
                ret = elScope.$ctrl.setFixed(null);
                expect(ret).toEqual(expected);
                ret = elScope.$ctrl.setFixed(undefined);
                expect(ret).toEqual(expected);
                ret = elScope.$ctrl.setFixed({});
                expect(ret).toEqual(expected);
                ret = elScope.$ctrl.setFixed([]);
                expect(ret).toEqual(expected);
            });

        });

        describe('pushToTop', function () {

            describe('moves to top of non-fixed list', function () {

                it('when zero indexed', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope,
                        item;

                    $scope.options = {
                        columns: [
                            {
                                name: "test",
                                jsonMap: "testProperty"
                            }
                        ],
                        data: [
                            { id: 0, testProperty: 123 },
                            { id: 1, testProperty: 456 },
                            { id: 2, testProperty: 789 },
                            { id: 3, testProperty: -999 }
                        ],
                        index: "id",
                        oneIndexed: false
                    };

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    item = elScope.$ctrl.options.data[2];

                    elScope.$ctrl.pushToTop(item);

                    expect($scope.options.data[0].testProperty).toEqual(789);
                    expect($scope.options.data[0].id).toEqual(0);
                    expect($scope.options.data[1].testProperty).toEqual(123);
                    expect($scope.options.data[1].id).toEqual(1);
                    expect($scope.options.data[2].testProperty).toEqual(456);
                    expect($scope.options.data[2].id).toEqual(2);
                    expect($scope.options.data[3].testProperty).toEqual(-999);
                    expect($scope.options.data[3].id).toEqual(3);
                });

                it('when one indexed', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope,
                        item;

                    $scope.options = {
                        columns: [
                            {
                                name: "test",
                                jsonMap: "testProperty"
                            }
                        ],
                        data: [
                            { id: 1, testProperty: 123 },
                            { id: 2, testProperty: 456 },
                            { id: 3, testProperty: 789 },
                            { id: 4, testProperty: -999 }
                        ],
                        index: "id",
                        oneIndexed: true
                    };

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    item = elScope.$ctrl.options.data[2];

                    elScope.$ctrl.pushToTop(item);

                    expect($scope.options.data[0].testProperty).toEqual(789);
                    expect($scope.options.data[0].id).toEqual(1);
                    expect($scope.options.data[1].testProperty).toEqual(123);
                    expect($scope.options.data[1].id).toEqual(2);
                    expect($scope.options.data[2].testProperty).toEqual(456);
                    expect($scope.options.data[2].id).toEqual(3);
                    expect($scope.options.data[3].testProperty).toEqual(-999);
                    expect($scope.options.data[3].id).toEqual(4);
                });
            });

            describe('moves to top for index greater than fixed', function () {

                it('when zero indexed', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope,
                        item;

                    $scope.options = {
                        columns: [
                            {
                                name: "test",
                                jsonMap: "testProperty"
                            }
                        ],
                        data: [
                            { id: 0, testProperty: 123 },
                            { id: 1, testProperty: 456 },
                            { id: 2, testProperty: 789 },
                            { id: 3, testProperty: -999 }
                        ],
                        index: "id",
                        oneIndexed: false,
                        fixed: 1
                    };

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    item = elScope.$ctrl.options.data[2];

                    elScope.$ctrl.pushToTop(item);

                    expect($scope.options.data[0].testProperty).toEqual(123);
                    expect($scope.options.data[0].id).toEqual(0);
                    expect($scope.options.data[1].testProperty).toEqual(789);
                    expect($scope.options.data[1].id).toEqual(1);
                    expect($scope.options.data[2].testProperty).toEqual(456);
                    expect($scope.options.data[2].id).toEqual(2);
                    expect($scope.options.data[3].testProperty).toEqual(-999);
                    expect($scope.options.data[3].id).toEqual(3);
                });

                it('when one indexed', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope,
                        item;

                    $scope.options = {
                        columns: [
                            {
                                name: "test",
                                jsonMap: "testProperty"
                            }
                        ],
                        data: [
                            { id: 1, testProperty: 123 },
                            { id: 2, testProperty: 456 },
                            { id: 3, testProperty: 789 },
                            { id: 4, testProperty: -999 }
                        ],
                        index: "id",
                        oneIndexed: true,
                        fixed: 1
                    };

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    item = elScope.$ctrl.options.data[2];

                    elScope.$ctrl.pushToTop(item);

                    expect($scope.options.data[0].testProperty).toEqual(123);
                    expect($scope.options.data[0].id).toEqual(1);
                    expect($scope.options.data[1].testProperty).toEqual(789);
                    expect($scope.options.data[1].id).toEqual(2);
                    expect($scope.options.data[2].testProperty).toEqual(456);
                    expect($scope.options.data[2].id).toEqual(3);
                    expect($scope.options.data[3].testProperty).toEqual(-999);
                    expect($scope.options.data[3].id).toEqual(4);
                });
            });

            describe('does not moves to top', function () {

                it('for index less than fixed', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope,
                        item;

                    $scope.options = {
                        columns: [
                            {
                                name: "test",
                                jsonMap: "testProperty"
                            }
                        ],
                        data: [
                            { id: 0, testProperty: 123 },
                            { id: 1, testProperty: 456 },
                            { id: 2, testProperty: 789 },
                            { id: 3, testProperty: -999 }
                        ],
                        index: "id",
                        oneIndexed: false,
                        fixed: 2
                    };

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    item = elScope.$ctrl.options.data[1];

                    elScope.$ctrl.pushToTop(item);

                    expect($scope.options.data[0].testProperty).toEqual(123);
                    expect($scope.options.data[0].id).toEqual(0);
                    expect($scope.options.data[1].testProperty).toEqual(456);
                    expect($scope.options.data[1].id).toEqual(1);
                    expect($scope.options.data[2].testProperty).toEqual(789);
                    expect($scope.options.data[2].id).toEqual(2);
                    expect($scope.options.data[3].testProperty).toEqual(-999);
                    expect($scope.options.data[3].id).toEqual(3);
                });

                it('for index equal to fixed', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope,
                        item;

                    $scope.options = {
                        columns: [
                            {
                                name: "test",
                                jsonMap: "testProperty"
                            }
                        ],
                        data: [
                            { id: 1, testProperty: 123 },
                            { id: 2, testProperty: 456 },
                            { id: 3, testProperty: 789 },
                            { id: 4, testProperty: -999 }
                        ],
                        index: "id",
                        oneIndexed: true,
                        fixed: 2
                    };

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    item = elScope.$ctrl.options.data[2];

                    elScope.$ctrl.pushToTop(item);

                    expect($scope.options.data[0].testProperty).toEqual(123);
                    expect($scope.options.data[0].id).toEqual(1);
                    expect($scope.options.data[1].testProperty).toEqual(456);
                    expect($scope.options.data[1].id).toEqual(2);
                    expect($scope.options.data[2].testProperty).toEqual(789);
                    expect($scope.options.data[2].id).toEqual(3);
                    expect($scope.options.data[3].testProperty).toEqual(-999);
                    expect($scope.options.data[3].id).toEqual(4);
                });

                it('when not sortable', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope,
                        item;

                    $scope.options = {
                        columns: [
                            {
                                name: "test",
                                jsonMap: "testProperty"
                            }
                        ],
                        data: [
                            { id: 1, testProperty: 123 },
                            { id: 2, testProperty: 456 },
                            { id: 3, testProperty: 789 },
                            { id: 4, testProperty: -999 }
                        ],
                        index: "id"
                    };
                    $scope.unsortable = true;

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    item = elScope.$ctrl.options.data[2];

                    elScope.$ctrl.pushToTop(item);

                    expect($scope.options.data[0].testProperty).toEqual(123);
                    expect($scope.options.data[0].id).toEqual(1);
                    expect($scope.options.data[1].testProperty).toEqual(456);
                    expect($scope.options.data[1].id).toEqual(2);
                    expect($scope.options.data[2].testProperty).toEqual(789);
                    expect($scope.options.data[2].id).toEqual(3);
                    expect($scope.options.data[3].testProperty).toEqual(-999);
                    expect($scope.options.data[3].id).toEqual(4);
                });
            });
        });
    });
}); // End of function