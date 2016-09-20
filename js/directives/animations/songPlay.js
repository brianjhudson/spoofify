spoofifyApp.directive("songPlay", function(){
  return function(scope, elem, attrs) {
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
