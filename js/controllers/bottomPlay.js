spoofifyApp.controller("bottomPlay", function($scope, mainService){
    $scope.$watch('mainService.currentSong', function(newValue, oldValue){
      console.log(mainService.currentSong, newValue, oldValue);
    })
})
