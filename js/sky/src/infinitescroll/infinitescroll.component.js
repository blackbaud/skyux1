/*global angular */
(function () {
    'use strict';
    var nextId = 0;

    function Controller($element, $window, $timeout) {
        var ctrl = this,
            windowEl = angular.element($window),
            componentId = 'bb-infinitescroll-' + nextId;

        function infiniteScrollInView() {
            return windowEl.scrollTop() + windowEl.height() > $element.offset().top;
        }

        function callLoadCallback() {
            var loadPromise;

            loadPromise = ctrl.bbInfiniteScrollLoad();

            if (loadPromise && angular.isFunction(loadPromise.then)) {
                loadPromise.then(function () {
                    ctrl.isLoading = false;
                });
            } else {
                ctrl.isLoading = false;
            }
        }

        function startInfiniteScrollLoad() {
            if (ctrl.bbInfiniteScrollHasMore && !ctrl.isLoading && infiniteScrollInView()) {
                ctrl.isLoading = true;
                
                callLoadCallback();
            }
        }

        function onInit() {
            
            ctrl.isLoading = false;
            
            windowEl.on('scroll.' + componentId, function () {
                // Put in angular digest cycle
                $timeout(function () {
                    startInfiniteScrollLoad();
                });
            });
                
        }

        function onDestroy() {
            windowEl.off('scroll.' + componentId);
        }

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;

        ctrl.startInfiniteScrollLoad = startInfiniteScrollLoad;
        nextId++;     
    } 

    Controller.$inject = ['$element', '$window', '$timeout', '$q'];

    angular.module('sky.infinitescroll.component', ['sky.resources', 'sky.wait'])
        .component('bbInfiniteScroll', {
            templateUrl: 'sky/templates/infinitescroll/infinitescroll.component.html',
            bindings: {
                bbInfiniteScrollHasMore: '<',
                bbInfiniteScrollLoad: '&'
            },
            controller: Controller
        
        });
})();