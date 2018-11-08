var app = angular.module('Vidzy', ['ngResource','ngRoute']);
app.config(['$routeProvider', '$locationProvider',
function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'partials/home.html',
            controller: 'HomeCtrl'
        })
         .when('/add-video', {
            templateUrl: 'partials/video-form.html',
            controller: 'AddVideoCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
        
        $locationProvider.html5Mode(true);
}]);
app.controller('HomeCtrl', 
    function($scope, $resource,$location){
    	var keyword = $location.search().keyword;
        var Videos = $resource('/api/videos',{search : keyword});
        Videos.query(function(videos){
            $scope.videos = videos;
            $scope.search = keyword;

        });
    });

app.controller('AddVideoCtrl',
    function($scope, $resource, $location){
        $scope.save1 = function(){
            var Videos = $resource('/api/videos');
            Videos.save($scope.video, function(){
                $location.path('/');
            });
        };
    });