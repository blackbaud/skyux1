/*jshint browser: true, jasmine: true */
/*global angular, inject, module, $ */


describe('Omnibar', function () {
    'use strict';

    var $compile,
        $rootScope,
        $window,
        bbOmnibarConfig,
        OMNIBAR_HTML = '<bb-omnibar></bb-omnibar>';
    
    function createOmnibarAjaxSpy(omnibar) {
        omnibar = omnibar || {
            load: angular.noop
        };
        
        return spyOn($, 'ajax').and.callFake(function (options) {
            expect(options.url).toBe(bbOmnibarConfig.url);
            
            $window.BBAUTH = {
                Omnibar: omnibar
            };

            return {
                done: function (callback) {
                    callback();
                }
            };
        });
    }

    beforeEach(module('ngMock'));
    beforeEach(module('sky.omnibar'));
        
    beforeEach(module(function ($provide) {
        $window = {
            location: {
                href: ''
            }
        };
        
        $provide.constant('$window', $window);
    }));
    
    beforeEach(inject(function (_$rootScope_, _$compile_, _bbOmnibarConfig_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        bbOmnibarConfig = _bbOmnibarConfig_;
    }));

    describe('directive', function () {
        it('should insert the expected HTML', function () {
            var el,
                $scope = $rootScope.$new();

            createOmnibarAjaxSpy();

            el = $compile(OMNIBAR_HTML)($scope);

            $scope.$digest();

            expect(el).toHaveHtml('<div class="bb-omnibar-wrap"></div><div class="bb-omnibar-menu-wrap" ng-transclude></div>');
        });

        it('should request the omnibar JavaScript', function () {
            var el,
                loadCalled,
                $scope = $rootScope.$new();

            createOmnibarAjaxSpy({
                load: function () {
                    loadCalled = true;
                }
            });

            el = $compile(OMNIBAR_HTML)($scope);

            $scope.$digest();

            expect(loadCalled).toBe(true);
        });

        it('should show the navbar on mobile depending on whether the omnibar has its own mobile menu', function () {
            var el,
                loadCalled,
                navbarEl,
                $scope = $rootScope.$new();

            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    loadCalled = true;

                    options.afterLoad();

                    expect(navbarEl).toHaveClass('bb-navbar-showmobile');

                    navbarEl.remove();
                }
            });

            navbarEl = $('<div class="bb-navbar"></div>').appendTo(document.body);

            el = $compile(OMNIBAR_HTML)($scope);

            $scope.$digest();

            expect(loadCalled).toBe(true);
        });

        it('should react when the user types in the search box', function () {
            var el,
                loadCalled,
                $scope = $rootScope.$new();

            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    var emitSpy,
                        searchBoxEl;

                    loadCalled = true;

                    // Simulate the fact that the omnibar load function adds an element with this class.
                    searchBoxEl = $('<input type="text" class="searchbox" />').appendTo(el.find('.bb-omnibar-wrap'));

                    options.afterLoad();

                    emitSpy = spyOn($scope, '$emit');

                    searchBoxEl
                        .click()
                        .val('a')
                        .keyup();

                    $scope.$digest();

                    expect(emitSpy).toHaveBeenCalledWith('searchBoxKeyUp', undefined);
                    expect(emitSpy).toHaveBeenCalledWith('searchBoxClicked');

                    expect($scope.searchText).toBe('a');
                }
            });

            el = $(OMNIBAR_HTML);

            $compile(el)($scope);

            $scope.$digest();

            expect(loadCalled).toBe(true);
        });

        it('should add a CSS class when the user is searching', function () {
            var el,
                loadCalled,
                $scope = $rootScope.$new();

            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    var emitSpy,
                        searchContainerEl;

                    loadCalled = true;

                    // Simulate the fact that the omnibar load function adds an element with this class.
                    searchContainerEl = $('<div class="searchContainer"></div>').appendTo(el.find('.bb-omnibar-wrap'));
                    options.afterLoad();

                    emitSpy = spyOn($scope, '$emit');

                    $scope.searching = true;
                    $scope.$digest();

                    expect(searchContainerEl).toHaveClass('searching');

                    $scope.searching = false;
                    $scope.$digest();

                    expect(searchContainerEl).not.toHaveClass('searching');
                }
            });

            el = $(OMNIBAR_HTML);

            $compile(el)($scope);

            $scope.$digest();

            expect(loadCalled).toBe(true);
        });

        it('should set the search box value when the scope\'s searchText changes', function () {
            var el,
                loadCalled,
                $scope = $rootScope.$new();

            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    var emitSpy,
                        searchBoxEl;

                    loadCalled = true;

                    // Simulate the fact that the omnibar load function adds an element with this class.
                    searchBoxEl = $('<input type="text" class="searchbox" />').appendTo(el.find('.bb-omnibar-wrap'));

                    options.afterLoad();

                    emitSpy = spyOn($scope, '$emit');

                    $scope.searchText = 'foo';
                    $scope.$digest();

                    expect(searchBoxEl).toHaveValue('foo');

                    $scope.searchText = null;
                    $scope.$digest();

                    expect(searchBoxEl).toHaveValue('');
                }
            });

            el = $(OMNIBAR_HTML);

            $compile(el)($scope);

            $scope.$digest();

            expect(loadCalled).toBe(true);
        });

        it('should navigate to login URL when user is not logged in', function () {
            var el,
                loadCalled,
                $scope = $rootScope.$new();

            bbOmnibarConfig.authenticationUserId = 4321;
            bbOmnibarConfig.signOutUrl = 'http://test';

            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    loadCalled = true;

                    options.userLoaded({id: 1234});

                    expect($window.location.href).toBe(bbOmnibarConfig.signOutUrl);
                }
            });

            el = $(OMNIBAR_HTML);

            $compile(el)($scope);

            $scope.$digest();

            expect(loadCalled).toBe(true);
        });

        it('should redirect to a given URL after logging in', function () {
            var el,
                loadCalled,
                $scope = $rootScope.$new();

            bbOmnibarConfig.authenticationUserId = 4321;
            bbOmnibarConfig.signInRedirectUrl = 'http://redirected';
          
            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    var signinEl;

                    loadCalled = true;

                    // Simulate the fact that the omnibar load function adds an element with this class.
                    signinEl = $('<a class="signin"></a>').appendTo(el.find('.bb-omnibar-wrap'));              
                    signinEl.attr('href', encodeURIComponent(options.signInRedirectUrl));

                    options.userLoaded({ id: 4321 });
                    options.afterLoad();
                }
            });

            el = $(OMNIBAR_HTML);

            $compile(el)($scope);

            $scope.$digest();

            expect(loadCalled).toBe(true);
            expect(el.find("a.signin")).toHaveAttr('href', encodeURIComponent(bbOmnibarConfig.signInRedirectUrl));
        });
        
        it('should not endlessly redirect back to the login page if the omnibar returns a null user ID', function () {
            var expectedUrl,
                localStorage = $window.localStorage,
                loadCalled,
                $scope = $rootScope.$new();
            
            // Simulate local storage capability.
            $window.localStorage = {};

            bbOmnibarConfig.authenticationUserId = 4321;
            bbOmnibarConfig.signOutUrl = 'http://test';

            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    loadCalled = true;

                    options.userLoaded({id: null});

                    expect($window.location.href).toBe(expectedUrl);
                }
            });

            expectedUrl = bbOmnibarConfig.signOutUrl;

            $compile(OMNIBAR_HTML)($scope);
            $scope.$digest();

            expect(loadCalled).toBe(true);

            loadCalled = false;
            expectedUrl = $window.location.href = '';

            $compile(OMNIBAR_HTML)($scope);
            $scope.$digest();

            expect(loadCalled).toBe(true);

            $window.localStorage = localStorage;
        });
        
        it('should not error when local storage is undefined', function () {
            var expectedUrl,
                loadCalled,
                $scope = $rootScope.$new();

            bbOmnibarConfig.authenticationUserId = 4321;
            bbOmnibarConfig.signOutUrl = 'http://test';

            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    loadCalled = true;

                    expect(function () {
                        options.userLoaded({id: null});
                    }).not.toThrow();
                }
            });

            expectedUrl = bbOmnibarConfig.signOutUrl;

            $compile(OMNIBAR_HTML)($scope);
            $scope.$digest();

            expect(loadCalled).toBe(true);
        });
        
        it('should call the userLoaded() callback if specified', function () {
            var userLoadedSpy,
                $scope = $rootScope.$new();

            bbOmnibarConfig.userLoaded = angular.noop;
            
            userLoadedSpy = spyOn(bbOmnibarConfig, 'userLoaded');

            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    options.userLoaded({id: 123});
                }
            });

            $compile(OMNIBAR_HTML)($scope);
            $scope.$digest();

            expect(userLoadedSpy).toHaveBeenCalledWith({id: 123});
        });
        
        it('should call the afterLoad() callback if specified', function () {
            var afterLoadSpy,
                $scope = $rootScope.$new();

            bbOmnibarConfig.afterLoad = angular.noop;
            
            afterLoadSpy = spyOn(bbOmnibarConfig, 'afterLoad');

            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    options.afterLoad();
                }
            });

            $compile(OMNIBAR_HTML)($scope);
            $scope.$digest();

            expect(afterLoadSpy).toHaveBeenCalledWith();
        });
    });
    
    describe('menu directive', function () {
        it('should insert the expected HTML', function () {
            var el,
                $scope = $rootScope.$new();

            createOmnibarAjaxSpy();

            el = $compile('<bb-omnibar><bb-omnibar-menu></bb-omnibar-menu></bb-omnibar>')($scope);

            $scope.$digest();

            expect(el).toHaveHtml('<div class="bb-omnibar-wrap"></div><div class="bb-omnibar-menu-wrap" ng-transclude=""><div class="bb-omnibar-menu ng-scope" ng-transclude=""></div></div>');
        });

        it('should hide the navbar on mobile when a mobile menu container is present', function () {
            var el,
                loadCalled,
                navbarEl,
                $scope = $rootScope.$new();
            
            createOmnibarAjaxSpy({
                load: function (omnibarEl, options) {
                    loadCalled = true;
                    
                    // Simulate how the omnibar JavaScript moves the mobile menu container.
                    // Otherwise it will be removed when the omnibar directive removes the
                    // empty menu wrapper element.
                    el.find('.bb-omnibar-menu').appendTo(el.find('.bb-omnibar-wrap'));

                    options.afterLoad();

                    expect(navbarEl).not.toHaveClass('bb-navbar-showmobile');

                    navbarEl.remove();
                    el.remove();
                }
            });

            navbarEl = $('<div class="bb-navbar"></div>').appendTo(document.body);

            /*jslint white: true */
            el = $(
                '<bb-omnibar>'  +
                    '<bb-omnibar-menu>' + 
                        '<div class="mobile">' +
                            '<div class="productmenucontainer"></div>' +
                        '</div>' +
                    '</bb-omnibar-menu>' + 
                '</bb-omnibar>'
            ).appendTo(document.body);
            /*jslint white: false */
                
            $compile(el)($scope);

            $scope.$digest();

            expect(loadCalled).toBe(true);
        });
    });
});