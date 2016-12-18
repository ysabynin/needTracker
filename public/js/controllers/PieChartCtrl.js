app.controller('PieChartController',function($scope,$http) {
    $scope.pieChartObject = {};

    $scope.pieChartObject.type = "PieChart";

    $http.get("/api/v1/users/ysabynin/statistics/piechart")
        .then(function (response) {
            var resData = response.data;
            for(var i = 0; i < resData.length; i++){
                var arr = {"c":[{"v":resData[i]._id},{"v":resData[i].sum}]};
                $scope.pieChartObject.data.rows.push(arr);
            }
        });

    $scope.pieChartObject.data = {"cols": [
        {id: "t", label: "Topping", type: "string"},
        {id: "s", label: "Slices", type: "number"}
    ], "rows": []};

    $scope.pieChartObject.options = {
        'title': 'Расходы по потребностям(руб.)',
        'pieHole': 0.4
    };
});