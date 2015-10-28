/*jshint browser: true, jasmine: true */
/*global inject, module, $ */

describe('Search field directive', function () {
    'use strict';
    var $compile,
        $rootScope,
        $timeout,
        bbResources;
    
    function createSingleSelectEl($scope) {
        return $compile(
            '<ui-select ng-model="searchValue">' +
                '<ui-select-match>{{$select.selected.value}}</ui-select-match>' +
                '<ui-select-choices repeat="searchResult in searchResults" refresh="doSearch($select.search, \'single\')" refresh-delay="250">' + 
                    '<span>{{searchResult.text}}</span>' +
                '</ui-select-choices>' +
            '</ui-select>'
        )($scope);
    }
    
    function createMultiSelectEl($scope) {
        return $compile(
            '<ui-select multiple ng-model="selectedValues" style="width: 100px">' +
                '<ui-select-match>{{$item.name}}</ui-select-match>' +
                '<ui-select-choices repeat="item.id as item in items | filter: $select.search">' +
                    '<span>{{item.name}}</span>' +
                '</ui-select-choices>' +
            '</ui-select>'
        )($scope);
    }
    
    function getStatusEl(el) {
        return el.find('.bb-searchfield-no-records');
    }

    beforeEach(module('ngMock'));
    beforeEach(module('ui.select', 'sky.searchfield'));

    beforeEach(inject(function (_$compile_, _$rootScope_, _$timeout_, _bbResources_) {
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $timeout = _$timeout_;
        bbResources = _bbResources_;
    }));
    
    it('should display a status message when the user is searching', function () {
        var $scope = $rootScope.$new(),
            el,
            elScope;
        
        el = createSingleSelectEl($scope);
        
        $scope.$digest();
        
        elScope = el.scope();
        
        elScope.$select.search = 'test';
        $scope.$digest();
        
        expect(getStatusEl(el)).toHaveText(bbResources.searchfield_searching);
        
        elScope.$select.search = '';
        $scope.$digest();
        
        expect(getStatusEl(el).length).toBe(0);
    });
    
    it('should display a status message when no records are found.', function () {
        var $scope = $rootScope.$new(),
            el,
            elScope;
        
        el = createSingleSelectEl($scope);
        
        $scope.$digest();
        
        elScope = el.scope();
        
        elScope.$select.search = 'test';
        $scope.$digest();
        
        $scope.$broadcast('bbSearchFinished');
        $scope.$digest();
        
        expect(getStatusEl(el)).toHaveText(bbResources.searchfield_no_records);
    });
    
    it('should size match items properly', function () {
        var $scope = $rootScope.$new(),
            el,
            matchItemEl;
        
        el = createMultiSelectEl($scope);
        
        el.appendTo(document.body);
        
        $scope.items = [
            {
                id: 1,
                name: 'Item with a really long name that should take up more than 100 pixels'
            }
        ];
        
        $scope.selectedValues = [1];
        
        $scope.$digest();
        $timeout.flush();
        
        matchItemEl = el.find('.ui-select-match-item');
        
        expect(matchItemEl.eq(0).width() <= el.width()).toBe(true);
        
        el.remove();
    });
    
    it('should size match items when the window resizes', function () {
        var $scope = $rootScope.$new(),
            el,
            matchItemEl;
        
        el = createMultiSelectEl($scope);
        
        el.appendTo(document.body);
        
        $scope.items = [
            {
                id: 1,
                name: 'Item with a really long name that should take up more than 100 pixels'
            }
        ];
        
        $scope.selectedValues = [1];
        
        $scope.$digest();
        $timeout.flush();
        
        matchItemEl = el.find('.ui-select-match-item');
        
        expect(matchItemEl.width() <= el.width()).toBe(true);
        
        el.width(30);
        
        expect(matchItemEl.width()).toBeGreaterThan(el.width());
        
        $(window).resize();
        $timeout.flush();
        
        expect(matchItemEl.width() <= el.width()).toBe(true);
        
        el.remove();
    });
    
    it('should stop listening to window resize event when destroyed', function () {
        var $scope = $rootScope.$new(),
            el,
            elScope,
            offSpy;
        
        el = createMultiSelectEl($scope);
        
        $scope.items = [
            {
                id: 1,
                name: '1'
            }
        ];
        
        $scope.$digest();
        $timeout.flush();
        
        elScope = el.scope();
        
        offSpy = spyOn($.fn, 'off').and.callThrough();
        
        $scope.$destroy();
        
        expect(offSpy).toHaveBeenCalledWith('resize.searchField' + elScope.$id);
    });
});