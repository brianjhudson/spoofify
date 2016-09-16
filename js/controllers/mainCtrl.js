spoofifyApp.controller('mainCtrl', function($scope, $http, $stateParams, mainService){
  var baseUrl = "https://itunes.apple.com/";

  $scope.test = "test";

  $scope.getNewReleases = function(){
    $http.get(baseUrl + "WebObjects/MZStore.woa/wpa/MRSS/newreleases/sf=143441/limit=50/explicit=true/rss.xml",
              {
      transformResponse: function (cnv) {
        var x2js = new X2JS();
        var aftCnv = x2js.xml_str2json(cnv);
        return aftCnv;
      }
    }).success(function (response) {
      $scope.newReleases = [];
      // console.log("new releases", response.rss.channel.item);
      var objTransfer = response.rss.channel.item;

      objTransfer.forEach(function(x){
        $scope.newReleases.push({
          artistName : limitLength(x.artist.__text),
          artistID : getArtistId(x.artistLink.__text),
          artistLink : x.artistLink.__text,
          albumLink : x.albumLink.__text,
          songName : replaceSingle(x.album.__text),
          coverArt : getBiggerCoverArt(x.coverArt[2].__text)
        })
      })
      // console.log($scope.newReleases);
      return $scope.newReleases;
    });
  }

  $scope.getFeaturedAlbums = function(){
    $http.get(baseUrl + "WebObjects/MZStore.woa/wpa/MRSS/featuredalbums/sf=143441/limit=50/explicit=true/rss.xml",
              {
      transformResponse: function (cnv) {
        var x2js = new X2JS();
        var aftCnv = x2js.xml_str2json(cnv);
        return aftCnv;
      }
    }).success(function (response) {
      $scope.featuredAlbums = [];
      // console.log('featuredAlbums', response.rss.channel.item);
      var objTransfer = response.rss.channel.item;

      objTransfer.forEach(function(x){
        $scope.featuredAlbums.push({
          artistName : limitLength(x.artist.__text),
          artistID : getArtistId(x.artistLink.__text),
          artistLink : x.artistLink.__text,
          albumLink : x.albumLink.__text,
          albumID : getArtistId(x.albumLink.__text),
          songName : replaceSingle(x.album.__text),
          coverArt : getBiggerCoverArt(x.coverArt[2].__text)
        })
      })
      // console.log($scope.featuredAlbums);
      return $scope.featuredAlbums;
    });
  }

  $scope.getTopSongs = function(){
    $http.get(baseUrl + "us/rss/topsongs/limit=50/explicit=true/xml",
              {
      transformResponse: function (cnv) {
        var x2js = new X2JS();
        var aftCnv = x2js.xml_str2json(cnv);
        return aftCnv;
      }
    }).success(function (response) {
      $scope.topSongs = [];
      // console.log("top songs", response.feed.entry);
      var objTransfer = response.feed.entry;

      objTransfer.forEach(function(x){
        $scope.topSongs.push({
          artistName : limitLength(x.artist.__text),
          artistID : getArtistId(x.artist._href),
          artistLink : x.artist._href,
          albumLink : x.collection.link.__href,
          songName : replaceSingle(x.name.__text),
          coverArt : getBiggerCoverArt170(x.image[2].__text)
        })
      })
      // console.log($scope.topSongs);
      return $scope.topSongs;
    });
  }

  $scope.getTopAlbums = function(){
    $http.get(baseUrl + "us/rss/topalbums/limit=50/explicit=true/xml",
              {
      transformResponse: function (cnv) {
        var x2js = new X2JS();
        var aftCnv = x2js.xml_str2json(cnv);
        return aftCnv;
      }
    }).success(function (response) {
      $scope.topAlbums = [];
      var objTransfer = response.feed.entry;

      objTransfer.forEach(function(x){
        $scope.topAlbums.push({
          artistName : limitLength(x.artist.__text),
          songName : replaceSingle(x.name.__text),
          coverArt : getBiggerCoverArt170(x.image[2].__text)
        })
      })

      return $scope.topAlbums;
    });
  }

  $scope.getNewReleases();
  $scope.getFeaturedAlbums();
  $scope.getTopSongs();
  $scope.getTopAlbums();

  function getBiggerCoverArt(str){
    var newStr = str.replace("100x100", "400x400");
    return newStr;
  }

  function getBiggerCoverArt170(str){
    var newStr = str.replace("170x170", "400x400");
    return newStr;
  }

  function replaceSingle(str){
    var newStr = str.replace(" - Single", "");
    if(newStr.length > 20){
      newStr = newStr.slice(0, 20) + "...";
    }
    return newStr;
  }

  function limitLength(str){
    var newStr = str;
    if(str.length > 20){
      newStr = str.slice(0, 20) + "...";
    }
    return newStr;
  }

  function getArtistId(str){
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

$scope.getAlbum = function(id){
  mainService.getAlbum(id).then(function(results){

  })
}

  $scope.artistId = $stateParams.id;

  console.log($scope.artistId);

  mainService.getArtist(580391756).then(function(results){
    // console.log(results);
    $scope.artistInfo = results.data.results
  })

  mainService.getAlbums(580391756).then(function(results){
    $scope.artistAlbums = results.data.results;
    console.log($scope.artistAlbums);
  })


  // $scope.getSearchResults = function(search){
  //   mainService.getSearchResults(search).then(function(results){
  //     console.log('fired', results);
  //   })
  // }
})
