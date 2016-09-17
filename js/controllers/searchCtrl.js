spoofifyApp.controller('searchCtrl', function($scope, $stateParams, mainService) {

  $scope.searchBy = function(search){
    // console.log(search);
    mainService.searchBy(search).then(function(results){
      $('search-results').addClass('show');
      $('body').on('click', function(event){
        $('search-results').removeClass('show');
      })

      $scope.searchResults = results.data.results;

      // console.log($scope.searchResults);

      return $scope.searchResults;

    })

  }

})
