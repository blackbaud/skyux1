/*global angular */
(function () {
    'use strict';
    var nextId = 0;

    function Controller($element, $window, $timeout, $q, bbResources) {
        var ctrl = this,
            windowEl = angular.element($window),
            componentId = 'bb-infinityscroll-' + nextId;

        function infinityScrollInView() {
            return windowEl.scrollTop() + windowEl.height() > $element.offset().top;
        }

        function startInfinityScrollLoad() {
            var deferred = $q.defer(),
                    loadingPromise;
            loadingPromise = deferred.promise;
             
            loadingPromise.then(function () {
                ctrl.isLoading = false;
            });

            ctrl.bbInfinityScrollLoad({loadingComplete: deferred.resolve});
        }

        function onInit() {

            if (!ctrl.bbInfinityScrollLoadMoreText) {
                ctrl.bbInfinityScrollLoadMoreText = bbResources.infinity_scroll_load_more;
            }
            
            ctrl.isLoading = false;
            
            windowEl.on('scroll.' + componentId, function () {
                
                if (ctrl.bbInfinityScrollHasMore && !ctrl.isLoading) {
                    ctrl.isLoading = true;
                    
                    // Put in angular digest cycle
                    $timeout(function () {
                        if (infinityScrollInView()) {
                            startInfinityScrollLoad();
                        } else {
                            ctrl.isLoading = false;
                        }
                    });
                }
            });
        }

        function onDestroy() {
            windowEl.off('scroll.' + componentId);
        }

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;

        ctrl.startInfinityScrollLoad = startInfinityScrollLoad;
        nextId++;     
    } 

    Controller.$inject = ['$element', '$window', '$timeout', '$q', 'bbResources'];

    angular.module('sky.infinityscroll.component', ['sky.resources', 'sky.wait'])
        .component('bbInfinityScroll', {
            templateUrl: 'sky/templates/infinityscroll/infinityscroll.component.html',
            bindings: {
                bbInfinityScrollHasMore: '<',
                bbInfinityScrollLoad: '&',
                bbInfinityScrollLoadMoreText: '<?'
            },
            controller: Controller
        
        });
}());