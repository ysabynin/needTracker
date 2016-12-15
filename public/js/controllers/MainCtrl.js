app.controller('MainController',function(TreeService,$scope, $http) {
	$http.get("/api/v1/users/ysabynin")
		.then(function (response) {
			$scope.user = response.data;
		});

	$http.get("/api/v1/users/ysabynin/tree/needs")
		.then(function (response) {
			$scope.treeNodes = response.data;
		});

	$scope.renderTree = function () {
		TreeService.render();
	}



});