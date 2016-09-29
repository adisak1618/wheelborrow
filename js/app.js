var locations = [
  {lat: 13.7375714, lng: 100.5021517},
  {lat: 13.739254, lng: 100.5558497},
  {lat: 13.7776709, lng: 100.5581593},
  {lat: 13.8309393, lng: 100.5191849},
  {lat: 13.7675714, lng: 100.5001517},
  {lat: 13.6375714, lng: 100.4021517},
  {lat: 13.6375714, lng: 100.4521517},
  {lat: 13.6075714, lng: 100.4921517},
  {lat: 13.7375714, lng: 100.3021517},
  {lat: 13.7061368, lng: 100.6233907},
  {lat: 13.6216978, lng: 100.6635198},
  {lat: 13.591674, lng: 100.5988513},
  {lat: 13.7330611, lng: 100.5385132},
  {lat: 13.691674, lng: 100.5488513},
  {lat: 13.651674, lng: 100.5688513}
];

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

  $('.popup1 .submit').click(function (e) {
    $('.modal')
      .modal('hide');
    $('.popup2').modal('show');
  });

  $('.popup3 .submit').click(function (e) {
    $('.modal')
      .modal('hide');
    $('.popup2').modal('show');
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
    if (title === undefined) {
      title = "no data"
    }
    console.log(trackid);
    console.log(title);
    analytics.track(trackid, {
      name: title
    });
  })

}

function initialize() {
  // Create a map object and specify the DOM element for display.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 13.7375714, lng: 100.5021517},
    scrollwheel: false,
    zoom: 11
  });
  var shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly'
  };

  for(var i = 0; i < locations.length; i++) {
    var marker = new google.maps.Marker({
      animation: google.maps.Animation.DROP,
      map: map,
      shape: shape,
      position: locations[i],
      title:"Hello World!"
    });
  }

  console.log(locations);
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
