app.controller('StatisticsController',function(TreeService,$scope, $http) {

    $scope.renderChart1 = function () {
        TreeService.render();
    };

    $scope.renderChart2 = function () {
        TreeService.render();
    };
});