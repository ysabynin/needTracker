app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})
		.when('/needs', {
			templateUrl: 'views/need.html',
			controller: 'NeedController'
		})
		.when('/needs/:id', {
			templateUrl: 'views/need.html',
			controller: 'NeedController'
		})
		.when('/history', {
			templateUrl: 'views/history.html',
			controller: 'HistoryController'
		})
		.when('/statistics', {
			templateUrl: 'views/statistics.html',
			controller: 'StatisticsController'
		});

	$locationProvider.html5Mode(true);

}]);