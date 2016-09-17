spoofifyApp.directive("songPlay", function(){
  return function(scope, elem, attrs) {
    // $('tbody.songs-list tr').on('mouseenter', function(){
    //   $('span.play', this).css('display', 'block');
    //   $('span.number', this).css('display', 'none');
    //   $(this).css('height', '39px');
    //   // console.log("fired");
    // })
    // $('tbody.songs-list tr').on('mouseleave', function(){
    //   // console.log("left");
    //   $('span.play', this).css('display', 'none')
    //   $('span.number', this).css('display', 'block');
    // })
    $('a#play').on('click', function(){
      $('a#play').css('display', 'block');
      $(this).css('display', 'none');
      $('a#pause').css('display', 'none');
      $(this).siblings('a#pause').css('display', 'block');
      $(this).siblings('span.number').css('display', 'none');
    })
    $('a#pause').on('click', function(){
      $(this).css('display', 'none');
      $(this).siblings('a#play').css('display', 'block');
      $(this).siblings('span.number').css('display', 'block');
    })
  }
})
