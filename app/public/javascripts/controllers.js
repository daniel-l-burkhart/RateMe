/**
 * Created by John on 4/19/2015.
 */
/**
 * Main controller for the app. Responsible for retrieving and displaying Reviews from the html to
 * the server and vice versa.
 */
ratingApp.controller('mainController', function(reviewService, $scope, $rootScope){
    $scope.category = null;
    $scope.title = null;
    $scope.creator = null;
    $scope.showFiltered = false;

    $scope.reviews = reviewService.query();
    $scope.newReview = {parent: '', name: '', rating: '', text: '', category: ''};

    $scope.post = function() {
        $scope.newReview.created_by = $rootScope.current_user;
        $scope.newReview.created_at = Date.now();

        reviewService.save($scope.newReview, function(){
            $scope.reviews = reviewService.query();
            $scope.newReview = {parent: '', name: '', rating: '', text: '', category: ''};
        });
    };
});

/**
 * Authentication controller responsible displaying user login and registration
 */
ratingApp.controller('authController', function($scope, $http, $rootScope, $location){
    $scope.user = {username: '', password: ''};
    $scope.error_message = '';

    $scope.login = function(){
        $http.post('/auth/login', $scope.user).success(function(data){
            if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            }
            else{
                $scope.error_message = data.message;
            }
        });
    };

    $scope.register = function(){
        $http.post('/auth/signup', $scope.user).success(function(data){
            if(data.state == 'success'){
                $rootScope.authenticated = true;
                $rootScope.current_user = data.user.username;
                $location.path('/');
            }
            else{
                $scope.error_message = data.message;
            }
        });
    };
});