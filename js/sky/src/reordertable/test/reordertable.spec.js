/*jshint browser: true, jasmine: true */
/*global inject, module, $, spyOn */

describe('Reorder Table', function () {
    'use strict';

    var $compile,
        bbResources,
        $timeout,
        $rootScope,
        $templateCache;

    beforeEach(module(
        'ngMock',
        'sky.reordertable',
        'sky.templates'
    ));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _bbResources_, _$templateCache_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        bbResources = _bbResources_;
        $templateCache = _$templateCache_;
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
                                jsonmap: "testProperty"
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
                                jsonmap: "testProperty"
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

                it('when not sorting', function () {
                    var $scope = $rootScope.$new(),
                        compiledElement,
                        elScope;

                    $scope.options = {
                        columns: [
                            {
                                name: "test",
                                jsonmap: "testProperty"
                            }
                        ],
                        data: [
                            { id: -1, testProperty: 123 },
                            { id: -1, testProperty: 456 },
                            { id: -1, testProperty: 789 }
                        ],
                        index: "id",
                        oneIndexed: false,
                        getContextMenuItems: function () { }
                    };
                    $scope.unsortable = true;

                    compiledElement = getCompiledElement($scope);
                    elScope = compiledElement.isolateScope();

                    expect($scope.options.data[0].testProperty).toEqual(123);
                    expect($scope.options.data[0].id).toEqual(-1);
                    expect($scope.options.data[1].testProperty).toEqual(456);
                    expect($scope.options.data[1].id).toEqual(-1);
                    expect($scope.options.data[2].testProperty).toEqual(789);
                    expect($scope.options.data[2].id).toEqual(-1);
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
                            jsonmap: "testProperty"
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

            it('with options', function () {
                var $scope = $rootScope.$new(),
                    compiledElement,
                    elScope;

                $scope.options = null;

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                expect(elScope.$ctrl.options).toBeTruthy();
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
                        jsonmap: "testProperty1"
                    },
                    {
                        name: "test2",
                        jsonmap: "testProperty2",
                        title: "title2"
                    },
                    {
                        name: "test3",
                        jsonmap: "testProperty3"
                    },
                    {
                        name: "test4",
                        jsonmap: "testProperty4",
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
                        jsonmap: "testProperty1",
                        width: "60px"
                    },
                    {
                        name: "test2",
                        jsonmap: "testProperty2",
                        width: "90px"
                    },
                    {
                        name: "test3",
                        jsonmap: "testProperty3",
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

            expect($(cells[0]).css('width')).toEqual('60px');
            expect($(cells[1]).css('width')).toEqual('90px');
            expect($(cells[2]).css('width')).toEqual('120px');

            expect($(cells[3]).css('width')).toEqual('60px');
            expect($(cells[4]).css('width')).toEqual('90px');
            expect($(cells[5]).css('width')).toEqual('120px');

            expect($(cells[6]).css('width')).toEqual('60px');
            expect($(cells[7]).css('width')).toEqual('90px');
            expect($(cells[8]).css('width')).toEqual('120px');
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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

        it('should display context menu on rows with menu items when available and zero-indexed', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                secondRow,
                fourthRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonmap: "testProperty"
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

        it('should display context menu on rows with menu items when available and one-indexed', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                secondRow,
                fourthRow;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonmap: "testProperty"
                    }
                ],
                data: [
                    { id: 1, testProperty: 123 },
                    { id: 2, testProperty: 456 },
                    { id: 3, testProperty: 789 },
                    { id: 4, testProperty: 1000 }
                ],
                index: "id",
                oneIndexed: true,
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

            secondRow = compiledElement.find('.bb-reorder-table-row-container')[0];
            fourthRow = compiledElement.find('.bb-reorder-table-row-container')[2];

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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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

        // it('should create context menu dropdown with appropriate items', function () {
        //     var $scope = $rootScope.$new(),
        //         compiledElement,
        //         elScope;

        //     $scope.options = {
        //         columns: [
        //             {
        //                 name: "test",
        //                 jsonmap: "testProperty"
        //             }
        //         ],
        //         data: [
        //             { id: 1, testProperty: 123 },
        //             { id: 2, testProperty: 456 },
        //             { id: 3, testProperty: 789 }
        //         ],
        //         index: "id",
        //         oneIndexed: true,
        //         getContextMenuItems: function (obj) {
        //             if (obj.id === 1 || obj.id === 3) {
        //                 return [
        //                     {
        //                         id: 0,
        //                         title: "Action " + obj.id,
        //                         cmd: function () { }
        //                     }
        //                 ];
        //             }
        //         }
        //     };

        //     compiledElement = getCompiledElement($scope);
        //     elScope = compiledElement.isolateScope();
            
        //     expect(compiledElement.find('.bb-reorder-table-col-context .bb-context-menu').length).toEqual(2);
        //     expect(compiledElement.find('.bb-reorder-table-col-context .bb-context-menu')[0]).toHaveText('Action 1');
        //     expect(compiledElement.find('.bb-reorder-table-col-context .bb-context-menu')[1]).toHaveText('Action 3');

        // });

        // it('should set open menu state', function () {
        //     var $scope = $rootScope.$new(),
        //         compiledElement,
        //         contextEl,
        //         elScope;

        //     $scope.options = {
        //         columns: [
        //             {
        //                 name: "test",
        //                 jsonmap: "testProperty"
        //             }
        //         ],
        //         data: [
        //             { id: 1, testProperty: 123 },
        //             { id: 2, testProperty: 456 },
        //             { id: 3, testProperty: 789 }
        //         ],
        //         index: "id",
        //         oneIndexed: true,
        //         getContextMenuItems: function (obj) {
        //             if (obj.id === 1 || obj.id === 3) {
        //                 return [
        //                     {
        //                         id: 0,
        //                         title: "Action 1",
        //                         cmd: function () { }
        //                     }
        //                 ];
        //             }
        //         }
        //     };

        //     compiledElement = getCompiledElement($scope);
        //     elScope = compiledElement.isolateScope();

        //     contextEl = compiledElement.find('.bb-reorder-table-col-context bb-context-menu-button').eq(0);
        //     expect(elScope.$ctrl.menuStates[0]).toBeFalsy();
        //     expect(elScope.$ctrl.menuStates[2]).toBeFalsy();
        //     contextEl.click();
        //     $scope.$digest();
        //     expect(elScope.$ctrl.menuStates[0]).toBeTruthy();
        //     expect(elScope.$ctrl.menuStates[2]).toBeFalsy();
        // });

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
                        jsonmap: "testProperty"
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

            firstRow = compiledElement.find('.bb-reorder-table-body-container').children()[0];
            secondRow = compiledElement.find('.bb-reorder-table-body-container').children()[1];

            expect($(firstRow).hasClass('bb-reorder-table-row-fixed')).toBeTruthy();
            expect($(secondRow).hasClass('bb-reorder-table-row-fixed')).toBeTruthy();
            expect($(firstRow).hasClass('bb-reorder-table-row')).toBeFalsy();
            expect($(secondRow).hasClass('bb-reorder-table-row')).toBeFalsy();
        });

        describe('should display column templating that', function () {
            it('can have a template url that displays a formatted object in a cell', function () {
                var $scope = $rootScope.$new(),
                    cells,
                    compiledElement,
                    elScope;

                $templateCache.put('bbReorderTable/samples/mycolumn.html',
                    '<div>' +
                    '<div class="bb-test-title">Title: {{data.title}}</div>' +
                    '<div class="bb-test-info">Info: {{data.info}}</div>' +
                    '</div>');

                $scope.options = {
                    columns: [
                        {
                            title: 'Templated',
                            jsonmap: 'templated',
                            name: 'templated',
                            width: 300,
                            template_url: 'bbReorderTable/samples/mycolumn.html'
                        }
                    ],
                    data: [
                        { id: 0, templated: { title: 'Title 1', info: 'info 1' } },
                        { id: 1, templated: { title: 'Title 2', info: 'info 2' } },
                        { id: 2, templated: { title: 'Title 3', info: 'info 3' } },
                        { id: 3, templated: { title: 'Title 4', info: 'info 4' } }
                    ],
                    index: "id"
                };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                cells = compiledElement.find('.bb-reorder-table-col');

                expect($(cells[0]).find('.bb-test-title').html()).toContain('Title: Title 1');
                expect($(cells[0]).find('.bb-test-info').html()).toContain('Info: info 1');

                expect($(cells[1]).find('.bb-test-title').html()).toContain('Title: Title 2');
                expect($(cells[1]).find('.bb-test-info').html()).toContain('Info: info 2');

                expect($(cells[2]).find('.bb-test-title').html()).toContain('Title: Title 3');
                expect($(cells[2]).find('.bb-test-info').html()).toContain('Info: info 3');

                expect($(cells[3]).find('.bb-test-title').html()).toContain('Title: Title 4');
                expect($(cells[3]).find('.bb-test-info').html()).toContain('Info: info 4');
            });

            it('can have a controller and resources passed to the template', function () {
                var $scope = $rootScope.$new(),
                    cells,
                    compiledElement,
                    elScope,
                    columnButtonClicked = false;


                $templateCache.put('bbReorderTable/samples/mycolumn.html',
                    '<div>' +
                    '<div class="bb-test-title">{{resources.title}}: {{data.title}}</div>' +
                    '<div class="bb-test-info">Info: {{data.info}}</div>' +
                    '<button ng-click="locals.clickIt()">My Button</button>' +
                    '</div>');

                function columnController($scope) {
                    $scope.locals = {
                        clickIt: function () {
                            columnButtonClicked = true;
                        }
                    };
                }

                columnController.$inject = ['$scope'];

                $scope.options = {
                    columns: [
                        {
                            title: 'Templated',
                            controller: columnController,
                            jsonmap: 'templated',
                            name: 'templated',
                            width: 300,
                            template_url: 'bbReorderTable/samples/mycolumn.html'
                        }
                    ],
                    data: [
                        { id: 0, templated: { title: 'Title 1', info: 'info 1' } },
                        { id: 1, templated: { title: 'Title 2', info: 'info 2' } },
                        { id: 2, templated: { title: 'Title 3', info: 'info 3' } },
                        { id: 3, templated: { title: 'Title 4', info: 'info 4' } }
                    ],
                    index: "id",
                    resources: { title: 'Title' }
                };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                cells = compiledElement.find('.bb-reorder-table-col');

                expect($(cells[0]).find('.bb-test-title').html()).toContain('Title: Title 1');
                expect($(cells[0]).find('.bb-test-info').html()).toContain('Info: info 1');

                expect($(cells[1]).find('.bb-test-title').html()).toContain('Title: Title 2');
                expect($(cells[1]).find('.bb-test-info').html()).toContain('Info: info 2');

                expect($(cells[2]).find('.bb-test-title').html()).toContain('Title: Title 3');
                expect($(cells[2]).find('.bb-test-info').html()).toContain('Info: info 3');

                expect($(cells[3]).find('.bb-test-title').html()).toContain('Title: Title 4');
                expect($(cells[3]).find('.bb-test-info').html()).toContain('Info: info 4');

                $(cells[0]).find('button').click();

                expect(columnButtonClicked).toBe(true);

                $scope.$digest();
            });

            it('can access row data from the column template', function () {
                var $scope = $rootScope.$new(),
                    cells,
                    compiledElement,
                    elScope;

                $templateCache.put('bbReorderTable/samples/mycolumn.html',
                    '<div>' +
                    '<div class="bb-test-rowDataName">{{rowData.hit}}</div>' +
                    '</div>');

                $scope.options = {
                    columns: [
                        {
                            title: 'Templated',
                            jsonmap: 'templated',
                            name: 'templated',
                            width: 300,
                            template_url: 'bbReorderTable/samples/mycolumn.html'
                        }
                    ],
                    data: [
                        { id: 0, hit: 'Pea', templated: { title: 'Title 1', info: 'info 1' } },
                        { id: 1, hit: 'Eye', templated: { title: 'Title 2', info: 'info 2' } },
                        { id: 2, hit: 'Inn', templated: { title: 'Title 3', info: 'info 3' } },
                        { id: 3, hit: 'Gee', templated: { title: 'Title 4', info: 'info 4' } }
                    ],
                    index: "id"
                };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                cells = compiledElement.find('.bb-reorder-table-col');

                expect($(cells[0]).find('.bb-test-rowDataName').html()).toContain('Pea');
                expect($(cells[1]).find('.bb-test-rowDataName').html()).toContain('Eye');
                expect($(cells[2]).find('.bb-test-rowDataName').html()).toContain('Inn');
                expect($(cells[3]).find('.bb-test-rowDataName').html()).toContain('Gee');
            });

            it('removes the scope when element is destroyed', function () {
                var $scope = $rootScope.$new(),
                    cellScope,
                    compiledElement,
                    elScope;

                $templateCache.put('bbReorderTable/samples/mycolumn.html',
                    '<div>' +
                    '<div class="bb-test-rowDataName">{{rowData.hit}}</div>' +
                    '</div>');

                $scope.options = {
                    columns: [
                        {
                            title: 'Templated',
                            jsonmap: 'templated',
                            name: 'templated',
                            width: 300,
                            template_url: 'bbReorderTable/samples/mycolumn.html'
                        }
                    ],
                    data: [
                        { id: 0, hit: 'Pea', templated: { title: 'Title 1', info: 'info 1' } }
                    ],
                    index: "id"
                };

                compiledElement = getCompiledElement($scope);
                elScope = compiledElement.isolateScope();

                cellScope = compiledElement.find('.bb-reorder-table-col .bb-reorder-table-cell div').scope();

                expect(cellScope.$$destroyed).toBeFalsy();

                $scope.options.data = [];
                $scope.$digest();

                expect(cellScope.$$destroyed).toBeTruthy();
            });
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
                        jsonmap: "testProperty1"
                    },
                    {
                        name: "test2",
                        jsonmap: "testProperty2",
                        show: false
                    },
                    {
                        name: "test3",
                        jsonmap: "testProperty3"
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
                        jsonmap: "testProperty"
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
            expect(compiledElement.find('.bb-reorder-table-animate-element').length).toBeTruthy();

            animateCallback = $.fn.fadeOut.calls.argsFor(0)[0].always;
            animateCallback(); // act as though the animation finished

            expect($($(compiledElement.find('.bb-reorder-table-row')[0]).find('.bb-reorder-table-col')[0]).html()).toContain('1000');
            expect(elScope.$ctrl.options.data[1].testProperty).toBe(1000);

            expect($(fourthRow).hasClass('.bb-reorder-table-row-placeholder')).toBeFalsy();
            expect(compiledElement.find('.bb-reorder-table-animate-element').length).toBeFalsy();
        });

        it('should not send fixed to top', function () {
            var $scope = $rootScope.$new(),
                compiledElement,
                elScope,
                secondRow,
                secondRowButton;

            $scope.options = {
                columns: [
                    {
                        name: "test",
                        jsonmap: "testProperty"
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

            spyOn($.fn, 'fadeOut');

            compiledElement = getCompiledElement($scope);
            elScope = compiledElement.isolateScope();

            secondRow = $(compiledElement.find('.bb-reorder-table-row')[1]);
            secondRowButton = secondRow.find('.bb-reorder-table-col-top button');

            elScope.$ctrl.options.fixed = 2;

            secondRowButton.trigger('click');

            expect($(secondRow).hasClass('bb-reorder-table-row-placeholder')).toBeFalsy();
            expect(compiledElement.find('.bb-reorder-table-animate-element').length).toBeFalsy();

            expect($.fn.fadeOut.calls.argsFor(0)[0]).toBe(undefined);

            expect($($(compiledElement.find('.bb-reorder-table-row-fixed')[0]).find('.bb-reorder-table-col')[0]).html()).toContain('123');
            expect(elScope.$ctrl.options.data[0].testProperty).toBe(123);

            expect($($(compiledElement.find('.bb-reorder-table-row-fixed')[1]).find('.bb-reorder-table-col')[0]).html()).toContain('456');
            expect(elScope.$ctrl.options.data[1].testProperty).toBe(456);

            expect($($(compiledElement.find('.bb-reorder-table-row')[0]).find('.bb-reorder-table-col')[0]).html()).toContain('789');
            expect(elScope.$ctrl.options.data[2].testProperty).toBe(789);

            expect($($(compiledElement.find('.bb-reorder-table-row')[1]).find('.bb-reorder-table-col')[0]).html()).toContain('1000');
            expect(elScope.$ctrl.options.data[3].testProperty).toBe(1000);
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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
                        jsonmap: "testProperty"
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

            containerEl = compiledElement.find('.bb-reorder-table-body-container');

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
                        jsonmap: "testProperty"
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

            containerEl = compiledElement.find('.bb-reorder-table-body-container');

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
                        jsonmap: "testProperty"
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

        it('should handle the sortable change event lifecyle from start to finish', function () {
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
                        jsonmap: "testProperty"
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
    });
}); // End of function