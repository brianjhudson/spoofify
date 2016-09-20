spoofifyApp.controller('browseCtrl', function($scope, $http, mainService){
  var baseUrl = "https://itunes.apple.com/";

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
      var objTransfer = response.rss.channel.item;

      objTransfer.forEach(function(x){
        $scope.newReleases.push({
          artistName : mainService.limitLength(x.artist.__text),
          artistID : mainService.getArtistId(x.artistLink.__text),
          artistLink : x.artistLink.__text,
          albumLink : x.albumLink.__text,
          songName : mainService.replaceSingle(x.album.__text),
          coverArt : mainService.getBiggerCoverArt(x.coverArt[2].__text)
        })
      })
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
      var objTransfer = response.rss.channel.item;

      objTransfer.forEach(function(x){
        $scope.featuredAlbums.push({
          artistName : mainService.limitLength(x.artist.__text),
          artistID : mainService.getArtistId(x.artistLink.__text),
          artistLink : x.artistLink.__text,
          albumLink : x.albumLink.__text,
          albumID : mainService.getArtistId(x.albumLink.__text),
          albumName : mainService.replaceSingle(x.album.__text),
          coverArt : mainService.getBiggerCoverArt(x.coverArt[2].__text)
        })
      })
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
      var objTransfer = response.feed.entry;


      objTransfer.forEach(function(x){
        $scope.topSongs.push({
          artistName : mainService.limitLength(x.artist.__text),
          artistID : mainService.getArtistId(x.artist._href),
          artistLink : x.artist._href,
          albumLink : x.collection.link.__href,
          songName : mainService.replaceSingle(x.name.__text),
          coverArt : mainService.getBiggerCoverArt170(x.image[2].__text)
        })
      })
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
          artistName : mainService.limitLength(x.artist.__text),
          artistID : mainService.getArtistId(x.artist._href),
          artistLink : x.artist._href,
          albumId : x.id["_im:id"],
          albumName : mainService.replaceSingle(x.name.__text),
          coverArt : mainService.getBiggerCoverArt170(x.image[2].__text)
        })
      })
      return $scope.topAlbums;
    });
  }

  $scope.getNewReleases();
  $scope.getFeaturedAlbums();
  $scope.getTopSongs();
  $scope.getTopAlbums();

})
