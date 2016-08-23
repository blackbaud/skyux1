/*global angular */
(function () {
    'use strict';
    var nextId = 0;

    function Controller($element, $window, $timeout, $q) {
        var ctrl = this,
            windowEl = angular.element($window),
            componentId = 'bb-infinitescroll-' + nextId;

        function infiniteScrollInView() {
            return windowEl.scrollTop() + windowEl.height() > $element.offset().top;
        }

        function callLoadCallback() {
            var deferred = $q.defer(),
                    loadingPromise;
            loadingPromise = deferred.promise;
             
            loadingPromise.then(function () {
                ctrl.isLoading = false;
            });

            ctrl.bbInfiniteScrollLoad({loadingComplete: deferred.resolve});
        }

        function startInfiniteScrollLoad() {
            if (ctrl.bbInfiniteScrollHasMore && !ctrl.isLoading && infiniteScrollInView()) {
                ctrl.isLoading = true;
                // Put in angular digest cycle
                $timeout(function () {
                    callLoadCallback();
                });
            }
        }

        function onInit() {
            
            ctrl.isLoading = false;
            
            windowEl.on('scroll.' + componentId, function () {
                startInfiniteScrollLoad();
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