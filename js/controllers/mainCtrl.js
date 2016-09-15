spoofifyApp.controller('mainCtrl', function($scope, $http, mainService){
  var baseUrl = "https://itunes.apple.com/";

  $scope.test = "test";

  mainService.getAlbum().then(function(results){
    // console.log(results)
  })

  $scope.getNewReleases = function(){
    $http.get(baseUrl + "WebObjects/MZStore.woa/wpa/MRSS/newreleases/sf=143441/limit=50/explicit=true/rss.xml",
              {
      transformResponse: function (cnv) {
        var x2js = new X2JS();
        var aftCnv = x2js.xml_str2json(cnv);
        return aftCnv;
      }
    }).success(function (response) {
      console.log(response.rss.channel.item)
      $scope.newReleases = [];
      var newReleasesTransfer = response.rss.channel.item;

      newReleasesTransfer.forEach(function(x){
        $scope.newReleases.push({
          artistName : x.artist.__text,
          songName : replaceSingle(x.album.__text),
          coverArt : getBiggerCoverArt(x.coverArt[2].__text)
        })
      })

      console.log($scope.newReleases);
      return $scope.newReleases;
    });
  }

  $scope.getNewReleases();

  function getBiggerCoverArt(str){
    var newStr = str.replace("100x100", "400x400");
    return newStr;
  }

  function replaceSingle(str){
    var newStr = str.replace(" - Single", "");
    if(newStr.length > 15){
      newStr = newStr.slice(0, 15) + "...";
    }
    return newStr;
  }



  // $scope.getSearchResults = function(search){
  //   mainService.getSearchResults(search).then(function(results){
  //     console.log('fired', results);
  //   })
  // }
})
