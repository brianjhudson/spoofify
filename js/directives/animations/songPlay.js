spoofifyApp.directive("songPlay", function(){
  return function(scope, elem, attrs) {
    $('tbody.songs-list tr').on('mouseenter', function(){
      $('span.play', this).css('display', 'block');
      $('span.number', this).css('display', 'none');
      $(this).css('height', '39px');
      // console.log("fired");
    })
    $('tbody.songs-list tr').on('mouseleave', function(){
      // console.log("left");
      $('span.play', this).css('display', 'none')
      $('span.number', this).css('display', 'block');
    })
  }
})
