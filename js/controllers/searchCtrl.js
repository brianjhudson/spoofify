spoofifyApp.controller('searchCtrl', function($scope, $stateParams, mainService) {

  $scope.searchBy = function(search){
    console.log(search);
    mainService.searchBy(search).then(function(results){
      console.log(results);
    })
  }

})
