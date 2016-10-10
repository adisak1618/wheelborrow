function addToServer (url, data, cb) {
  console.log('data');
  console.log(data);
  $.post( url, data)
  .done(function( data ) {
    console.log( "Data Loaded: " + data );
    if(cb) {
      cb();
    }

  });
}

//Tracking segment
function tracking () {
  $('.item_tracking').click(function () {
    // console.log($(this));
    trackid = $(this).data('event');
    category = $(this).data('category');
    label = $(this).data('label');
    if (category === undefined) {
      category = "no data"
    }

    if (label === undefined) {
      label = "no price"
    }
    // analytics.track(trackid, {
    //   name: title,
    //   price:price    });

    analytics.track(trackid, {category: category, label: label,value: 1});
  })
}
