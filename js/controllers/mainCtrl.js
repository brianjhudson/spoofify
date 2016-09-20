spoofifyApp.controller('mainCtrl', function($scope, $http, $stateParams, $location, mainService, userService){
  var baseUrl = "https://itunes.apple.com/";

  $scope.users = userService.users[0];
  console.log($scope.users);

  $scope.test = "test";
  $scope.previousUrl = "";
  $scope.currentUrl = $location.path();

  $scope.limitSearchLength = function(str){
    return mainService.limitSearchLength(str);
  }

  $scope.limitSearchTitleLength = function(str){
    return mainService.limitSearchTitleLength(str);
  }

  $scope.searchBy = function(search){
    console.log(search);
    mainService.searchBy(search).then(function(results){
      $('search-results').addClass('show');
      $('body').on('click', function(event){
        $('search-results').removeClass('show');
      })

      $scope.searchResults = results.data.results;

      console.log($scope.searchResults);

      return $scope.searchResults;

    })

  }

  $scope.users = userService.users;
  $scope.userPlaylist = $scope.users[0].playlists


  $scope.$on('$routeUpdate', function(){
    $scope.previewUrl = $scope.currentUrl;
  });
})
