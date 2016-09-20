spoofifyApp.controller("bottomPlay", function($scope, mainService){

    $scope.testArr = mainService.testArr;

    $scope.currentSong = mainService.currentSong;

    $scope.$watch('currentSong', function(newValue, oldValue){
      console.log("watch", $scope.currentSong, newValue, oldValue);
    }, true)

    $scope.changeArr = function(){
      mainService.testArr.pop();
      return $scope.testArr;
    }


})
