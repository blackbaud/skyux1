/* jshint jasmine: true */
/* global module, inject*/
(function () {
    'use strict';
    describe('Splitpanel content', function () {
        var $compile,
        $scope,
        bbCheckDirtyForm;

        beforeEach(module(
            'sky.splitpanel',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _bbCheckDirtyForm_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            bbCheckDirtyForm = _bbCheckDirtyForm_;
        }));

        var splitpanelContent = "<bb-listbuilder-content bb-listbuilder-content-active-view='custom-1'" +
              "bb-listbuilder-content-view-changed='listCtrl.viewChanged(newView)' bb-listbuilder-content-selected-item='custom-1'>" +
              "<bb-listbuilder-content-custom bb-listbuilder-content-custom-view-name='custom-1'" +
              "bb-listbuilder-content-custom-view-switcher-class='fa-pied-piper'" +
              "bb-listbuilder-content-custom-highlight-class='bb-custom-content-item'" +
              "bb-listbuilder-content-custom-view-switcher-label='Switch to custom'>" +
              "<div class='split-pattern-container'>" +
              "<div class='bb-custom-content'>" +
              "<div ng-if='listCtrl.data.length > 0' class='split-panel-list-container'>" +
              "<div class='bb-custom-content-item' bb-splitpanel-content-custom-item ng-repeat='item in listCtrl.data' bb-listbuilder-content-get-panel-data='listCtrl.splitpanelNavigator.checkDirtyForm(listCtrl.getPaneldata,arg)' bb-splitpanel-item-is-active='$index === listCtrl.selectedItem.$index' ng-keydown='listCtrl.navigateUpAndDown()'>" +
              "<div style='margin-bottom: 10px'>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</div>" +
              "</bb-listbuilder-content-custom>" +
              "</bb-listbuilder-content>",
                  workspaceContent = "<bb-splitpanel-workspace class='split-panel-workspace bb-splitpanel-hidden'>" +
              "<bb-splitpanel-workspace-container ng-if='listCtrl.data.length > 0'>" +
              "<form name='forms.workspaceContainerForm'>" +
              "</form>" +
              "</bb-splitpanel-workspace-container>" +
              "</bb-splitpanel-workspace>";

       

        it('should create a filter button which calls a function on click', function () {
            var filterBtnHtml = "<bb-listbuilder>" + splitpanelContent + workspaceContent + "</bb-listbuilder>",
                    getPaneldataCalled = false,
                    el;

            $scope.listCtrl = {
                getPaneldata: function () {
                    getPaneldataCalled = true;
                },
                data: [{}, {}, {}],

                splitpanelNavigator: {
                    checkDirtyForm: function (func, arg) {
                        return func(arg);
                    }
                },
                selectedItem: { $index: 0 }

            };
            el = $compile(filterBtnHtml)($scope);
            $scope.$digest();

            el.find('.split-panel-list-container div')[0].click();

            expect(getPaneldataCalled).toBe(true);
        });
    });
})();