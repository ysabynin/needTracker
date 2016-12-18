app.controller('ImportController', function($scope, $http) {

    $scope.importedCharges = [];

    $scope.isImported = false;

    $scope.csv = {
        content: null,
        header: true,
        headerVisible: true,
        separator: ';',
        separatorVisible: true,
        result: null,
        encoding: 'ISO-8859-1',
        encodingVisible: false,
        uploadButtonLabel: "upload a csv file"
    };

    $scope.getResult = function () {
        var a = $scope.csv.result;
        if(a && !$scope.isImported){
            for(var i= 0 ; i < a.length;i++){
                var object = {};
                var keys = Object.keys(a[i]);
                object["name"] = a[i][keys[1]];
                //ignore salary
                if(a[i][keys[3]].indexOf("-") !== -1)
                    object["sum"] = Number(a[i][keys[3]].replace("-",""));
                object["date"] = moment(a[i][keys[0]],'DD.MM.YYYY HH:mm').toISOString();
                object["reciever"] = a[i][keys[1]];
                object["needName"] = "";
                object["username"] = "ysabynin";

                $scope.importedCharges.push(object)
            }

            $scope.isImported = true;
        }
    };

    $scope.updateRow = function(data){
        $http.put("/api/v1/users/ysabynin/charges/"+data._id,data)
            .then(function (response) {
                console.log("try to update charge");
            });
    };

    $scope.deleteRow = function(index){
        var charge = $scope.importedCharges[index];
        $http.delete("/api/v1/users/ysabynin/charges/"+charge._id)
            .then(function (response) {
                $scope.importedCharges.splice(index,1)[0];
                console.log("try to delete charge");
            });
    };

    $scope.loadImportedCharges = function () {
        $http.get("/api/v1/users/ysabynin/charges")
            .then(function (response) {
                $scope.importedCharges = response.data;
            });
    };

    $scope.deleteImportedData = function () {
        $http.delete("/api/v1/users/ysabynin/charges")
            .then(function (response) {
                $scope.importedCharges = [];
            });
    };

    $scope.saveImportedData = function () {
        $http.post("/api/v1/users/ysabynin/charges", $scope.importedCharges)
            .then(function (response) {
                $scope.importedCharges = response.data;
            });
    };
});