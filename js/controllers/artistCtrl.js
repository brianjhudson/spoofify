spoofifyApp.controller('artistCtrl', function($scope, $http, $stateParams, mainService){


  mainService.getAlbums($stateParams.id).then(function(results){
    var transferObj = results.data.results;
    console.log(transferObj);
    $scope.artistAlbums = [];
    var albumSongs = [];
    var albumSongsArr = [];

    transferObj.forEach(function(x, i){
      if(i > 0) {

        mainService.getSongsFromAlbum(x.collectionId).then(function(response){
          albumSongs = response.data.results;
          albumSongsArr = [];
          // console.log(albumSongs);

          albumSongs.forEach(function(y){
            if(y.kind === "song"){
              albumSongsArr.push({
                kind : y.kind,
                trackId : y.trackId,
                trackName : y.trackName,
                previewUrl : y.previewUrl,
                trackNumber : y.trackNumber,
                trackTime : mainService.milliToMinutes(y.trackTimeMillis),
              })
            }
            return albumSongsArr;
          })

          $scope.artistAlbums.push({
            artistID : x.artistId,
            artistName : x.artistName,
            albumName : mainService.limitLength(x.collectionName),
            albumArtwork : mainService.getBiggerCoverArt(x.artworkUrl100),
            releaseDate : x.releaseDate,
            releaseYear : parseInt(x.releaseDate.slice(0, 4)),
            albumId : x.collectionId,
            genre : x.primaryGenreName,
            songs : albumSongsArr
          })
          // return $scope.artistAlbums;
          $scope.artistAlbums = mainService.sortByYear($scope.artistAlbums, "releaseYear").reverse();
        })
      }
    })
    console.log($scope.artistAlbums);
    return $scope.artistAlbums;
  })
})
