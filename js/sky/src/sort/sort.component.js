/* global angular */
(function () {
    'use strict';

    function Controller($element) {
        var self = this;

        function onInit() {
            if (self.bbSortAppendToBody) {
                $element.find('.bb-sort').attr('dropdown-append-to-body', true);
            }
        }

        self.$onInit = onInit;
    }

    function templateFn($element, $attrs) {
        var templateString;
        if (angular.isDefined($attrs.bbSortAppendToBody)) {
            templateString = '<div class="bb-sort" uib-dropdown dropdown-append-to-body>';
        } else {
            templateString = '<div class="bb-sort" uib-dropdown>';
        }

        templateString += ['<button title="{{\'sort_button_label\' | bbResources}}" ',
                                'type="button" class="btn bb-btn-secondary" uib-dropdown-toggle>',
                                '<i class="fa fa-lg fa-sort"></i>',
                            '</button>',
                            '<div class="bb-dropdown-menu dropdown-menu" uib-dropdown-menu role="menu"> ',
                                '<bb-sort-menu>',
                                    '<ng-transclude></ng-transclude>',
                                '</bb-sort-menu>',
                            '</div>',
                        '</div>'].join('');
        return templateString;
    }

    Controller.$inject = ['$element'];

    templateFn.$inject = ['$element', '$attrs'];

    angular.module('sky.sort.component', ['ui.bootstrap.dropdown', 'sky.resources', 'sky.sort.menu.component'])
        .component('bbSort', {
            controller: Controller,
            template: templateFn,
            bindings: {
                bbSortAppendToBody: '@?'
            },
            transclude: true
        });
})();