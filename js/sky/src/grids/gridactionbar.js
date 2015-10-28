/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.grids.actionbar', ['sky.mediabreakpoints', 'sky.resources'])
    .directive('bbGridActionBar', ['bbMediaBreakpoints', 'bbResources', '$timeout', function (bbMediaBreakpoints, bbResources, $timeout) {
        return {
                require: '^bbGrid',
                replace: true,
                transclude: true,
                restrict: 'E',
                scope: {
                    bbMultiselectActions: '=',
                    bbSelectionsUpdated: '&'
                },
                controller: ['$scope', function ($scope) {
                    $scope.locals = {
                        actions: $scope.bbMultiselectActions,
                        showActionBar: false,
                        mobileButtons: false,
                        showMobileActions: false
                    };

                    $scope.resources = bbResources;
                }],
                link: function ($scope, element, attrs, bbGrid) {
                    /*jslint unparam: true */
                    var visibleSelected = [];
                    
                    function updateActionBar(data, selected) {
                        var action,
                            i,
                            showActionBar;
                        
                        //this notation is necessary because the argument is passed through grid and then to the controller
                        //in which grid resides.
                        visibleSelected = bbGrid.getVisibleSelections(data, selected);
                        
                        $scope.bbSelectionsUpdated({ selections: { selections: visibleSelected } });

                        showActionBar = false;
                        if ($scope.locals.actions) {
                            //only show the action bar if an action has an available selection
                            for (i = 0; i < $scope.locals.actions.length; i++) {
                                action = $scope.locals.actions[i];
                                if (action.selections.length > 0) {
                                    showActionBar = true;
                                }
                            }
                        }
                        
                        $scope.locals.showActionBar = showActionBar;

                        if (showActionBar) {
                            $timeout(function () {
                                bbGrid.syncActionBarViewKeeper();
                            });
                        }
                    }
                    
                    
                    bbGrid.scope.$watchCollection('selectedRows', function (newValue) {
                        updateActionBar(bbGrid.scope.options.data, newValue);
                    });

                    bbGrid.scope.$watchCollection('options.data', function (newValue) {
                        updateActionBar(newValue, bbGrid.scope.selectedRows);
                    });
                    
                    //on mobile do an ng-if that changes the stuff.
                    function mediaBreakpointHandler(newBreakpoints) {
                        $scope.locals.mobileButtons = newBreakpoints.xs;
                    }

                    bbMediaBreakpoints.register(mediaBreakpointHandler);

                    element.on('$destroy', function () {
                        bbMediaBreakpoints.unregister(mediaBreakpointHandler);
                    });

                    $scope.locals.clearSelection = function () {
                        
                        //If the visible selections are the same as the selected rows we can just reset all multiselected rows
                        if (visibleSelected.length === bbGrid.scope.selectedRows.length) {
                            bbGrid.resetMultiselect();
                        } else {
                            bbGrid.toggleMultiselectRows(visibleSelected);
                        }
                        
                    };

                    $scope.locals.chooseAction = function () {
                        $scope.locals.showMobileActions = true;
                    };

                    $scope.locals.cancelChooseAction = function () {
                        $scope.locals.showMobileActions = false;
                    };
                },
                templateUrl: 'sky/templates/grids/actionbar.html'
            };
    }]);
}());