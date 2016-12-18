app.controller('MainController',function(TreeService,$scope, $http) {
	$http.get("/api/v1/users/ysabynin")
		.then(function (response) {
			$scope.user = response.data;
		});

	$http.get("/api/v1/users/ysabynin/tree/needs")
		.then(function (response) {
			$scope.treeNodes = response.data;
		});

    $scope.clearForm = function () {
        $scope.needName = '';
    };

    $scope.addNeed = function(){
        var data = {};
        data["title"] = $scope.needName;
        data["type"] = "actual";
        data["username"] = "ysabynin";

        $http.post("/api/v1/users/ysabynin/needs",data)
            .then(function (response) {
                TreeService.render();
            });
    };

    $scope.exportToCSV = function () {
        $http.get("/api/v1/users/ysabynin/charges/export")
            .then(function (response) {
                console.log("csv downloaded");
            });
    };

	$scope.renderTree = function () {
		TreeService.render(true);
	}
});