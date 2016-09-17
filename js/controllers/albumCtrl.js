spoofifyApp.controller('albumCtrl', function($scope, $http, $stateParams, mainService) {

    mainService.getSingleAlbum($stateParams.id).then(function(results){

      $scope.singleAlbum = results;

      $scope.playPreview = function(url){
        return mainService.playPreview(url);
      }

      $scope.pausePreview = function(){
        return mainService.pausePreview();
      }
      // console.log($scope.singleAlbum);
      return $scope.singleAlbum;
    })

})
