/*jshint browser: true, jasmine: true */
/*global angular, inject, module */

describe('Toast service', function () {
    'use strict';

    var $animate,
        bbToast,
        $document,
        $scope,
        $templateCache,
        toastr;

    beforeEach(module('ngAnimate'));
    beforeEach(module('ngAnimateMock'));
    beforeEach(module('ngMock'));

    beforeEach(module('sky.toast'));

    beforeEach(inject(function (_$rootScope_, _toastr_, _bbToast_, _$templateCache_, _$animate_, _$document_) {
        $scope = _$rootScope_;
        toastr = _toastr_;
        bbToast = _bbToast_;
        $templateCache = _$templateCache_;

        $document = _$document_;

        $animate = _$animate_;

        spyOn(toastr, 'info').and.callThrough();
    }));

    afterEach(function () {
        $document.find('#toast-container').remove();
    });

    it('throws an error when you provide both a message and a templateUrl', function () {
        function errorFunctionWrapper() {
            bbToast.open({
                templateUrl: 'bbToast/samples/complexToast.html',
                message: 'This is a message.'
            });
        }

        expect(errorFunctionWrapper).toThrow();

    });

    it('throws an error when you provide neither a message or a templateUrl', function () {
        function errorFunctionWrapper() {
            bbToast.open();
        }

        expect(errorFunctionWrapper).toThrow();
    });

    it('opens a message without a template', function () {
        var myMessage = 'This is a message.';
        bbToast.open({
            message: myMessage
        });

        expect(toastr.info).toHaveBeenCalledWith(myMessage, '', {iconClass: 'bb-toast'});
    });


    it('opens a message with a custom template and controller', function () {
        var containerEl,
            toastEl,
            timeOpenEl,
            messageEl,
            message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, massa ac sollicitudin vestibulum, nulla nulla faucibus.';

        function templateController($scope, message) {
            $scope.timeOpen = 6;
            $scope.message = message;
        }

        templateController.$inject = ['$scope', 'message'];

        $templateCache.put('bbToast/samples/complexToast.html',
            '<div>' +
            'Open for <span>{{timeOpen}}</span> seconds' +
            '</div>' +
            '<br />' +
            '<div>{{message}}</div');

        bbToast.open({
            templateUrl: "bbToast/samples/complexToast.html",
            controller: templateController,
            resolve: {
                message: function () {
                    return message;
                }
            }
        });

        $scope.$digest();

        expect(toastr.info).toHaveBeenCalledWith("<div id='bbtoast-1'></div>", '', {allowHtml: true, iconClass: 'bb-toast'});

        $animate.triggerCallbackPromise();

        $scope.$digest();

        containerEl = $document.find('#toast-container');
        expect(containerEl.length).toBe(1);

        toastEl = containerEl.eq(0).find('#bbtoast-1');
        expect(toastEl.length).toBe(1);

        timeOpenEl = toastEl.eq(0).find('span');
        expect(timeOpenEl.length).toBe(1);
        expect(timeOpenEl).toHaveText('6');

        messageEl = toastEl.eq(0).find('div');
        expect(messageEl.length).toBe(2);
        expect(messageEl.eq(1)).toHaveText(message);

    });

    it('handles not having resolve options or a controller', function () {
        var containerEl;

        $templateCache.put('bbToast/samples/complexToast.html',
            '<div></div>');

        bbToast.open({
            templateUrl: "bbToast/samples/complexToast.html"
        });

        $scope.$digest();

        expect(toastr.info).toHaveBeenCalled();

        $animate.triggerCallbackPromise();

        $scope.$digest();

        containerEl = $document.find('#toast-container');
        expect(containerEl.length).toBe(1);

    });

    it('handles having array values in the resolve function', function () {
        var containerEl,
            message = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed commodo, massa ac sollicitudin vestibulum, nulla nulla faucibus.';

        function templateController($scope, message) {
            $scope.timeOpen = 6;
            $scope.message = message;
        }

        templateController.$inject = ['$scope', 'message'];

        $templateCache.put('bbToast/samples/complexToast.html',
            '<div>' +
            'Open for <span>{{timeOpen}}</span> seconds' +
            '</div>' +
            '<br />' +
            '<div>{{message}}</div');

        bbToast.open({
            templateUrl: "bbToast/samples/complexToast.html",
            controller: templateController,
            resolve: {
                message: [
                    function () {
                        return message;
                    }
                ]
            }
        });

        $scope.$digest();

        expect(toastr.info).toHaveBeenCalled();

        $animate.triggerCallbackPromise();

        $scope.$digest();

        containerEl = $document.find('#toast-container');
        expect(containerEl.length).toBe(1);
    });

    it('does not resolve variables that are not funcitons or arrays', function () {
        var messageGuy;

        function templateController($scope, message) {
            $scope.timeOpen = 6;
            $scope.message = message;
            messageGuy = message;
        }

        templateController.$inject = ['$scope', 'message'];

        $templateCache.put('bbToast/samples/complexToast.html',
            '<div>' +
            'Open for <span>{{timeOpen}}</span> seconds' +
            '</div>' +
            '<br />' +
            '<div>{{message}}</div');

        bbToast.open({
            templateUrl: "bbToast/samples/complexToast.html",
            controller: templateController,
            resolve: {
                message: 'Ya boi'
            }
        });

        $scope.$digest();

        expect(toastr.info).toHaveBeenCalled();
        expect(angular.isDefined(messageGuy)).toBe(false);

    });
});
