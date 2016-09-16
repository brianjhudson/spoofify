spoofifyApp.directive("albumOverlay", function(){
  return function(scope, elem, attrs) {
    $('div.img').on('mouseenter', function(){
      $('span.album-overlay', this).css('visibility', 'visible')
    })
    $('div.img').on('mouseleave', function(){
      $('span.album-overlay', this).css('visibility', 'hidden')
    })
  }
})
