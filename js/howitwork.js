function addToServer (url, data, cb) {
  $.post( url, data)
  .done(function( data ) {
    console.log( "Data Loaded: " + data );
    if(cb) {
      cb();
    }

  });
}
