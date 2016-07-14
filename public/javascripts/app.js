$(function() {
  // Show Comment Textarea
  $('#btn-comment').on('click', function() {
    $('#txtarea-comment').removeClass('hidden');
    $(this).remove();
    $('#txtarea-comment').addClass('visible');
  });

  // Toggle Comment Close Button
  $('#comments').on('mouseover mouseout', 'li', function() {
    $(this).find('.btn-remove').toggleClass('hidden');
  });


});
