/**
 * Created by John on 4/19/2015.
 */
/**
 * Factory that retrieves and sends objects to server
 */
ratingApp.factory('reviewService', function($resource){
    return $resource('/api/reviews/:id');
});