/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

describe('Data service', function () {
    'use strict';

    var bbData,
        bbDataConfig,
        postData,
        putData,
        saveData,
        $httpBackend,
        $rootScope,
        $templateCache;

    beforeEach(module('ngMock'));
    beforeEach(module('sky.data'));

    beforeEach(inject(function (_bbData_, _bbDataConfig_, _$httpBackend_, _$rootScope_, _$templateCache_) {
        bbData = _bbData_;
        bbDataConfig = _bbDataConfig_;
        $httpBackend = _$httpBackend_;
        $rootScope = _$rootScope_;
        $templateCache = _$templateCache_;

        postData = {
            query: 'abc'
        };

        putData = {
            id: 2,
            name: 'steve'
        };

        saveData = {
            name: 'bob'
        };

        $httpBackend
            .when('GET', '/foo/data')
            .respond(200, {foo: 'bar'});

        $httpBackend
            .when('GET', '/foo/data?abc=123')
            .respond(200, {foo: 'bar'});

        $httpBackend
            .when('GET', '/foo/resources')
            .respond(200, {name: 'value'});

        $httpBackend
            .when('GET', '/foo/text')
            .respond(200, '<div></div>');

        $httpBackend
            .when('POST', '/foo/post', JSON.stringify(postData))
            .respond(200, {post: 'worked'});

        $httpBackend
            .when('POST', '/foo/save', JSON.stringify(saveData))
            .respond(200, {id: 1});

        $httpBackend
            .when('PUT', '/foo/put', JSON.stringify(putData))
            .respond(200, {id: 2});

        $httpBackend
            .when('GET', '/foo/404')
            .respond(404);
    }));

    describe('load() method', function () {
        it('should return single data object', function () {
            bbData.load({
                data: '/foo/data'
            }).then(function (result) {
                expect(result.data.foo).toBe('bar');
            });

            $httpBackend.flush();
        });

        it('should return multiple data objects', function () {
            bbData.load({
                data: {
                    a: '/foo/data',
                    b: '/foo/data'
                }
            }).then(function (result) {
                expect(result.data.a.foo).toBe('bar');
                expect(result.data.b.foo).toBe('bar');
            });

            $httpBackend.flush();
        });

        it('should return single resources object', function () {
            bbData.load({
                resources: '/foo/resources'
            }).then(function (result) {
                expect(result.resources.name).toBe('value');
            });

            $httpBackend.flush();
        });

        it('should return multiple resources objects', function () {
            bbData.load({
                resources: {
                    c: '/foo/resources',
                    d: '/foo/resources'
                }
            }).then(function (result) {
                expect(result.resources.c.name).toBe('value');
                expect(result.resources.d.name).toBe('value');
            });

            $httpBackend.flush();
        });

        it('should return data, resources and text objects', function () {
            bbData.load({
                data: '/foo/data',
                resources: '/foo/resources',
                text: '/foo/text'
            }).then(function (result) {
                expect(result.data.foo).toBe('bar');
                expect(result.resources.name).toBe('value');
                expect(result.text).toBe('<div></div>');
            });

            $httpBackend.flush();
        });

        it('should return an httpResults property that contains the full result object from the underlying $http call', function () {
            bbData.load({
                data: '/foo/data',
                resources: {
                    c: '/foo/resources',
                    d: '/foo/resources'
                },
                text: '/foo/text'
            }).then(function (result) {
                var dataResults,
                    httpResults,
                    resourcesResults,
                    textResults;

                httpResults = result.httpResults;

                dataResults = httpResults.data;
                resourcesResults = httpResults.resources;
                textResults = httpResults.text;

                expect(dataResults.status).toBe(200);
                expect(dataResults.data.foo).toBe('bar');

                expect(resourcesResults.c.status).toBe(200);
                expect(resourcesResults.c.data.name).toBe('value');

                expect(resourcesResults.d.status).toBe(200);
                expect(resourcesResults.d.data.name).toBe('value');

                expect(textResults.status).toBe(200);
                expect(textResults.data).toBe('<div></div>');
            });

            $httpBackend.flush();
        });

        it('should bypass $http if text is present in $templateCache', function () {
            // $httpBackend mock doesn't expect /foo/cache, so this test should fail if bbData
            // doesn't look in the template cache first.
            $templateCache.put('/foo/cache', '<input type="text" />');

            bbData.load({
                text: '/foo/cache'
            }).then(function (result) {
                expect(result.text).toBe('<input type="text" />');
            });
        });

        it('should fall into catch() on 404 response', function () {
            bbData.load({
                data: '/foo/404'
            }).then(function () {
                fail('Request did not fall into catch().');
            }).catch(function (result) {
                expect(result.status).toBe(404);
            });

            $httpBackend.flush();
        });
    });

    describe('query() method', function () {
        it('should create a query string based on an object\'s properties', function () {
            var urlWithQuery = bbData.query('/foo/search', {x: 'y', z: 123});

            expect(urlWithQuery).toBe('/foo/search?x=y&z=123');
        });
    });

    describe('post() method', function () {
        it('should issue a POST with the provided data', function () {
            bbData.load({
                data: bbData.post('/foo/post', postData)
            }).then(function (result) {
                expect(result.data.post).toBe('worked');
            });

            $httpBackend.flush();
        });
    });

    describe('save() method', function () {
        it('should issue a POST with the provided data', function () {
            bbData.save({
                url: '/foo/save',
                data: saveData
            }).then(function (result) {
                expect(result.data.id).toBe(1);
            });

            $httpBackend.flush();
        });

        it('should issue the request with a specified HTTP verb', function () {
            bbData.save({
                url: '/foo/put',
                data: putData,
                type: 'PUT'
            }).then(function (result) {
                expect(result.data.id).toBe(2);
            });

            $httpBackend.flush();
        });

        it('should apply the expected transform and HTTP header properties when the data is form data (this allows files to be uploaded)', function () {
            var formData = new FormData(),
                identitySpy = spyOn(angular, 'identity').and.callThrough();

            formData.append('test', 'blah');

            bbData.save({
                url: '/foo/upload',
                data: formData
            });

            $httpBackend.expect('POST', '/foo/upload', formData, function (headers) {
                return angular.isUndefined(headers['Content-Type']);
            }).respond(200, {});

            $httpBackend.flush();

            // The angular.identity function should be called as the transformRequest method instead of the
            // method that transforms it to JSON.
            expect(identitySpy).toHaveBeenCalled();
        });
    });

    describe('cancel() method', function () {
        it('should abort the HTTP request', function () {
            var promise;

            promise = bbData.load({
                data: '/foo/text'
            });

            bbData.cancel(promise);
            $rootScope.$digest();

            $httpBackend.verifyNoOutstandingRequest();
        });

        it('should reject promise returned by load()', function () {
            var promise,
                promiseRejected = false,
                promiseResolved = false;

            promise = bbData.load({
                data: '/foo/text'
            });

            promise
                .then(function () {
                    promiseResolved = true;
                })
                .catch(function () {
                    promiseRejected = true;
                });

            $rootScope.$digest();

            expect(promiseResolved).toBe(false);
            expect(promiseRejected).toBe(false);

            bbData.cancel(promise);
            $rootScope.$digest();

            expect(promiseResolved).toBe(false);
            expect(promiseRejected).toBe(true);
        });

        it('should reject promise returned by save()', function () {
            var promise,
                promiseRejected = false,
                promiseResolved = false;

            promise = bbData.save({
                url: '/foo/save',
                data: saveData
            });

            promise
                .then(function () {
                    promiseResolved = true;
                })
                .catch(function () {
                    promiseRejected = true;
                });

            $rootScope.$digest();

            expect(promiseResolved).toBe(false);
            expect(promiseRejected).toBe(false);

            bbData.cancel(promise);
            $rootScope.$digest();

            expect(promiseResolved).toBe(false);
            expect(promiseRejected).toBe(true);
        });

        it('should do nothing if a null promise is supplied', function () {
            bbData.cancel();
        });
    });

    describe('when require is present', function () {
        var windowDefine,
            windowRequire;

        beforeEach(function () {
            windowDefine = window.define;
            windowRequire = window.require;

            window.define = {
                amd: true
            };

            window.require = {
                toUrl: angular.noop
            };
        });

        afterEach(function () {
            window.define = windowDefine;
            window.require = windowRequire;
        });

        it('should not pass the query string to the require.toUrl() method', function () {
            var toUrlSpy;

            toUrlSpy = spyOn(window.require, 'toUrl');

            bbData.load({
                data: '/foo/data?abc=123'
            });

            expect(toUrlSpy).toHaveBeenCalledWith('/foo/data');
        });
    });

    describe('config', function () {
        var dataUrlFilter,
            resourceUrlFilter,
            textUrlFilter;

        beforeEach(function () {
            function filter(url) {
                return url;
            }

            dataUrlFilter = bbDataConfig.dataUrlFilter;
            resourceUrlFilter = bbDataConfig.resourceUrlFilter;
            textUrlFilter = bbDataConfig.textUrlFilter;

            angular.extend(bbDataConfig, {
                dataUrlFilter: filter,
                resourceUrlFilter: filter,
                textUrlFilter: filter
            });
        });

        afterEach(function () {
            angular.extend(bbDataConfig, {
                dataUrlFilter: dataUrlFilter,
                resourceUrlFilter: resourceUrlFilter,
                textUrlFilter: textUrlFilter
            });
        });

        it('should allow custom filter functions for each request type', function () {
            var dataUrlFilterSpy = spyOn(bbDataConfig, 'dataUrlFilter').and.callThrough(),
                resourceUrlFilterSpy = spyOn(bbDataConfig, 'resourceUrlFilter').and.callThrough(),
                textUrlFilterSpy = spyOn(bbDataConfig, 'textUrlFilter').and.callThrough();

            bbData.load({
                data: '/foo/data',
                resources: '/foo/resources',
                text: '/foo/text'
            });

            expect(dataUrlFilterSpy).toHaveBeenCalledWith('/foo/data');
            expect(resourceUrlFilterSpy).toHaveBeenCalledWith('/foo/resources');
            expect(textUrlFilterSpy).toHaveBeenCalledWith('/foo/text');
        });
    });

    describe('load manager', function () {
        var EVT_MARK_COMPLETED = 'bbData.loadManager.markCompleted',
            EVT_REGISTER_ITEM = 'bbData.loadManager.registerItem';

        it('should raise the expected registered and completed events when passed to bbData.load()', function () {
            var $scope = $rootScope.$new(),
                completedFired = false,
                registerFired = false;

            $rootScope.$on(EVT_REGISTER_ITEM, function () {
                registerFired = true;
            });

            $rootScope.$on(EVT_MARK_COMPLETED, function () {
                completedFired = true;
            });

            bbData.load({
                data: '/foo/data',
                loadManager: {
                    scope: $scope,
                    name: 'LoadManagerTest'
                }
            });

            expect(registerFired).toBe(true);
            expect(completedFired).toBe(false);

            $httpBackend.flush();

            expect(completedFired).toBe(true);
        });

        it('should start a page wait when the first child item begins to load', function () {
            var $scope = $rootScope.$new(),
                emitSpy;

            emitSpy = spyOn($scope, '$emit').and.callThrough();

            bbData.load({
                data: '/foo/data',
                loadManager: {
                    scope: $scope,
                    name: 'LoadManagerTest',
                    waitForFirstItem: true
                }
            });

            expect(emitSpy).toHaveBeenCalledWith('bbBeginWait');
        });

        it('should allow wait to be canceled when waiting for first item', function () {
            var $scope = $rootScope.$new(),
                emitSpy,
                result;

            result = bbData.loadManager({
                scope: $scope,
                name: 'LoadManagerTest',
                waitForFirstItem: true
            });

            emitSpy = spyOn($scope, '$emit').and.callThrough();

            result.cancelWaiting();

            expect(emitSpy).toHaveBeenCalledWith('bbEndWait');
        });

        it('should allow wait to be canceled when showing a non-blocking wait for additional items', function () {
            var $childScope1,
                $childScope2,
                $scope = $rootScope.$new(),
                childResult1,
                childResult2,
                emitSpy,
                result;

            $childScope1 = $scope.$new();
            $childScope2 = $scope.$new();

            result = bbData.loadManager({
                scope: $scope,
                isAggregate: true,
                name: 'LoadManagerTest',
                nonblockWaitForAdditionalItems: true
            });

            childResult1 = bbData.loadManager({
                scope: $childScope1
            });

            childResult2 = bbData.loadManager({
                scope: $childScope2
            });

            $childScope1.$emit(EVT_REGISTER_ITEM, childResult1);
            $childScope2.$emit(EVT_REGISTER_ITEM, childResult2);

            $childScope1.$emit(EVT_MARK_COMPLETED, childResult1);

            emitSpy = spyOn($scope, '$emit').and.callThrough();

            result.cancelWaiting();

            expect(emitSpy).toHaveBeenCalledWith('bbEndWait', {
                nonblocking: true
            });
        });

        it('should wait for all child items to finish loading', function () {
            var $scope = $rootScope.$new(),
                parentResult;

            parentResult = bbData.loadManager({
                scope: $scope,
                name: 'LoadManagerTest',
                isAggregate: true
            });

            expect(parentResult.isLoading).toBeFalsy();

            bbData.load({
                data: '/foo/data',
                loadManager: {
                    scope: $scope.$new(),
                    name: 'LoadManagerChildTest1'
                }
            }).then(function () {
                expect(parentResult.isLoading).toBe(true);
            });

            bbData.load({
                data: '/foo/data',
                loadManager: {
                    scope: $scope.$new(),
                    name: 'LoadManagerChildTest2'
                }
            }).then(function () {
                expect(parentResult.isLoading).toBe(false);
            });

            expect(parentResult.isLoading).toBe(true);

            $httpBackend.flush();
        });

        it('should start a non-blocking wait after its first item is loaded', function () {
            var $scope = $rootScope.$new(),
                emitSpy;

            bbData.loadManager({
                scope: $scope,
                name: 'LoadManagerTest',
                isAggregate: true,
                nonblockWaitForAdditionalItems: true
            });

            emitSpy = spyOn($scope, '$emit').and.callThrough();

            bbData.load({
                data: '/foo/data',
                loadManager: {
                    scope: $scope.$new(),
                    name: 'LoadManagerChildTest1'
                }
            }).then(function () {
                expect(emitSpy).toHaveBeenCalledWith('bbBeginWait', {
                    nonblocking: true
                });
            });

            bbData.load({
                data: '/foo/data',
                loadManager: {
                    scope: $scope.$new(),
                    name: 'LoadManagerChildTest2'
                }
            }).then(function () {
                expect(emitSpy).toHaveBeenCalledWith('bbEndWait', {
                    nonblocking: true
                });
            });

            $httpBackend.flush();
        });

        it('should start a non-blocking wait when the first item has been loaded and a second item is registered', function () {
            var $scope = $rootScope.$new(),
                emitSpy;

            bbData.loadManager({
                scope: $scope,
                name: 'LoadManagerTest',
                isAggregate: true,
                nonblockWaitForAdditionalItems: true
            });

            bbData.load({
                data: '/foo/data',
                loadManager: {
                    scope: $scope.$new(),
                    name: 'LoadManagerChildTest1'
                }
            });

            $httpBackend.flush();

            emitSpy = spyOn($scope, '$emit').and.callThrough();

            bbData.load({
                data: '/foo/data',
                loadManager: {
                    scope: $scope.$new(),
                    name: 'LoadManagerChildTest2'
                }
            });

            expect(emitSpy).toHaveBeenCalledWith('bbBeginWait', {
                nonblocking: true
            });
        });

        it('should end wait when the first item is loaded', function () {
            var $scope = $rootScope.$new(),
                emitSpy;

            bbData.loadManager({
                scope: $scope,
                name: 'LoadManagerTest',
                isAggregate: true,
                nonblockWaitForAdditionalItems: true,
                waitForFirstItem: true
            });

            bbData.load({
                data: '/foo/data',
                loadManager: {
                    scope: $scope.$new(),
                    name: 'LoadManagerChildTest1'
                }
            });

            emitSpy = spyOn($scope, '$emit').and.callThrough();

            $httpBackend.flush();

            expect(emitSpy).toHaveBeenCalledWith('bbEndWait');
        });

        it('should not error when mark completed is fired with no item', function () {
            var $scope = $rootScope.$new();

            bbData.loadManager({
                scope: $scope,
                name: 'LoadManagerTest',
                isAggregate: true
            });

            $scope.$new().$emit(EVT_MARK_COMPLETED);
        });
    });
});
