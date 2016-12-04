app.service('LocationService', ['$location','$rootScope', function($location, $rootScope) {
    var changeLocation = function(url) {
        $location.path(url);
        $rootScope.$apply()
    };

    return{
        changeLocation: changeLocation
    }
}]);