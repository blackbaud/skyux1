/* global angular*/
(function () {
    'use strict';

    function ModalTestController(bbModal) {
        var self = this;
        self.open = function (fullscreen) {
            bbModal.open({
                controller: 'ModalContentController as contentCtrl',
                templateUrl: 'demo/modal/modalform.html'
            }, fullscreen);
        };
    }

    function ModalContentController() {
        var vm = this;

        vm.textLabel = 'Sample text box';

        vm.gridOptions = {
            columns: [
                {
                    caption: 'Name',
                    jsonmap: 'name',
                    id: 1,
                    name: 'name',
                    width_xs: 100,
                    width_all: 300
                },
                {
                    caption: 'Skills',
                    jsonmap: 'skills',
                    id: 2,
                    name: 'skills',
                    allow_see_more: true,
                    width_all: 100
                },
                {
                    caption: 'Number of cats',
                    jsonmap: 'cats',
                    id: 3,
                    name: 'cats'
                }
            ],
            data: [
                {
                    name: 'Patrick',
                    skills: 'Karate, Kung Fu, Italian cooking, Ditch digging'
                },
                {
                    name: 'Paul',
                    skills: 'Arguing',
                    cats: '13'
                },
                {
                    name: 'George',
                    skills: 'Curiousity',
                    cats: '1'
                },
                {
                    name: 'Ringo',
                    skills: 'Slow typing'
                },
                {
                    name: 'Samwise',
                    skills: 'Loyalty, Gardening'
                }
            ],
            onAddClick: function () {
                alert('Add button clicked!!');
            },
            onAddClickLabel: 'Add button',
            selectedColumnIds: [1, 2, 3],
            columnPickerHelpKey: 'bb-security-users.html',
            sortOptions: {
                excludedColumns: [
                    'cats',
                    'name',
                    'skills'
                ]
            },
            hasInlineFilters: true,
            filters: {}
        };
    }

    ModalTestController.$inject = ['bbModal'];

    angular.module('stache')
    .controller('ModalContentController', ModalContentController)
    .controller('ModalTestController', ModalTestController);

}());
