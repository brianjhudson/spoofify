var spoofifyApp = angular.module('spoofifyApp', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
      templateUrl : './views/browse/home.html',
      url : '/home'
    })
    .state('newReleases', {
      templateUrl : './views/browse/newReleases.html',
      url : '/newReleases'
    })
    .state('charts', {
      templateUrl : './views/browse/charts.html',
      url : '/charts'
    })
    .state("artist", {
      templateUrl : './views/artist.html',
      url : '/artist/:id'
    })
  })
