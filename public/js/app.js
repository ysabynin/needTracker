var app = angular.module('sampleApp', ['ngRoute','googlechart','ngCsvImport']);

app.run(function($rootScope, $http) {
    $http.get("/api/v1/users/ysabynin")
        .then(function (response) {
            $rootScope.userNeeds = response.data["profile"]["needs"];
        });
});

app.directive("formatDate", function(){
    return {
        require: 'ngModel',
        link: function(scope, elem, attr, modelCtrl) {
            modelCtrl.$formatters.push(function(modelValue){
                return new Date(modelValue);
            })
        }
    }
});