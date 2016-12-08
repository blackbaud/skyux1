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

        function removeListbuilderView(viewName) {
            var i;

            for (i = 0; i < ctrl.listbuilderCtrl.contentViews.length; i++) {
                if (ctrl.listbuilderCtrl.contentViews[i].viewName === viewName) {
                    ctrl.listbuilderCtrl.contentViews.splice(i, 1);
                    if (ctrl.listbuilderCtrl.currentView.viewName === viewName) {
                        if (ctrl.listbuilderCtrl.contentViews.length > 0) {
                            ctrl.listbuilderCtrl.currentView = ctrl.listbuilderCtrl.contentViews[0];
                        } else {
                            ctrl.listbuilderCtrl.currentView = null;
                        }

                    }
                    return;
                }
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

        function getCurrentView() {
            return ctrl.listbuilderCtrl.currentView;
        }

        function setCurrentView(newView) {
            ctrl.listbuilderCtrl.currentView = newView;
            /* istanbul ignore else */
            /* sanity check */
            if (angular.isFunction(ctrl.bbListbuilderContentViewChanged)) {
                ctrl.bbListbuilderContentViewChanged({ newView: newView.viewName });
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

        function updateListbuilderView(viewName, newView) {
            var i;

            for (i = 0; i < ctrl.listbuilderCtrl.contentViews.length; i++) {
                if (ctrl.listbuilderCtrl.contentViews[i].viewName === viewName) {
                    ctrl.listbuilderCtrl.contentViews[i] = newView;
                    if (ctrl.listbuilderCtrl.currentView.viewName === viewName) {
                        setCurrentView(newView);
                    }
                    return;
                }
            }
        }

        function onInit() {
            ctrl.listbuilderCtrl.highlightSearchContent = highlightSearchContent;
            ctrl.listbuilderCtrl.setCurrentView = setCurrentView;
            ctrl.highlightLastSearchText = ctrl.listbuilderCtrl.highlightLastSearchText;
            if (ctrl.bbListbuilderContentActiveView) {
                setActiveView(ctrl.bbListbuilderContentActiveView);
            }

            ctrl.bbListbuilderContentGetPanelData();
        }

        function onChanges(changesObj) {
            var activeView;
            /* istanbul ignore else */
            /* sanity check */
            if (changesObj.bbListbuilderContentActiveView) {
                activeView = changesObj.bbListbuilderContentActiveView;
                /* istanbul ignore else */
                /* sanity check */
                if (activeView.currentValue !== activeView.previousValue) {
                    setActiveView(activeView.currentValue);
                }
            }
        }

        //function OnSelectedItem(item) {
        //    ctrl.bbListbuilderContentItem = item;
        //    ctrl.bbListbuilderContentGetPanelData();
        //}

        ctrl.$onInit = onInit;
        ctrl.$onChanges = onChanges;

        ctrl.addListbuilderView = addListbuilderView;
        ctrl.removeListbuilderView = removeListbuilderView;
        ctrl.updateListbuilderView = updateListbuilderView;
        ctrl.getCurrentView = getCurrentView;
        ctrl.OnSelectedItem = OnSelectedItem;

    }

    Controller.$inject = ['$element', 'bbHighlight'];

    angular.module('sky.splitpanel.content.component', ['sky.highlight'])
        .component('bbSplitpanelContent', {
            templateUrl: 'sky/templates/splitpanel/splitpanel.content.component.html',
            transclude: true,
            controller: Controller,
            require: {
                listbuilderCtrl: '^bbSplitpanel'
            },
            bindings: {
                bbListbuilderContentActiveView: '@?',
                bbListbuilderContentSelectedItem: '@?',
                bbListbuilderContentViewChanged: '&?',
            }
        });

})();