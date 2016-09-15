/*global angular */
(function () {
    'use strict';
    var nextId = 0;

    function Controller($element, $window, $timeout) {
        var ctrl = this,
            scrollableParentEl,
            scrollableParentIsWindow = false,
            componentId = 'bb-infinitescroll-' + nextId;

        function infiniteScrollInView() {
            if (scrollableParentIsWindow) {
                return scrollableParentEl.scrollTop() + scrollableParentEl.height() > $element.offset().top;
            } else {
                return scrollableParentEl.scrollTop() + scrollableParentEl.height() > $element.position().top;
            }
        }

        function loadComplete() {
            ctrl.isLoading = false;
        }

        function callLoadCallback() {
            var loadPromise;

            loadPromise = ctrl.bbInfiniteScrollLoad();

            if (loadPromise && angular.isFunction(loadPromise.then)) {
                loadPromise.then(function () {
                    loadComplete();
                });
            } else {
                loadComplete();
            }
        }

        function startInfiniteScrollLoad() {
            if (ctrl.bbInfiniteScrollHasMore && !ctrl.isLoading && infiniteScrollInView()) {
                ctrl.isLoading = true;
                
                callLoadCallback();
            }
        }

        function getScrollableParentEl(el) {
            var parentEl = angular.element(el).parent();

            while (parentEl.length > 0 && !parentEl.is('body')) {
                switch (parentEl.css('overflow-y')) {
                    case 'auto':
                    case 'scroll':
                        return parentEl;
                }

                parentEl = parentEl.parent();
            }
            scrollableParentIsWindow = true;
            return angular.element($window);
        }

        function onInit() {
            
            ctrl.isLoading = false;

            scrollableParentEl = getScrollableParentEl($element);
            
            scrollableParentEl.on('scroll.' + componentId, function () {
                // Put in angular digest cycle
                $timeout(function () {
                    startInfiniteScrollLoad();
                });
            });
                
        }

        function onDestroy() {
            scrollableParentEl.off('scroll.' + componentId);
        }

        ctrl.$onInit = onInit;
        ctrl.$onDestroy = onDestroy;

        ctrl.startInfiniteScrollLoad = startInfiniteScrollLoad;
        nextId++;     
    } 

    Controller.$inject = ['$element', '$window', '$timeout'];

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