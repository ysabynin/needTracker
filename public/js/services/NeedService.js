app.service('NeedService', ['$http', function($http) {
    $scope.loadNeed = function () {
        $http.get("/api/v1/users/ysabynin/needs/" + $scope.selectedNeed._id + '/charges')
            .then(function (response) {
                $scope.currentCharges = response.data;
            });
    }
}]);