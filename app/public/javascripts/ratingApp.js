/**
 * Angular app module.
 */
var ratingApp = angular.module('ratingApp', ['ngRoute', 'ngResource']).run(function($rootScope) {
	$rootScope.authenticated = false;
	$rootScope.current_user = '';
	
	$rootScope.signout = function(){
		$rootScope.authenticated = false;
    	$rootScope.current_user = '';
    	$http.get('auth/signout');
	};

	$rootScope.home = function(){
		$http.get('/');
	};
});

