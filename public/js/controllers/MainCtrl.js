app.controller('MainController',function(TreeService,$scope, $http) {
	$http.get("/api/v1/users/ysabynin")
		.then(function (response) {
			$scope.user = response.data;
		});

	$http.get("/api/v1/users/ysabynin/needs")
		.then(function (response) {
			$scope.needs = response.data;
		});

/*	$scope.selectedItemChanged = function () {
		$http.get("/api/v1/users/ysabynin/needs/" + $scope.selectedNeed._id + '/charges')
			.then(function (response) {
				$scope.currentCharges = response.data;
			});
	}*/

	$scope.fetchTreeNodes = function () {
		$http.get("/api/v1/users/ysabynin/tree/needs")
			.then(function (response) {
				$scope.treeNodes = response.data;
			});
	}

	$scope.renderTree = function () {
		TreeService.render();
	}
});