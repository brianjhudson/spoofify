spoofifyApp.controller('albumCtrl', function($scope, $http, $stateParams, mainService) {

    mainService.getSingleAlbum($stateParams.id).then(function(results){
      // console.log(results.data.results);
      var transferObj = results.data.results;
      $scope.singleAlbum = [];

      transferObj.forEach(function(x){


        mainService.getSongsFromAlbum(x.collectionId).then(function(results){
          var songsArr = [];
          var transferSongObj = results.data.results;
          // console.log(transferSongObj);

          transferSongObj.forEach(function(y, i){
            if(y.kind === "song"){
              songsArr.push({
                kind : y.kind,
                trackId : y.trackId,
                trackName : y.trackName,
                previewUrl : y.previewUrl,
                trackNumber : y.trackNumber,
                trackTime : mainService.milliToMinutes(y.trackTimeMillis),
                trackTimeMillis : y.trackTimeMillis
              })
            }
            return songsArr;
          })


          $scope.singleAlbum.push({
            artistId : x.artistId,
            artistName : x.artistName,
            coverArt : mainService.getBiggerCoverArt(x.artworkUrl100),
            albumName : x.collectionName,
            albumId : x.collectionId,
            genre : x.primaryGenreName,
            trackCount : x.trackCount,
            releaseDate : x.releaseDate,
            releaseYear : parseInt(x.releaseDate.slice(0, 4)),
            totalAlbumTime : mainService.albumTotalTime(songsArr).slice(0, 2),
            songs : songsArr
          })

        })
      })
      $scope.playPreview = function(url){
        return mainService.playPreview(url);
      }
      // console.log($scope.singleAlbum);
      return $scope.singleAlbum;
    })

})
