spoofifyApp.controller('albumCtrl', function($scope, $http, $stateParams, $location, mainService, userService) {

  $scope.currentSongArr = mainService.currentSongArr;

  $scope.playPreview = function(url, id, trackNum){
    $scope.currentSongArr = [];
    mainService.playPreview(url, id);
    $scope.currentSongArr = mainService.currentSongArr;
  }

  $scope.pausePreview = function(){
    return mainService.pausePreview();
  }

  $scope.playNext = function(){

      $scope.currentSongArr = [];
      mainService.playNext();
      $scope.currentSongArr = mainService.currentSongArr;

  }

  $scope.playPrevious = function(){
    $scope.currentSongArr = [];
    mainService.playPrevious();
    $scope.currentSongArr = mainService.currentSongArr;
  }

  $scope.$watch('currentSongArr', function(newValue, oldValue){
    if($scope.currentSongArr.length > 0){
      $('p.song').html(newValue[0]["trackName"].slice(0, 21));
      $('p.artist').html(newValue[1]["artistName"])
      $('div.album-cover img').attr("src", newValue[1]["coverArt"])
      if(newValue[2]["currentlyPlaying"]){
        $('button#master-play').css('display', 'none');
        $('button#master-pause').css('display', 'block');
      } else {
        $('button#master-play').css('display', 'block');
        $('button#master-pause').css('display', 'none');
        $('a#pause').css('display', 'none');
        $('a#play').css('display', 'block');
      }
    }
  }, true)

    mainService.getSingleAlbum($stateParams.id).then(function(results){
      $scope.currentSongArr = mainService.currentSongArr;

      $scope.$watch('currentSongArr', function(newValue, oldValue){
        if($scope.currentSongArr.length > 0){
            $('p.song').html(newValue[0]["trackName"].slice(0, 21));
            $('p.artist').html(newValue[1]["artistName"])
            $('div.album-cover img').attr("src", newValue[1]["coverArt"])
            if(newValue[2]["currentlyPlaying"]){
              $('button#master-play').css('display', 'none');
              $('button#master-pause').css('display', 'block');
            } else {
              $('button#master-play').css('display', 'block');
              $('button#master-pause').css('display', 'none');
            }
        }
      }, true)

      $scope.addToPlaylist = function(){
        mainService.addToPlaylist();
      }

      $scope.singleAlbum = results;

      $scope.playPreview = function(url, id, trackNum){
        console.log(url, id, trackNum);
        console.log("fired");
        $scope.currentSongArr = [];
        mainService.playPreview(url, id, trackNum);
        $scope.currentSongArr = mainService.currentSongArr;
      }

      $scope.pausePreview = function(){
        return mainService.pausePreview();
      }
      return $scope.singleAlbum;
    })


})
