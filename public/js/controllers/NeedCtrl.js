app.controller('NeedController', ['$routeParams', '$http', '$scope' ,function($routeParams,$http,$scope) {
	var needId = $routeParams.id;

	$scope.loadCharges = function () {
		$http.get("/api/v1/users/ysabynin/needs/" + needId + '/charges')
			.then(function (response) {
				$scope.currentCharges = response.data;
			});
	}

	$scope.insertRow = function(){
		var data = {};
		data["name"] = $scope.title;
		data["sum"] = $scope.sum;
		data["date"] = $scope.date;
		data["reciever"] = $scope.place;

		$http.post("/api/v1/users/ysabynin/needs/" + needId + '/charges',data)
			.then(function (response) {
				$scope.currentCharges.push(response.data);
			});
	};

	$scope.updateRow = function(data){
		$http.put("/api/v1/users/ysabynin/needs/" + needId + '/charges/'+data._id,data)
			.then(function (response) {
				console.log("try to update charge");
			});
	};

	$scope.deleteRow = function(index){
		var charge = $scope.currentCharges[index];
		$http.delete("/api/v1/users/ysabynin/needs/" + needId + '/charges/'+charge._id)
			.then(function (response) {
				$scope.currentCharges.splice(index,1)[0];
				console.log("try to delete charge");
			});
	};
}]);