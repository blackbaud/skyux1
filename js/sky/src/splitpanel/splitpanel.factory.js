/* global angular */
(function () {
    'use strict';

    function bbCheckDirtyForm($state) {
        return {
            init: function (options) {
                var enableFormDirtyCheck = options.enableFormDirtyCheck, forms = options.forms, saveCallback = options.saveCallback,
                    doNotSaveCallback = options.doNotSaveCallback, bbModal = options.bbModal;
                //check dirty and open modal
                function checkDirtyForm(func, param) {
                    //check for dirty form
                    if (enableFormDirtyCheck && angular.isDefined(forms) && angular.isDefined(forms.workspaceContainerForm) && forms.workspaceContainerForm.$dirty) {
                        bbModal.open({
                            controller: options.modalController,
                            templateUrl: options.modalTemplate,
                            resolve: {
                                params: function () {
                                    return null;
                                }
                            }
                        })
                        .result.then(function (modalResult) {
                            if (modalResult.result) {
                                if (saveCallback) {
                                    saveCallback(func, param);
                                }
                            } else {
                                if (doNotSaveCallback) {
                                    doNotSaveCallback(func, param);
                                }
                            }
                        });
                    } else {

                        //calling invoked action without any pre-processing
                        invokeMethodWithParameters(func, param);
                    }
                }

                //This method is used to invoke passed method
                function invokeMethodWithParameters(func, param) {
                    if (func) {
                        if (param) {
                            func(param);
                        } else {
                            func();
                        }
                    }
                }

                //this method is used to ser dirty form to default state
                function setDirtyFormDefault() {
                    if (angular.isDefined(forms) && angular.isDefined(forms.workspaceContainerForm)) {
                        forms.workspaceContainerForm.$setPristine();
                        return true;
                    }
                    return false;
                }


                options.scope.$on('$stateChangeStart', function (event, toState, toParams) {
                    if (enableFormDirtyCheck && angular.isDefined(forms) && angular.isDefined(forms.workspaceContainerForm) && forms.workspaceContainerForm.$dirty) {
                        //event.preventDefault();
                        bbModal.open({
                            controller: options.modalController,
                            templateUrl: options.modalTemplate,
                            resolve: {
                                params: function () {
                                    return {
                                        toState: toState, toParams: toParams
                                    };
                                }
                            }
                        }).result.then(function (modalResult) {
                            if (modalResult.result) {
                                if (saveCallback) {
                                    saveCallback(navigatetoState, modalResult.params);
                                }
                            } else {
                                if (doNotSaveCallback) {
                                    doNotSaveCallback();
                                }
                            }
                        }

                        );
                    }
                });


                //this function used to navigate to passed url 
                function navigatetoState(nextState) {
                    options.scope.$$listeners.$stateChangeStart = [];
                    $state.go(nextState.toState, nextState.toParams);
                }

                return {
                    checkDirtyForm: checkDirtyForm,
                    setDirtyFormDefault: setDirtyFormDefault,
                    invokeMethodWithParameters: invokeMethodWithParameters
                };
            }
        };

    }

    bbCheckDirtyForm.$inject = ['$state'];

    angular.module('sky.splitpanel.bbCheckDirtyForm.factory', ['sky.modal'])
        .factory('bbCheckDirtyForm', bbCheckDirtyForm);

}());
