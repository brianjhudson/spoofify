spoofifyApp.controller('artistCtrl', function($scope, $http, $stateParams, mainService){


  mainService.getAlbums($stateParams.id).then(function(results){
    $scope.artistAlbums = results;

    // console.log($scope.artistAlbums);
    $scope.playPreview = function(url){
      return mainService.playPreview(url);
    }
    return $scope.artistAlbums;
  })
})
