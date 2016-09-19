spoofifyApp.controller('playlistCtrl', function($scope, userService, $stateParams, mainService){
    $scope.users = userService.users;
    $scope.userPlaylists = $scope.users[0].playlists;
    var playlistSongsCache = []
    // console.log($scope.userPlaylists);

    getPlaylistName = function(){
      var index = 0;
      $scope.userPlaylists.map(function(x, i){
        if(x.id === parseInt($stateParams.id)){
          index = i;
          return i;
        }
      })
      return index;
    }

    $scope.playlistSongArr = function(){
      $scope.userPlaylists.map(function(x, i){
        if(x.id === parseInt($stateParams.id)){
          mainService.getPlaylistSongs($scope.userPlaylists[i]["songList"]).then(function(results){
            $scope.playlist = results;
            playlistSongsCache = results;
            // console.log($scope.playlist);
            return $scope.playlist;
          })
        }
      })
    }
    $scope.playlistSongArr();
    var playlistIndex = getPlaylistName();
    $scope.currentPlaylist = $scope.userPlaylists[playlistIndex];





    $scope.playPreview = function(url, id, trackNum, arr){
      // console.log(playlistSongsCache);
      // console.log("fired");
      // console.log(arr);
      $scope.currentSongArr = [];
      mainService.playPreview(url, id, trackNum, arr);
      $scope.currentSongArr = mainService.currentSongArr;
      // console.log($scope.currentSongArr);
    }

    $scope.pausePreview = function(){
      return mainService.pausePreview();
    }

    $scope.playNext = function(){
      var currentSongLength = playlistSongsCache.length;
      $scope.currentSongArr = [];
      mainService.playNextFP(currentSongLength, playlistSongsCache);
      $scope.currentSongArr = mainService.currentSongArr;
    }

    $scope.playPrevious = function(){
      $scope.currentSongArr = [];
      mainService.playPrevious();
      $scope.currentSongArr = mainService.currentSongArr;
    }

    $scope.$watch('currentSongArr', function(newValue, oldValue){
      console.log("watch2", $scope.currentSongArr, newValue, oldValue);
      if($scope.currentSongArr.length > 0){
        // console.log(newValue[2]["currentlyPlaying"]);
        $('p.song').html(newValue[0]["trackName"]);
        $('p.artist').html(newValue[0]["artistName"])
        $('div.album-cover img').attr("src", newValue[0]["coverArt"])
        if(newValue[2]["currentlyPlaying"]){
          $('button#master-play').css('display', 'none');
          $('button#master-pause').css('display', 'block');
          // $('button#play-next').css('')
        } else {
          $('button#master-play').css('display', 'block');
          $('button#master-pause').css('display', 'none');
          $('a#pause').css('display', 'none');
          $('a#play').css('display', 'block');
        }
      }
    }, true)
})
