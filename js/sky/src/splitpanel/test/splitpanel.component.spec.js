/* jshint jasmine: true */
/* global module, inject*/
(function () {
    'use strict';
    describe('Splitpanel content', function () {
        var $compile,
        $scope,
        bbCheckDirtyForm,
        splitpanelContent,
        workspaceContent;

        beforeEach(module(
            'sky.splitpanel',
            'sky.bbcheckdirtyform',
            'sky.templates'
        ));

        beforeEach(inject(function (_$rootScope_, _$compile_, _bbCheckDirtyForm_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            bbCheckDirtyForm = _bbCheckDirtyForm_;
        }));

        splitpanelContent = "<bb-listbuilder-content>" +
                            "<bb-splitpanel-container>" +
                            "<bb-splitpanel-list-panel max-width-in-percentage='70' min-width-in-percentage='20'>" +
                            "<div ng-if='listCtrl.data.length > 0' class='split-panel-list-container'>" +
                            "<div class='bb-custom-content-item' bb-splitpanel-list-item ng-repeat='item in listCtrl.data' bb-splitpanel-content-get-panel-data='listCtrl.splitpanelNavigator.checkDirtyForm(listCtrl.getPaneldata,arg)' bb-splitpanel-item-is-active='$index === listCtrl.selectedItem.$index' ng-keydown='listCtrl.navigateUpAndDown()'>" +
                            "<div style='margin-bottom: 10px'>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</div>" +
                            "</bb-splitpanel-list-panel>" +
                            "</bb-splitpanel-container>" +
                            "</bb-listbuilder-content>";
        workspaceContent = "<bb-splitpanel-workspace>" +
                            "<bb-splitpanel-mobile-workspace-header>" +
                            "<bb-splitpanel-mobile-list-back bb-splitpanel-list-back-click='listCtrl.splitpanelNavigator.checkDirtyForm(listCtrl.back)'> Transaction {{listCtrl.selectedItem.$index + 1}} of {{listCtrl.data.length}}</bb-splitpanel-mobile-list-back>" +
                            "<bb-splitpanel-mobile-list-next bb-splitpanel-list-next-click='listCtrl.splitpanelNavigator.checkDirtyForm(listCtrl.next)'></bb-splitpanel-mobile-list-next>" +
                            "<bb-splitpanel-mobile-list-previous bb-splitpanel-list-previous-click='listCtrl.splitpanelNavigator.checkDirtyForm(listCtrl.previous)'></bb-splitpanel-mobile-list-previous>" +
                            "</bb-splitpanel-mobile-workspace-header>" +
                            "<bb-splitpanel-workspace-container ng-if='listCtrl.data.length > 0'>" +
                            "<form name='forms.workspaceContainerForm'>" +
                            "</form>" +
                            "</bb-splitpanel-workspace-container>" +
                            "</bb-splitpanel-workspace>";



        it('should call getPanelData method on click on item of list', function () {
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
                selectedItem: { $index: 1 }

            };
            el = $compile(filterBtnHtml)($scope);
            $scope.$digest();

            el.find('.split-panel-list-container div')[0].click();

            expect(getPaneldataCalled).toBe(true);
        });

        it('should call back method and redirect to list page', function () {
            var filterBtnHtml = "<bb-listbuilder>" + splitpanelContent + workspaceContent + "</bb-listbuilder>",
                    backCalled = false,
                    el;

            $scope.listCtrl = {
                getPaneldata: function () {
                },
                back: function () {
                    backCalled = true;
                },
                data: [{}, {}, {}],

                splitpanelNavigator: {
                    checkDirtyForm: function (func, arg) {
                        return func(arg);
                    }
                },
                selectedItem: { $index: 1 }

            };
            el = $compile(filterBtnHtml)($scope);
            $scope.$digest();

            //clicked first item
            //el.find('.split-panel-list-container div')[0].click();

            //click back button
            el.find('.bb-splitpanel-navigation-panel')[0].click();

            expect(backCalled).toBe(true);
        });
    });
})();