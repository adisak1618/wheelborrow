

function initApp () {
  $('.listingyouitem_button').click(function () {
    $('.modal.popup3')
      .modal('show');
  });
  $('.signupbutton').click(function () {
    $('.modal.popup1')
      .modal('show');
  });
  $('#listitem .button').click(function () {
    $('.modal.popup1')
      .modal('show');
  });

  $('.howitworkbutton').click(function () {
    $('.modal.howitwork_popup')
      .modal('show');
  });

// work it work
  $('#listitem a').click(function () {
    $('.modal.popup1')
      .modal('show');
  });

  $('.popup1 .submit').click(function (e) {
    $('.modal')
      .modal('hide');
    $('.popup2').modal('show');
    addToDatabase('http://wheelborrow.co/submitrent', $('#rentname').val(), $('#rentemail').val());

  });

  $('.popup3 .submit').click(function (e) {
    $('.modal')
      .modal('hide');
    $('.popup2').modal('show');
    addToDatabase('http://wheelborrow.co/submitborrow', 'borrow user', $('#borrowemail').val());
  });


  setTimeout(function(){
    $('.special.cards .image').dimmer({
      on: 'hover'
    });
  }, 1000);


  $(document).ready(function() {
    $('#pickupdate').pickadate({
        format: 'mm/dd/yyyy',
        formatSubmit: 'mm/dd/yyyy',
        hiddenName: true
    });

    $('#returndate').pickadate({
        format: 'mm/dd/yyyy',
        formatSubmit: 'mm/dd/yyyy',
        hiddenName: true
    });
    $('#map').css({'height': ($( window ).height()-203)});
    $( window ).resize(function() {
      // resize();
      // console.log($( window ).height());
      $('#map').css({'height': ($( window ).height()-203)});
    });
  });

  //Tracking segment
  $('.item_tracking').click(function () {
    trackid = $(this).data('item');
    title = $(this).data('name');
    price = $(this).data('price');
    type = getParameterByName('type');
    console.log($(this));
    if (title === undefined) {
      title = "no data"
    }

    if (price === undefined) {
      price = "no price"
    }
    // analytics.track(trackid, {
    //   name: title,
    //   price:price    });

    analytics.track(price, {category: (type === null ? 'all': type), label: title,value: 1});
    console.log(getParameterByName('type'));
  })

}



function getUrlVars()
  {
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
  }

  function getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, " "));
  }

  function addToDatabase (url, name, email) {
    $.post( url, { name: name, email: email })
    .done(function( data ) {
      console.log( "Data Loaded: " + data );
    });
  }
