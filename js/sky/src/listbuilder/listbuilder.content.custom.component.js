/* global angular */
(function () {
    'use strict';

    function Controller() {
        var ctrl = this;

        function getViewObject() {
            return { 
                    viewName: ctrl.bbListbuilderContentCustomViewName, 
                    viewSwitcherClass: ctrl.bbListbuilderContentCustomViewSwitcherClass, 
                    highlightClass: ctrl.bbListbuilderContentCustomHighlightClass,
                    viewSwitcherLabel: ctrl.bbListbuilderContentCustomViewSwitcherLabel
                };
        }

        function initContent() {
            ctrl.viewName = 'card';
            if (ctrl.bbListbuilderContentCustomViewName) {
                ctrl.listbuilderContentCtrl.addListbuilderView(getViewObject());
            }
            
        }

        function viewIsActive() {
            return ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.bbListbuilderContentCustomViewName;
        }

        function onChanges(changesObj) {
            if (ctrl.bbListbuilderContentCustomViewName) {
                if (changesObj.bbListbuilderContentCustomViewName) {
                    if (!changesObj.bbListbuilderContentCustomViewName.previousValue) {
                        ctrl.listbuilderContentCtrl.addListbuilderView(getViewObject());
                    } else {
                        ctrl.listbuilderContentCtrl.updateListbuilderView(
                            changesObj.bbListbuilderContentCustomViewName.previousValue,
                            getViewObject());
                    }
                }
                ctrl.listbuilderContentCtrl.updateListbuilderView(
                            ctrl.bbListbuilderContentCustomViewName,
                            getViewObject());
                
            }
        }

        ctrl.$postLink = initContent;
        ctrl.$onChanges = onChanges;
        ctrl.viewIsActive = viewIsActive;
    }

    angular.module('sky.listbuilder.content.custom.component', [])
        .component('bbListbuilderContentCustom', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.content.custom.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbListbuilderContent'
            },
            bindings: {
                bbListbuilderContentCustomViewName: '@?',
                bbListbuilderContentCustomViewSwitcherClass: '@?',
                bbListbuilderContentCustomHighlightClass: '@?',
                bbListbuilderContentCustomViewSwitcherLabel: '@?'
            }

        });
}());