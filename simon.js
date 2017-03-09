$(function() {
  $('.pad').hover(function() {
    $(this).toggleClass('lit');
  })

  $('.button-strict').click(function() {
    $(this).prev().toggleClass('lit');
  })

  $('.switch-slider').click(function() {
    $(this).toggleClass('on');
  })
});
