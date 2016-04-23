/**
 * Created by John on 4/19/2015.
 */
/**
 * displaying of states
 */
ratingApp.config(function($routeProvider){
    $routeProvider
        //the timeline display
        .when('/', {
            templateUrl: 'main.html',
            controller: 'mainController'
        })
        //the login display
        .when('/login', {
            templateUrl: 'login.html',
            controller: 'authController'
        })
        //the signup display
        .when('/register', {
            templateUrl: 'register.html',
            controller: 'authController'
        })
        .when('/myReviews', {
            templateUrl: 'myReviews.html',
            controller: 'mainController'
        });



});