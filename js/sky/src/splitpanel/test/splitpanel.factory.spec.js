/* jshint jasmine: true */
/* global module, inject*/
(function () {
    'use strict';
    describe('Splitpanel factory', function () {
        var $compile,
            $scope,
        bbCheckDirtyForm,
        bbmodal, $q, splitpanelContent,
        workspaceContent;

        beforeEach(module(
            'sky.splitpanel',
            'sky.templates'
        ));
        beforeEach(inject(function (_$rootScope_, _$compile_, _bbCheckDirtyForm_, _bbModal_, _$q_) {
            $scope = _$rootScope_.$new();
            $compile = _$compile_;
            bbCheckDirtyForm = _bbCheckDirtyForm_;
            bbmodal = _bbModal_;
            $q = _$q_;
        }));



        splitpanelContent = "<bb-listbuilder-content bb-listbuilder-content-active-view='custom-1'" +
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
                            "</bb-listbuilder-content>";
        workspaceContent = "<bb-splitpanel-workspace class='split-panel-workspace bb-splitpanel-hidden'>" +
                            "<bb-splitpanel-workspace-container ng-if='listCtrl.data.length > 0'>" +
                            "<form name='forms.workspaceContainerForm'>" +
                            "</form>" +
                            "</bb-splitpanel-workspace-container>" +
                            "</bb-splitpanel-workspace>";

        it('SaveCallback should be called when form is not dirty', function () {

            var filterBtnHtml = "<bb-listbuilder>" + splitpanelContent + workspaceContent + "</bb-listbuilder>",
                    getPaneldataCalled = false, el;

            $scope.forms = {};

            $scope.listCtrl = {

                getPaneldata: function () {
                    getPaneldataCalled = true;
                },
                data: [{}, {}, {}],

                splitpanelNavigator: bbCheckDirtyForm.init({
                    enableFormDirtyCheck: true,
                    forms: $scope.forms,
                    saveCallback: function (func, param) {
                        $scope.listCtrl.splitpanelNavigator.invokeMethodWithParameters(func, param);

                        $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();
                    },
                    doNotSaveCallback: function (func, param) {
                        $scope.listCtrl.splitpanelNavigator.invokeMethodWithParameters(func, param);

                        $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();
                    },
                    modalController: 'ListbuilderModalController as ctrl',
                    modalTemplate: 'demo/splitpanel/confirmpopup.html',
                    scope: $scope,
                    bbModal: bbmodal
                }),
                selectedItem: { $index: 0 }
            };


            el = $compile(filterBtnHtml)($scope);
            $scope.$digest();
            el.find('.split-panel-list-container div')[0].click();

            expect(getPaneldataCalled).toBe(true);

        });

        it('saveCallback should be called in case of save in dirty check', function () {

            var filterBtnHtml = "<bb-listbuilder>" + splitpanelContent + workspaceContent + "</bb-listbuilder>",
                    getPaneldataCalled = false, el, deffered = $q.defer(), saveCalled = false;

            $scope.forms = {};

            bbmodal = jasmine.createSpyObj('modal', ['open']);

            deffered.resolve({ result: true });

            bbmodal.open.and.returnValue({ result: deffered.promise });

            $scope.listCtrl = {

                getPaneldata: function () {
                    getPaneldataCalled = true;
                },
                data: [{}, {}, {}],

                splitpanelNavigator: bbCheckDirtyForm.init({
                    enableFormDirtyCheck: true,
                    forms: $scope.forms,
                    saveCallback: function (func, param) {
                        $scope.listCtrl.splitpanelNavigator.invokeMethodWithParameters(func, param);
                        $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();
                        saveCalled = true;
                    },
                    doNotSaveCallback: function (func, param) {
                        $scope.listCtrl.splitpanelNavigator.invokeMethodWithParameters(func, param);
                        $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();
                    },
                    modalController: 'ListbuilderModalController as ctrl',
                    modalTemplate: 'demo/splitpanel/confirmpopup.html',
                    scope: $scope,
                    bbModal: bbmodal
                }),
                selectedItem: { $index: 0 }
            };


            el = $compile(filterBtnHtml)($scope);
            $scope.$digest();
            $scope.forms.workspaceContainerForm.$setDirty();
            el.find('.split-panel-list-container div')[0].click();

            expect(getPaneldataCalled).toBe(true);
            expect(saveCalled).toBe(true);

        });

        it('doNotSaveCallback should be called in case of save in dirty check', function () {

            var filterBtnHtml = "<bb-listbuilder>" + splitpanelContent + workspaceContent + "</bb-listbuilder>",
                    getPaneldataCalled = false, el, deffered = $q.defer(), doNotSaveCalled = false;

            $scope.forms = {};

            bbmodal = jasmine.createSpyObj('modal', ['open']);

            deffered.resolve({ result: false });

            bbmodal.open.and.returnValue({ result: deffered.promise });

            $scope.listCtrl = {

                getPaneldata: function () {
                    getPaneldataCalled = true;
                },
                data: [{}, {}, {}],

                splitpanelNavigator: bbCheckDirtyForm.init({
                    enableFormDirtyCheck: true,
                    forms: $scope.forms,
                    saveCallback: function (func, param) {
                        $scope.listCtrl.splitpanelNavigator.invokeMethodWithParameters(func, param);

                        $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();
                    },
                    doNotSaveCallback: function (func, param) {
                        $scope.listCtrl.splitpanelNavigator.invokeMethodWithParameters(func, param);

                        $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();
                        doNotSaveCalled = true;
                    },
                    modalController: 'ListbuilderModalController as ctrl',
                    modalTemplate: 'demo/splitpanel/confirmpopup.html',
                    scope: $scope,
                    bbModal: bbmodal
                }),
                selectedItem: { $index: 0 }
            };


            el = $compile(filterBtnHtml)($scope);
            $scope.$digest();
            $scope.forms.workspaceContainerForm.$setDirty();
            el.find('.split-panel-list-container div')[0].click();

            expect(getPaneldataCalled).toBe(true);
            expect(doNotSaveCalled).toBe(true);

        });

        it('setDirtyFormDefault should set the default state of workspaceContainerForm', function () {
            var filterBtnHtml = "<bb-listbuilder>" + splitpanelContent + workspaceContent + "</bb-listbuilder>",
                    el;
            $scope.forms = {};
            $scope.listCtrl = {
                data: [{}, {}, {}],

                splitpanelNavigator: bbCheckDirtyForm.init({
                    enableFormDirtyCheck: true,
                    forms: $scope.forms,
                    saveCallback: function (func, param) {
                        $scope.listCtrl.splitpanelNavigator.invokeMethodWithParameters(func, param);

                        $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();
                    },
                    doNotSaveCallback: function (func, param) {
                        $scope.listCtrl.splitpanelNavigator.invokeMethodWithParameters(func, param);

                        $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();
                    },
                    modalController: 'ListbuilderModalController as ctrl',
                    modalTemplate: 'demo/splitpanel/confirmpopup.html',
                    scope: $scope
                }),
            };


            el = $compile(filterBtnHtml)($scope);
            $scope.$digest();

            $scope.forms.workspaceContainerForm.$setDirty();
            $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();

            expect($scope.forms.workspaceContainerForm.$dirty).toBe(false);

        });

        it('setDirtyFormDefault should return false when workspaceContainerForm is not dirty', function () {
            var filterBtnHtml = "<bb-listbuilder>" + splitpanelContent + workspaceContent + "</bb-listbuilder>",
                    el, result;
            $scope.forms = {};
            $scope.listCtrl = {
                data: [{}, {}, {}],

                splitpanelNavigator: bbCheckDirtyForm.init({
                    enableFormDirtyCheck: true,
                    forms: $scope.forms,
                    saveCallback: function (func, param) {
                        $scope.listCtrl.splitpanelNavigator.invokeMethodWithParameters(func, param);

                        $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();
                    },
                    doNotSaveCallback: function (func, param) {
                        $scope.listCtrl.splitpanelNavigator.invokeMethodWithParameters(func, param);

                        $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();
                    },
                    modalController: 'ListbuilderModalController as ctrl',
                    modalTemplate: 'demo/splitpanel/confirmpopup.html',
                    scope: $scope,
                    bbModal: bbmodal
                }),
            };

            el = $compile(filterBtnHtml)($scope);
            $scope.$digest();
            $scope.forms.workspaceContainerForm = undefined;
            result = $scope.listCtrl.splitpanelNavigator.setDirtyFormDefault();

            expect(result).toBe(false);

        });

    });
})();