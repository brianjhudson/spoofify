spoofifyApp.service('mainService', function($http){
  var baseUrl = "https://itunes.apple.com/";

  this.getAlbums = function(id){
    return $http.jsonp(baseUrl + 'lookup?id=' + id + '&entity=album&callback=JSON_CALLBACK').then(function(response){
      return response;
    })
  }

  this.getArtist = function(id){
    console.log(id);
    return $http.jsonp(baseUrl + 'lookup?id=' + id + '&callback=JSON_CALLBACK').then(function(response){
      return response;
    })
  }

  // this.getNewReleases = function(){
  //   $http.get(baseUrl + "WebObjects/MZStore.woa/wpa/MRSS/newreleases/sf=143441/limit=50/explicit=true/rss.xml",
  //             {
  //     transformResponse: function (cnv) {
  //       var x2js = new X2JS();
  //       var aftCnv = x2js.xml_str2json(cnv);
  //       return aftCnv;
  //     }
  //   }).success(function (response) {
  //     console.log(response.rss.channel.item)
  //     return response.rss.channel.item;
  //   });
  // }


  // this.getSearchResults = function(search){
  //   return $http.jsonp(baseUrl + 'lookup?id=909253&entity=album').then(function(response){
  //     return response;
  //   })
  // }
})
