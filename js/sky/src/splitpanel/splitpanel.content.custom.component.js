/* global angular */
(function () {
    'use strict';

    function Controller($timeout) {
        var ctrl = this;

        function addItem() {
            $timeout(function () {
                ctrl.listbuilderContentCtrl.highlightLastSearchText();
            });
        }

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
            return ctrl.listbuilderContentCtrl.getCurrentView() && ctrl.listbuilderContentCtrl.getCurrentView().viewName === ctrl.bbListbuilderContentCustomViewName;
        }

        function onChanges(changesObj) {
            /* istanbul ignore else */
            /* sanity check */
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

        function onDestroy() {
            ctrl.listbuilderContentCtrl.removeListbuilderView(ctrl.bbListbuilderContentCustomViewName);
        }

        ctrl.$postLink = initContent;
        ctrl.$onChanges = onChanges;
        ctrl.$onDestroy = onDestroy;
        ctrl.viewIsActive = viewIsActive;
        ctrl.addItem = addItem;
    }

    Controller.$inject = ['$timeout'];

    angular.module('sky.splitpanel.content.custom.component', [])
        .component('bbSplitpanelContentCustom', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.content.custom.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderContentCtrl: '^bbSplitpanelContent'
            },
            bindings: {
                bbListbuilderContentCustomViewName: '@?',
                bbListbuilderContentCustomViewSwitcherClass: '@?',
                bbListbuilderContentCustomHighlightClass: '@?',
                bbListbuilderContentCustomViewSwitcherLabel: '@?'
            }

        });
}());