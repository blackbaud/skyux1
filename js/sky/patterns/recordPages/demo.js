angular.module('KitchenSink').controller('RecordPagesPatternController', ['$scope', 'bbPaging', function ($scope, bbPaging) {
    var items = [
        {text: 'Item 1'},
        {text: 'Item 2'},
        {text: 'Item 3'},
        {text: 'Item 4'},
        {text: 'Item 5'},
        {text: 'Item 6'},
        {text: 'Item 7'},
        {text: 'Item 8'},
        {text: 'Item 9'},
        {text: 'Item 10'},
        {text: 'Item 11'},
        {text: 'Item 12'}
    ];

    $scope.locals = {
        itemsPaged: bbPaging.init(items)
    };
}]);