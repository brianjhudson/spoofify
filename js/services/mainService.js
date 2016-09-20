spoofifyApp.service('mainService', function($http, $location, $q){
  var baseUrl = "https://itunes.apple.com/";
  this.songPlaying = 0;
  this.masterSongPlaying = 0;
  this.currentSong = false;
  var currentSongArr = [];
  this.currentSongArr = [];
  var playlistSongArr = [];
  this.playlistSongArr = [];
  this.singleAlbum = [];
  var singleAlbumCache = [];
  var playlistSongsCache = []
  this.playlistSongsCache = [];
  this.testArr = [1, 2, 3, 4, 5];
  var previousUrl = "";
  var currentUrl = $location.path();
  this.currentUrl = currentUrl;

  this.getAlbums = function(id){
    return $http.jsonp(baseUrl + 'lookup?id=' + id + '&entity=album&callback=JSON_CALLBACK').then(function(response){
      var transferObj = response.data.results;
      this.artistAlbums = [];
      var albumSongs = [];
      var sortingArr = [];
      var albumSongsArr = [];

      transferObj.forEach(function(x, i){
        if(i > 0) {

          getSongsFromAlbum(x.collectionId).then(function(response){
            albumSongs = response.data.results;
            albumSongsArr = [];

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
          })
        }
      })
        this.artistAlbums = sortingArr;
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

          transferSongObj.forEach(function(y, i){
            if(y.kind === "song"){
              console.log(y.trackId);
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
      singleAlbumCache = this.singleAlbum;
      return this.singleAlbum;
    })
  }

  this.getPlaylistSongs = function(arr){
    playlistSongArr = [];
    var dfd = $q.defer();

    arr.forEach(function(x, i){
      $http.jsonp(baseUrl + 'lookup?id=' + x + '&entity=song&callback=JSON_CALLBACK').then(function(results){
        var y = results.data.results;
        playlistSongArr.push({
          artistId : y[0].artistId,
          artistName : y[0].artistName,
          coverArt : getBiggerCoverArt(y[0].artworkUrl100),
          previewUrl : y[0].previewUrl,
          trackNumber : y[0].trackNumber,
          albumName : y[0].collectionName,
          albumId : y[0].collectionId,
          kind : y[0].kind,
          trackId : y[0].trackId,
          trackName : y[0].trackName,
          trackTime : milliToMinutes(y[0].trackTimeMillis)
        })
        this.playlistSongArr = playlistSongArr;
        playlistSongsCache = playlistSongArr;
        this.playlistSongsCache = playlistSongsCache;
        dfd.resolve(this.playlistSongArr);
      })
    })

    return dfd.promise;
  }

  this.searchBy = function(query){
    return $http.jsonp(baseUrl + '/search?term=' + query + '&callback=JSON_CALLBACK').then(function(response){
      return response;
    })
  }

  this.playPreview = function(url, id, trackNum, playlist){
    if(playlist){
      getSongInfoFP(id, playlist);
      this.currentSongArr = currentSongArr;
    } else if(url){
      getSongInfo(id, singleAlbumCache);
      this.currentSongArr = currentSongArr;
    }

    if(this.currentSong){
      if(url === this.currentSong.src){
        this.currentSong.play();
      } else if (!url) {
        currentSongArr[2]["currentlyPlaying"] = true;
        this.currentSong.play();
      } else {
        this.currentSong.pause();
        this.currentSong = new Audio(url);
        this.currentSong.play();
      }
    } else {
      var audio = new Audio(url);
      this.currentSong = audio;
      audio.play();
    }
  }

  this.pausePreview = function(){
    currentSongArr[2]["currentlyPlaying"] = false;
    this.currentSong.pause();
  }

  this.playNext = function(){
    var currentSongInfo = {};
    var currentSongIndex = 0;
    currentUrl = $location.path();
    console.log(currentUrl);
    if(currentUrl.slice(0, 5) === "/play"){
      console.log("im on the playlist page");
      var currentSongSrc = this.currentSong.src;
      playlistSongsCache.map(function(x, i){
        if(currentSongSrc === x.previewUrl){
          currentSongInfo = x;
          currentSongIndex = i;
        }
      })
        var nextTrack = currentSongIndex + 1;
        var nextId = 0;
        var nextUrl = "";
        playlistSongsCache.map(function(x, i){
          if(i == nextTrack){
            nextUrl = x["previewUrl"];
            nextId = x["trackId"]
          }
        })
        this.playPreview(nextUrl, nextId, nextTrack, playlistSongsCache);
      } else {
      if(this.currentSong){
        var nextTrack = currentSongArr[0]["trackNumber"] + 1;
        var nextId = 0;
        var nextUrl = "";
        singleAlbumCache[0]["songs"].map(function(x){
          if(x["trackNumber"] === nextTrack){
            nextUrl = x["previewUrl"];
            nextId = x["trackId"]
          }
        })
        this.playPreview(nextUrl, nextId, nextTrack);
      }
    }
  }

  this.playPrevious = function(){
    var currentSongInfo = {};
    var currentSongIndex = 0;
    currentUrl = $location.path();
    console.log(currentUrl);
    if(currentUrl.slice(0, 5) === "/play"){
      console.log("im on the playlist page");
      var currentSongSrc = this.currentSong.src;
      playlistSongsCache.map(function(x, i){
        if(currentSongSrc === x.previewUrl){
          currentSongInfo = x;
          currentSongIndex = i;
        }
      })
        var nextTrack = currentSongIndex - 1;
        var nextId = 0;
        var nextUrl = "";
        playlistSongsCache.map(function(x, i){
          if(i == nextTrack){
            nextUrl = x["previewUrl"];
            nextId = x["trackId"]
          }
        })
        this.playPreview(nextUrl, nextId, nextTrack, playlistSongsCache);
      } else {
      if(this.currentSong){
        var nextTrack = currentSongArr[0]["trackNumber"] - 1;
        var nextId = 0;
        var nextUrl = "";
        singleAlbumCache[0]["songs"].map(function(x){
          if(x["trackNumber"] === nextTrack){
            nextUrl = x["previewUrl"];
            nextId = x["trackId"]
          }
        })
        this.playPreview(nextUrl, nextId, nextTrack);
      }
    }
  }

  this.addToPlaylist = function(id){
    console.log("fired");
      $('add-to-playlist#add').css('display', 'block');
  }

  this.goBack = function() {
    if(previousUrl) {
      $state.go(previousUrl);
      previousUrl = currentUrl;
    }
  }

  function getPreviousUrl(){
    if(!previousUrl) {
      previousUrl = currentUrl;
    }
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

  function getSongInfo(id, arr){
    console.log(arr);
    var allSongs = arr[0]["songs"];
    currentSongArr = [];
    allSongs.map(function(x, i){
      if(id === x["trackId"]){
        currentSongArr.push(x);
        currentSongArr.push(arr[0]);
        currentSongArr.push({currentlyPlaying : true});
        return currentSongArr;
      }
    })
  }

  function getSongInfoFP(id, arr){
    var allSongs = arr;
    currentSongArr = [];
    allSongs.map(function(x, i){
      if(id === x["trackId"]){
        currentSongArr.push(x);
        currentSongArr.push(arr[i]);
        currentSongArr.push({currentlyPlaying : true});
        return currentSongArr;
      }
    })
  }


})
