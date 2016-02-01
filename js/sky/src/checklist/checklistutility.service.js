/*global angular */

(function () {
    'use strict';
    
    angular.module('sky.checklist.utility', [])
        .factory('bbChecklistUtility', function () {
            return {
                
                contains: function (arr, item) {
                    var i;

                    if (angular.isArray(arr)) {
                        for (i = 0; i < arr.length; i += 1) {
                            if (angular.equals(arr[i], item)) {
                                return true;
                            }
                        }
                    }
                    return false;
                },

                // add
                add: function (arr, item) {
                    var i;

                    arr = angular.isArray(arr) ? arr : [];
                    for (i = 0; i < arr.length; i += 1) {
                        if (angular.equals(arr[i], item)) {
                            return arr;
                        }
                    }
                    arr.push(item);
                    return arr;
                },

                // remove
                remove: function (arr, item) {
                    var i;

                    if (angular.isArray(arr)) {
                        for (i = 0; i < arr.length; i += 1) {
                            if (angular.equals(arr[i], item)) {
                                arr.splice(i, 1);
                                break;
                            }
                        }
                    }
                    return arr;
                }

            };
        });
}());