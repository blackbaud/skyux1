/* global angular */
(function () {
    'use strict';

    function Controller($element, bbHighlight) {

        var ctrl = this,
            lastSearchText;

        function addListbuilderView(newView) {
            ctrl.listbuilderCtrl.contentViews.push(newView);

            if ((ctrl.bbListbuilderContentActiveView && newView.viewName === ctrl.bbListbuilderContentActiveView) || 
                !ctrl.listbuilderCtrl.currentView) {
                ctrl.listbuilderCtrl.currentView = newView;
            } 
        }

        function highlightSearchContent(searchText) {
            var contentEl = $element.find('.' + ctrl.listbuilderCtrl.currentView.highlightClass);
            lastSearchText = searchText;
            /*istanbul ignore else */
            /* sanity check */
            if (contentEl.length > 0) {
                bbHighlight.clear(contentEl);
                if (searchText) {
                    bbHighlight(contentEl.not('.bb-listbuilder-no-search'), searchText, 'highlight');
                }
            }
        }

        function highlightLastSearchText() {
            highlightSearchContent(lastSearchText);
        }

        function getCurrentView() {
            return ctrl.listbuilderCtrl.currentView;
        }

        function setCurrentView(newView) {
            ctrl.listbuilderCtrl.currentView = newView;
            if (angular.isFunction(ctrl.bbListbuilderContentViewChanged)) {
                ctrl.bbListbuilderContentViewChanged({ newView: newView });
            }
        } 

        function setActiveView(viewName) {
            var i;

            if (ctrl.listbuilderCtrl.currentView && ctrl.listbuilderCtrl.currentView.viewName === viewName) {
                return;
            }

            for (i = 0; i < ctrl.listbuilderCtrl.contentViews.length; i++) {
                if (ctrl.listbuilderCtrl.contentViews[i].viewName === viewName) {
                    ctrl.listbuilderCtrl.currentView = ctrl.listbuilderCtrl.contentViews[i];
                    return;
                }
            }
        }

        function onInit() {
            ctrl.listbuilderCtrl.highlightSearchContent = highlightSearchContent;
            ctrl.listbuilderCtrl.highlightLastSearchText = highlightLastSearchText;
            ctrl.listbuilderCtrl.setCurrentView = setCurrentView;
            ctrl.highlightLastSearchText = highlightLastSearchText;
            if (ctrl.bbListbuilderContentActiveView) {
                setActiveView(ctrl.bbListbuilderContentActiveView);
            }
        }

        function onChanges(changesObj) {
            var activeView;
            if (changesObj.bbListbuilderContentActiveView) {
                activeView = changesObj.bbListbuilderContentActiveView;
                /* istanbul ignore else */
                /* sanity check */
                if (activeView.currentValue !== activeView.previousValue) {
                    setActiveView(activeView.currentValue);
                }
            }
        }

        ctrl.$onInit = onInit;
        ctrl.$onChanges = onChanges;
        
        ctrl.addListbuilderView = addListbuilderView;
        ctrl.getCurrentView = getCurrentView;

    }

    Controller.$inject = ['$element', 'bbHighlight'];

    angular.module('sky.listbuilder.content.component', ['sky.highlight'])
        .component('bbListbuilderContent', {
            templateUrl: 'sky/templates/listbuilder/listbuilder.content.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbListbuilder'
            },
            bindings: {
                bbListbuilderContentActiveView: '@?',
                bbListbuilderContentViewChanged: '&?'
            }
        });

})();