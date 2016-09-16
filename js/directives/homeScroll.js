spoofifyApp.directive("homeScroll", function(){
  return function(scope, elem, attrs) {
    $('ui-view').scroll(function(){
          if($('ui-view').scrollTop() > 155) {
            $('#home-nav').addClass('sticky-top');
            $('h1.welcome').css('margin-bottom', '125px');
          } else {
            $('#home-nav').removeClass('sticky-top');
            $('h1.welcome').css('margin-bottom', '0');
          }
        })
  }
})
