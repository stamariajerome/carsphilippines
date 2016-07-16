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

  // TODO fix overlay
  // $('.collection-thumbnail').on('mousenter mouseout', function() {
  //   var select = $(this).find('.description-overlay');
  //   console.log(select);
  // });

  $('.container-drop-down').on('mouseover mouseout', function() {
    $('.drop-down').toggleClass('hidden');
    console.log('works!');
  });

});
