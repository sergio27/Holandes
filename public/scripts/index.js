$(".btn-category").click(function(event) {
  let selectedPanel = ".opciones-" +$(event.target).text();

  if($(selectedPanel).is(":hidden")) {
    hideAllOptions();
    $(selectedPanel).show();
  }
  else {
    $(selectedPanel).hide();
  }
});

function hideAllOptions() {
  $(".btn-category" ).each(function( index ) {
    let category = $(this).text();
    $(".opciones-" +category).hide();
  });
}
