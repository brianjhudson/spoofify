spoofifyApp.service('mainService', function($http){
  var baseUrl = "https://itunes.apple.com/";
  this.songPlaying = 0;
  this.masterSongPlaying = 0;
  this.currentSong;

  this.getAlbums = function(id){
    return $http.jsonp(baseUrl + 'lookup?id=' + id + '&entity=album&callback=JSON_CALLBACK').then(function(response){
      var transferObj = response.data.results;
      this.artistAlbums = [];
      var albumSongs = [];
      var albumSongsArr = [];

      transferObj.forEach(function(x, i){
        if(i > 0) {

          getSongsFromAlbum(x.collectionId).then(function(response){
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
                  trackTime : milliToMinutes(y.trackTimeMillis),
                })
              }
              return albumSongsArr;
            })

            this.artistAlbums.push({
              artistID : x.artistId,
              artistName : x.artistName,
              albumName : limitLength(x.collectionName),
              albumArtwork : getBiggerCoverArt(x.artworkUrl100),
              releaseDate : x.releaseDate,
              releaseYear : parseInt(x.releaseDate.slice(0, 4)),
              albumId : x.collectionId,
              genre : x.primaryGenreName,
              songs : albumSongsArr
            })
            // return $scope.artistAlbums;
            this.artistAlbums = sortByYear(this.artistAlbums, "releaseYear").reverse();
          })
        }
      })
      return this.artistAlbums;
    })
  }

  this.getArtist = function(id){
    return $http.jsonp(baseUrl + 'lookup?id=' + id + '&callback=JSON_CALLBACK').then(function(response){
      return response;
    })
  }

  getSongsFromAlbum = function(id){
    return $http.jsonp(baseUrl + 'lookup?id=' + id + '&entity=song&callback=JSON_CALLBACK').then(function(response){
      return response;
    })
  }

  this.getSongsFromAlbum = function(id){
    return $http.jsonp(baseUrl + 'lookup?id=' + id + '&entity=song&callback=JSON_CALLBACK').then(function(response){
      return response;
    })
  }

  this.getSingleAlbum = function(id){
    return $http.jsonp(baseUrl + 'lookup?id=' + id + '&callback=JSON_CALLBACK').then(function(response){
      var transferObj = response.data.results;
      this.singleAlbum = [];

      transferObj.forEach(function(x){


        getSongsFromAlbum(x.collectionId).then(function(results){
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
                trackTime : milliToMinutes(y.trackTimeMillis),
                trackTimeMillis : y.trackTimeMillis
              })
            }
            return songsArr;
          })


          this.singleAlbum.push({
            artistId : x.artistId,
            artistName : x.artistName,
            coverArt : getBiggerCoverArt(x.artworkUrl100),
            albumName : x.collectionName,
            albumId : x.collectionId,
            genre : x.primaryGenreName,
            trackCount : x.trackCount,
            releaseDate : x.releaseDate,
            releaseYear : parseInt(x.releaseDate.slice(0, 4)),
            totalAlbumTime : albumTotalTime(songsArr).slice(0, 2),
            songs : songsArr
          })

        })
      })
      return this.singleAlbum;
    })
  }

  this.searchBy = function(query){
    return $http.jsonp(baseUrl + '/search?term=' + query + '&callback=JSON_CALLBACK').then(function(response){
      return response;
    })
  }

  this.playPreview = function(url){
    if(this.currentSong){
      if(url === this.currentSong.src){
        this.currentSong.play();
      } else {
        this.currentSong.pause();
        this.currentSong = new Audio(url);
        // console.log("play:", this.currentSong);
        this.currentSong.play();
      }
      console.log(url);
      console.log(this.currentSong.src);
    } else {
      var audio = new Audio(url);
      this.currentSong = audio;
      // console.log("play:", this.currentSong);
      audio.play();
    }
  }
  this.pausePreview = function(){
    var audio = this.currentSong;
    // console.log("pause:", audio);
    audio.pause();
  }


  // Helper Functions

  this.getBiggerCoverArt = function(str){
    var newStr = str.replace("100x100", "400x400");
    return newStr;
  }

  this.getBiggerCoverArt170 = function(str){
    var newStr = str.replace("170x170", "400x400");
    return newStr;
  }

  this.replaceSingle = function(str){
    var newStr = str.replace(" - Single", "");
    if(newStr.length > 20){
      newStr = newStr.slice(0, 20) + "...";
    }
    return newStr;
  }

  this.limitLength = function(str){
    var newStr = str;
    if(str.length > 20){
      newStr = str.slice(0, 20) + "...";
    }
    return newStr;
  }

  this.limitSearchLength = function(str){
    var newStr = str;
    if(str.length > 24){
      newStr = str.slice(0, 24) + "...";
    }
    return newStr;
  }

  this.limitSearchTitleLength = function(str){
    var newStr = str;
    if(str.length > 13){
      newStr = str.slice(0, 13) + "...";
    }
    return newStr;
  }

  this.limitAlbumLength = function(str){
    var newStr = str;
    if(str.length > 15){
      newStr = str.slice(0, 15) + "...";
    }
    return newStr;
  }

  this.getArtistId = function(str){
    if (str){
      var newStrArr = str.split('').reverse();
      var ids = [];
      var marker = 0;
      for(var i = 0; i < newStrArr.length; i++){
      	if(newStrArr[i] === "?") {
      		marker = 1;
      	} else if (newStrArr[i] === "d") {
      		marker = 0;
      	}
      	if (marker === 1) {
      		if(newStrArr[i] !== "?")
      		ids.push(newStrArr[i]);
      	}
      }
      return ids.reverse().join('');
    }
  }

  this.sortByYear = function(arr, key){
    return arr.sort(function(a, b){
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    })
  }

  this.milliToMinutes = function(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  this.albumTotalTime = function(arr){
    var totalMillis = 0;
    var totalMins = 0;
    for (var i = 0; i < arr.length; i++) {
      totalMillis += arr[i]["trackTimeMillis"];
    }
    return totalMins = this.milliToMinutes(totalMillis);
  }

  //========================================================

  getBiggerCoverArt = function(str){
    var newStr = str.replace("100x100", "400x400");
    return newStr;
  }

  getBiggerCoverArt170 = function(str){
    var newStr = str.replace("170x170", "400x400");
    return newStr;
  }

  replaceSingle = function(str){
    var newStr = str.replace(" - Single", "");
    if(newStr.length > 20){
      newStr = newStr.slice(0, 20) + "...";
    }
    return newStr;
  }

  limitLength = function(str){
    var newStr = str;
    if(str.length > 20){
      newStr = str.slice(0, 20) + "...";
    }
    return newStr;
  }

  limitSearchLength = function(str){
    var newStr = str;
    if(str.length > 24){
      newStr = str.slice(0, 24) + "...";
    }
    return newStr;
  }

  limitSearchTitleLength = function(str){
    var newStr = str;
    if(str.length > 13){
      newStr = str.slice(0, 13) + "...";
    }
    return newStr;
  }

  limitAlbumLength = function(str){
    var newStr = str;
    if(str.length > 15){
      newStr = str.slice(0, 15) + "...";
    }
    return newStr;
  }

  getArtistId = function(str){
    if (str){
      var newStrArr = str.split('').reverse();
      var ids = [];
      var marker = 0;
      for(var i = 0; i < newStrArr.length; i++){
      	if(newStrArr[i] === "?") {
      		marker = 1;
      	} else if (newStrArr[i] === "d") {
      		marker = 0;
      	}
      	if (marker === 1) {
      		if(newStrArr[i] !== "?")
      		ids.push(newStrArr[i]);
      	}
      }
      return ids.reverse().join('');
    }
  }

  sortByYear = function(arr, key){
    return arr.sort(function(a, b){
      var x = a[key]; var y = b[key];
      return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    })
  }

  milliToMinutes = function(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
  }

  albumTotalTime = function(arr){
    var totalMillis = 0;
    var totalMins = 0;
    for (var i = 0; i < arr.length; i++) {
      totalMillis += arr[i]["trackTimeMillis"];
    }
    return totalMins = this.milliToMinutes(totalMillis);
  }


})
