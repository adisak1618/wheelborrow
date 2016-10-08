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
