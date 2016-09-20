spoofifyApp.controller('searchCtrl', function($scope, $stateParams, mainService) {

  $scope.searchBy = function(search){
    mainService.searchBy(search).then(function(results){
      $('search-results').addClass('show');
      $('body').on('click', function(event){
        $('search-results').removeClass('show');
      })

      $scope.searchResults = results.data.results;


      return $scope.searchResults;

    })

  }

})
