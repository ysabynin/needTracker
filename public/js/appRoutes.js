app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/needs', {
			templateUrl: 'views/needs.html',
			controller: 'NeedsController'
		})
		.when('/needs/:id', {
			templateUrl: 'views/need.html',
			controller: 'NeedController'
		})
		.when('/import', {
			templateUrl: 'views/import.html',
			controller: 'ImportController'
		})
		.when('/statistics', {
			templateUrl: 'views/statistics.html',
			controller: 'StatisticsController'
		});

	$locationProvider.html5Mode(true);

}]);