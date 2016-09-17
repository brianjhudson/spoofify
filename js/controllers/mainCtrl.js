spoofifyApp.controller('mainCtrl', function($scope, $http, $stateParams, mainService){
  var baseUrl = "https://itunes.apple.com/";

  $scope.test = "test";

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












// $scope.getAlbum = function(id){
//   mainService.getAlbum(id).then(function(results){
//
//   })
// }


  // console.log($scope.artistId);

  // mainService.getArtist(580391756).then(function(results){
  //   // console.log(results);
  //   $scope.artistInfo = results.data.results
  // })




  // $scope.getSearchResults = function(search){
  //   mainService.getSearchResults(search).then(function(results){
  //     console.log('fired', results);
  //   })
  // }
})
