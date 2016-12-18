app.controller('NeedsController', function ($scope, $http, $rootScope) {
    $http.get("/api/v1/users/ysabynin/needs")
        .then(function (response) {
            $scope.needs = response.data;
        });

    $scope.clearForm = function () {
        $scope.needName = '';
    };

    $scope.insertRow = function () {
        var data = {};
        data["title"] = $scope.title;
        data["type"] = "actual";
        data["username"] = "ysabynin";

        $http.post("/api/v1/users/ysabynin/needs/", data)
            .then(function (response) {
                $scope.needs.push(response.data);
                $rootScope.userNeeds.push(response.data);
            });
    };

    $scope.updateRow = function (data) {
        $http.put("/api/v1/users/ysabynin/needs/" + data._id, data)
            .then(function (response) {
                for(var i = 0; i < $scope.userNeeds.length; i++){
                    if($scope.userNeeds[i]._id === response.data._id){
                        $scope.userNeeds[i] = response.data;
                        $rootScope.userNeeds[i] = response.data;
                        break;
                    }
                }
                console.log("try to update charge");
            });
    };

    $scope.deleteRow = function (index) {
        var need = $scope.needs[index];
        $http.delete("/api/v1/users/ysabynin/needs/" + need._id)
            .then(function (response) {
                $scope.needs.splice(index, 1);
                $rootScope.userNeeds.splice(index,1);
                console.log("try to delete charge");
            });
    };
});