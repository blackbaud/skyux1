/* global angular*/

(function () {
    'use strict';

    function RunTemplateCache($templateCache) {
        $templateCache.put('reordertable/samples/templated.html', '<span>{{data}}</span>')

        $templateCache.put('bbReorderTable/samples/mycolumn.html',
                    '<div>' +
                    '<div class="bb-headline">{{resources.title}}: {{data.title}}</div>' +
                    '<div class="bb-test-info">Info: {{data.info}}</div>' +
                    '<button ng-click="locals.clickIt()">My Button</button>' +
                    '</div>');

        $templateCache.put('bbReorderTable/samples/rowData.html',
                    '<div>' +
                    '<div class="bb-test-rowDataName">{{rowData.hit}}</div>' +
                    '</div>');
    }

    function ColumnController($scope) {
        $scope.locals = {
            clickIt: function () {
                alert("Testing button!");
            }
        };
    }

    function ReorderTableContextTestController() {
        var vm = this;

        vm.tableOptions = {
            columns: [
                {
                    name: 'index',
                    jsonmap: 'id'
                },
                {
                    name: 'number',
                    jsonmap: 'num'
                },
                {
                    name: 'text',
                    jsonmap: 'text',
                    show: false
                },
                {
                    name: 'characters',
                    jsonmap: 'char',
                    title: 'Column with Title'
                },
                {
                    name: 'templated',
                    jsonmap: 'templated',
                    template_url: 'reordertable/samples/templated.html'
                }
            ],
            data: [
                { id: 0, num: 123, text: 'Hello', char: '#', templated: "temp1" },
                { id: 1, num: 456, text: 'Bye', char: '<>', templated: "temp2" },
                { id: 2, num: 789, text: 'Hello', char: '???', templated: 'temp3' }
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
                    title: 'Templated with Row Data',
                    name: 'templated',
                    template_url: 'bbReorderTable/samples/rowData.html'
                },
                {
                    title: 'Controller',
                    name: 'Controller',
                    jsonmap: 'templated',
                    controller: ColumnController,
                    template_url: 'bbReorderTable/samples/mycolumn.html'
                }
            ],
            data: [
                { id: 0, hit: 'Pea', templated: {title: 'Title 1', info: 'info 1'} },
                { id: 1, hit: 'Eye', templated: {title: 'Title 2', info: 'info 2'} },
                { id: 2, hit: 'Inn', templated: {title: 'Title 3', info: 'info 3'} },
                { id: 3, hit: 'Gee', templated: {title: 'Title 4', info: 'info 4'} }
            ],
            index: 'id',
            oneIndexed: true,
            fixed: 1,
            resources: { title: 'Title'}
        };
    }

    angular.module('screenshots', ['sky'])
        .controller('ReorderTableContextTestController', ReorderTableContextTestController)
        .controller('ReorderTableFixedTestController', ReorderTableFixedTestController)
        .controller('ColumnController', ColumnController)
        .run(['$templateCache', RunTemplateCache]);
}());
