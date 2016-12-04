app.controller('NeedController', ['$routeParams', '$http', '$scope' ,function($routeParams,$http,$scope) {

	//$scope.tagline = 'It is need page';
	var needId = $routeParams.id;

	$scope.loadCharges = function () {
		$http.get("/api/v1/users/ysabynin/needs/" + needId + '/charges')
			.then(function (response) {
				$scope.currentCharges = response.data;
			});
	}
}]);