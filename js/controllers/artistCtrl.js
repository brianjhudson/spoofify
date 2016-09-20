spoofifyApp.controller('artistCtrl', function($scope, $http, $stateParams, mainService){


  mainService.getAlbums($stateParams.id).then(function(results){
    $scope.artistAlbums = results;

    $scope.playPreview = function(url){
      return mainService.playPreview(url);
    }
    return $scope.artistAlbums;
  })
})
