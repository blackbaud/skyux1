
/* global angular*/

(function () {
    'use strict';

    function ReorderTableContextTestController() {
        var vm = this;

        vm.tableOptions = {
            columns: [
                {
                    name: 'index',
                    jsonMap: 'id'
                },
                {
                    name: 'number',
                    jsonMap: 'num'
                },
                {
                    name: 'text',
                    jsonMap: 'text',
                    show: false
                },
                {
                    name: 'characters',
                    jsonMap: 'char',
                    title: 'Column with Title'
                },
                {
                    name: 'templated',
                    templateFn: function (item) {
                        if (item.text === 'Hello') {
                            return {
                                text: item.text,
                                elClass: 'bb-emphasized'
                            };
                        } else {
                            return {
                                text: item.text,
                                elClass: 'bb-deemphasized'
                            };
                        }
                    }
                }
            ],
            data: [
                { id: 0, num: 123, text: 'Hello', char: '#' },
                { id: 1, num: 456, text: 'Bye', char: '<>' },
                { id: 2, num: 789, text: 'Hello', char: '???' }
            ],
            index: 'id',
            getContextMenuItems: function (item) {
                return [
                    {
                        id: 0,
                        title: 'Action 1 for item ' + item.id,
                        cmd: function () {
                            alert('Action 1 for item ' + item.id);
                        }
                    },
                    {
                        id: 1,
                        title: 'Action 2 for item ' + item.id,
                        cmd: function () {
                            alert('Action 2 for item ' + item.id);
                        }
                    }
                ];
            }
        };
    }

    function ReorderTableFixedTestController() {
        var vm = this;

        vm.tableUnsortable = false;
        vm.tableOptions = {
            columns: [
                {
                    name: 'index',
                    jsonMap: 'id',
                    width: '200px',
                    title: 'Index with 200px column'
                },
                {
                    name: 'first',
                    jsonMap: 'bool1',
                    isBool: {},
                    title: 'Normal'
                },
                {
                    name: 'second',
                    jsonMap: 'bool2',
                    isBool: {
                        isInverted: true
                    },
                    title: 'Inverted'
                },
                {
                    name: 'secondValue',
                    jsonMap: 'bool2',
                    title: 'Inverted Actual Value'
                },
                {
                    name: 'third',
                    jsonMap: 'bool3',
                    isBool: {
                        disableCol: true
                    },
                    title: 'All Disabled'
                },
                {
                    name: 'fourth',
                    jsonMap: 'bool4',
                    isBool: {
                        disableRow: function (item) {
                            return item.id % 2 === 0;
                        }
                    },
                    title: 'Odd Rows Disabled'
                }
            ],
            data: [
                { id: 1, bool1: false, bool2: true, bool3: false, bool4: true },
                { id: 2, bool1: false, bool2: true, bool3: true, bool4: false },
                { id: 3, bool1: true, bool2: true, bool3: false, bool4: true },
                { id: 4, bool1: false, bool2: true, bool3: true, bool4: true }
            ],
            index: 'id',
            oneIndexed: true,
            fixed: 1
        };
    }

    angular.module('screenshots', ['sky'])
        .controller('ReorderTableContextTestController', ReorderTableContextTestController)
        .controller('ReorderTableFixedTestController', ReorderTableFixedTestController);
}());
