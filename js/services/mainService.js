spoofifyApp.service('mainService', function($http){
  var baseUrl = "https://itunes.apple.com/";

  this.getAlbums = function(id){
    return $http.jsonp(baseUrl + 'lookup?id=' + id + '&entity=album&callback=JSON_CALLBACK').then(function(response){
      return response;
    })
  }

  this.getArtist = function(id){
    return $http.jsonp(baseUrl + 'lookup?id=' + id + '&callback=JSON_CALLBACK').then(function(response){
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
      return response;
    })
  }

  this.searchBy = function(query){
    return $http.jsonp(baseUrl + '/search?term=' + query + '&callback=JSON_CALLBACK').then(function(response){
      return response;
    })
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


})
