/**
 * Created by John on 4/19/2015.
 */
ratingApp.directive('suchHref', ['$location', function ($location) {
    return{
        restrict: 'A',
        link: function (scope, element, attr) {
            element.attr('style', 'cursor:pointer');
            element.on('click', function(){
                $location.path(attr.suchHref)
                scope.$apply();
            });
        }
    }
}]);