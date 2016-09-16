var spoofifyApp = angular.module('spoofifyApp', ['ui.router', 'angular.filter'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
      templateUrl : './views/browse/home.html',
      url : '/home',
      controller : 'browseCtrl'
    })
    .state('newReleases', {
      templateUrl : './views/browse/newReleases.html',
      url : '/newReleases',
      controller : 'browseCtrl'
    })
    .state('charts', {
      templateUrl : './views/browse/charts.html',
      url : '/charts',
      controller : 'browseCtrl'
    })
    .state("artist", {
      templateUrl : './views/artist.html',
      url : '/artist/:id',
      controller : 'artistCtrl'
    })
    .state("album", {
      templateUrl : "./views/album.html",
      url : "/album/:id",
      controller : "albumCtrl"
    })
    .state("results", {
      templateUrl : "./views/searchResults.html",
      url : "/results/:search",
      controller : "searchCtrl"
    })
  })

  spoofifyApp.filter('startFrom', function() {
    return function(input, start) {
        if(input) {
            start = +start; //parse to int
            return input.slice(start);
        }
        return [];
    }
});
